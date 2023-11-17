import { createRouter } from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@/lib/session";
import { getDatabase, WishlistItem } from "@/models";
import { ObjectId } from "mongodb";
// import { launchChromium } from 'playwright-aws-lambda';
// import bundledChromium, { puppeteer } from 'chrome-aws-lambda'; 
// import { chromium } from 'playwright-core';
// import Chromium from "chrome-aws-lambda";
import  puppeteer  from "puppeteer";
 
let chrome = {};
// let puppeteer;

// if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
//   chrome = require("chrome-aws-lambda");
//   puppeteer = require("puppeteer-core");
// } else {
//   puppeteer = require("puppeteer");
// }

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
      return res.status(400).json({ error: "Item with the same link already exists" });
    }
    let options = {};

    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
      options = {
        args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      };
    }
    // (async () => {
    browser = await puppeteer.launch();

    page = await browser.newPage();
    await page.setUserAgent('Your User Agent String');
    const navigationPromise = page.waitForNavigation();
    await page.goto(link);
    await page.waitForSelector('.pdp-details')
    .then(async () => {
    
      
      // image-grid-imageContainer
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
      await navigationPromise;
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
    }
    )
  // })();
  } catch (error) {
    console.error("Error adding item to MongoDB:", error);
    console.error(error.stack);
    res.status(500).json({ error: "Failed to add item" });
  }finally {
    // Close the page and context after usage
    if (page) {
      await page.close();
    }
    if (browser) {
      await browser.close();
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