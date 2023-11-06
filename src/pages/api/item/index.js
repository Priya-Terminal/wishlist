import { createRouter } from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@/lib/session";
import { getDatabase, WishlistItem } from "@/models";
import { ObjectId } from "mongodb";
import { launchChromium } from 'playwright-aws-lambda'; 

const router = createRouter();

const addItem = async (req, res) => {
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

    const browser = await launchChromium({
      headless:true,
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--deterministic-fetch',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
    ],
    });
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    });
    const page = await context.newPage();
    
    await page.goto(link);

    let title, description, image;

    try {
      title = await page.$eval('meta[property="og:title"]', (element) => element.getAttribute('content'));
    } catch (error) {
      title = "Title Not Found";
    }

    try {
      description = await page.$eval('meta[property="og:description"]', (element) => element.getAttribute('content'));
    } catch (error) {
      description = "Description Not Found";
    }

    try {
      image = await page.$eval('meta[property="og:image"]', (element) => element.getAttribute('content'));
    } catch (error) {
      image = "https://i.imgur.com/Ki1kaw4.png";
    }

    const { price, priority } = req.body;
    const defaultTitle = "Title Not Found";
    const defaultImage = "https://i.imgur.com/Ki1kaw4.png";
    const defaultDescription = "Description Not Found";
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

    await browser.close();

    return res.send(newItem);

  } catch (error) {
    console.error("Error adding item to MongoDB:", error);
    console.error(error.stack);
    res.status(500).json({ error: "Failed to add item" });
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