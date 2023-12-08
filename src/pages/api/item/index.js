// import { createRouter } from "next-connect";
// import { withIronSessionApiRoute } from "iron-session/next";
// import { ObjectId } from "mongodb";

// import { sessionOptions } from "@/lib/session";
// import { getDatabase, WishlistItem } from "@/models";
// import scrapeData from "@/lib/scraping";

// const router = createRouter();

// const addItem = async (req, res) => {
//   let browser, page;
//   try {
//     await getDatabase();

//     const session = req.session;

//     if (!session) {
//       return res.status(401).json({ error: "Not authenticated" });
//     }

//     const { link } = req.body;
//     const userId = session.user.id;

//     const existingItem = await WishlistItem.findOne({ link, userId });
//     if (existingItem) {
//       return res
//         .status(400)
//         .json({ error: "Item with the same link already exists" });
//     }

//     const { title, description, image } = await scrapeData(link);
//     const { price, priority } = req.body;
//     const defaultTitle = "Title Not Found";
//     const defaultImage = "https://i.imgur.com/Ki1kaw4.png";
//     const defaultDescription = "Description Not Found";
//     const newItem = new WishlistItem({
//       title: title || defaultTitle,
//       description: description || defaultDescription,
//       price: price || 0,
//       image: image || defaultImage,
//       priority: priority || 0,
//       userId,
//       link,
//     });

//     await newItem.save();

//     res.send(newItem);
//   } catch (error) {
//     console.error("Error adding item to MongoDB:", error);
//     console.error(error.stack);
//     res.status(500).json({ error: "Failed to add item" });
//   } finally {
//     // Close the page and context after usage
//     if (page) {
//       await page.close();
//     }
//     if (browser) {
//       await browser.close();
//     }
//   }
// };

import { createRouter } from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";
import puppeteer from 'puppeteer-core';
// import puppeteer from 'puppeteer';
import { getDatabase, WishlistItem } from "@/models";
import { sessionOptions } from "@/lib/session";
import chromium from '@sparticuz/chromium-min';

const router = createRouter();

const addItem = async (req, res) => {
  let browser, page;
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
      return res
        .status(400)
        .json({ error: "Item with the same link already exists" });
    }

    // Launch Puppeteer using chromium-min executablePath
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        'https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar'
      ),      
      headless: true,
      ignoreHTTPSErrors: true,
    });

    page = await browser.newPage();
    await page.goto(link, { waitUntil: 'domcontentloaded' });

    // Example: Scrape title, description, and image from the page using Puppeteer
    const title = await page.title();
    const description = await page.$eval('meta[name="description"]', (metaTag) => metaTag.getAttribute('content'));
    const image = await page.$eval('meta[property="og:image"]', (metaTag) => metaTag.getAttribute('content'));

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

    res.send(newItem);
  } catch (error) {
    console.error("Error adding item to MongoDB:", error);
    console.error(error.stack);
    res.status(500).json({ error: "Failed to add item" });
  } finally {
    // Close the page and browser after usage
    if (page) {
      await page.close();
    }
    if (browser) {
      await browser.close();
    }
  }
};

// export default withIronSessionApiRoute(router.post(addItem), sessionOptions);


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
      const objectId = new objectId(itemId);

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
      if (!item.description || item.description.trim() === "") {
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
