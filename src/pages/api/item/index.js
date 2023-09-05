import { createRouter } from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@/lib/session";
import { getDatabase, WishlistItem } from "@/models";
import { ObjectId } from "mongodb";

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

    const newItem = new WishlistItem({
      title: "New Item",
      price: 0,
      image: "https://via.placeholder.com/150",
      priority: 0,
      userId,
      link,
    });

    await newItem.save();

    res.send(newItem);
  } catch (error) {
    console.error("Error adding item to MongoDB:", error);
    console.error(error.stack);
    res.status(500).json({ error: "Failed to add item" });
  }
};

const removeItem = async (req, res) => {
  if (req.method === "DELETE") {
    const itemId = req.body.id;
    console.log("Deleting item with ID:", itemId);

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
      return res.status(401).json({ error: "Not authenticated" });
    }

    console.log(req.query);
    const userId = req.query.user || session.user.id;

    const items = await WishlistItem.find({ userId }).sort({ priority: 1 });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error retrieving items from MongoDB:", error);
    res.status(500).json({ error: "Failed to retrieve items" });
  }
};

router.get(withIronSessionApiRoute(getItems, sessionOptions));
router.post(withIronSessionApiRoute(addItem, sessionOptions));
router.delete(withIronSessionApiRoute(removeItem, sessionOptions));

export default router.handler();
