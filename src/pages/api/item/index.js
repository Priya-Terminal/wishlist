import { createRouter } from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@/lib/session";
import { getDatabase, WishlistItem } from "@/models";
import { ObjectId } from "mongodb";
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

const router = createRouter();

const addItem = async (req, res) => {
  let driver;

  try {
    await getDatabase();

    const session = req.session;

    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { link } = req.body;
    const userId = session.user.id;

    const existingItem = await WishlistItem.findOne({ link, userId });
    if (existingItem) {
      return res.status(400).json({ error: "Item with the same link already exists" });
    }

    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments([
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-zygote',
      '--deterministic-fetch',
      '--disable-features=IsolateOrigins',
      '--disable-site-isolation-trials',
      '--hide-scrollbars', 
      '--disable-web-security',
      '--window-size=2000x1500',
      '--ignore-certificate-errors',
      '--headless',
    ]);

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

    await driver.get(link);

    try {
      await driver.wait(until.titleContains('Expected Page Title'), 15000);
    } catch (error) {
      console.error("Error during waiting condition:", error);
    }

    let title = 'Title Not Found';
    let description = 'Description Not Found';
    let image = 'https://i.imgur.com/Ki1kaw4.png';

    try {
      const titleElement = await driver.findElement(By.css('meta[property="og:title"], meta[name="title"]'));
      title = await titleElement.getAttribute('content');
    } catch (error) {
      console.error("Error retrieving title:", error);
    }

    try {
      const descriptionElement = await driver.findElement(By.css('meta[property="og:description"]'));
      description = await descriptionElement.getAttribute('content');
    } catch (error) {
      console.error("Error retrieving description:", error);
    }

    try {
      const imageElement = await driver.findElement(By.css('meta[property="og:image"]'));
      image = await imageElement.getAttribute('content');
    } catch (error) {
      console.error("Error retrieving image:", error);
    }

    const { price, priority } = req.body;
    const defaultTitle = 'Title Not Found';
    const defaultImage = 'https://i.imgur.com/Ki1kaw4.png';
    const defaultDescription = 'Description Not Found';

    const newItem = new WishlistItem({
      title: title || defaultTitle,
      description: description || defaultDescription,
      price: price || 0,
      image: image || defaultImage,
      priority: priority || 0,
      userId,
      link,
    });

    await newItem.save();

    res.status(201).json(newItem);

  } catch (error) {
    console.error("Error adding item to MongoDB:", error);
    console.error(error.stack);
    res.status(500).json({ error: "Failed to add item" });
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
};

const updateItem = async (req, res) => {
  if (req.method === "PUT") {
    const { id, link } = req.body;

    try {
      await getDatabase();
      const objectId = new ObjectId(id);

      const result = await WishlistItem.updateOne(
        { _id: objectId },
        { $set: { link } }
      );

      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Item updated successfully" });
      } else {
        console.log("Item not found for update");
        res.status(404).json({ error: "Item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update item" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

const removeItem = async (req, res) => {
  if (req.method === "DELETE") {
    const itemId = req.body.id;

    try {
      await getDatabase();
      const objectId = new ObjectId(itemId);

      const result = await WishlistItem.deleteOne({ _id: objectId });

      if (result.deletedCount > 0) {
        const items = await WishlistItem.find({}).sort({ priority: 1 });
        res.status(200).json(items);
      } else {
        console.log("Item not found for deletion");
        res.status(404).json({ error: "Item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete item" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

const getItems = async (req, res) => {
  try {
    await getDatabase();

    const session = req.session;

    if (!session) {
      console.log("Not authenticated");
      return res.status(401).json({ error: "Not authenticated" });
    }

    console.log(req.query);
    const userId = req.query.user || session.user.id;
    const items = await WishlistItem.find({ userId }).sort({ priority: 1 });
    for (const item of items) {
      if (!item.description || item.description.trim() === '') {
        item.description = "Description Not Found";
      }
    }
    res.status(200).json(items);
  } catch (error) {
    console.error("Error retrieving items from MongoDB:", error);
    res.status(500).json({ error: "Failed to retrieve items" });
  }
};

router.get(withIronSessionApiRoute(getItems, sessionOptions));
router.post(withIronSessionApiRoute(addItem, sessionOptions));
router.put(withIronSessionApiRoute(updateItem, sessionOptions));
router.delete(withIronSessionApiRoute(removeItem, sessionOptions));

export default router.handler();