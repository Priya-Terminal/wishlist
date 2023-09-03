import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@/lib/session";
import { getDatabase, WishlistItem } from "@/models";

const getItems = async (req, res) => {
  console.log(sessionOptions);
  try {
    await getDatabase();

    const session = req.session;
    console.log(session);

    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const userId = session.user.id;

    const items = await WishlistItem.find({ userId }).sort({ priority: 1 });
    console.log(items);
    res.status(200).json(items);
  } catch (error) {
    console.error("Error retrieving items from MongoDB:", error);
    res.status(500).json({ error: "Failed to retrieve items" });
  }
};

export default withIronSessionApiRoute(getItems, sessionOptions);
