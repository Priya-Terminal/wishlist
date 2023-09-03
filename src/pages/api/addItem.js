import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@/lib/session";
import { getDatabase, WishlistItem } from '@/models';

const addItem = async (req, res) => {
  try {

    await getDatabase();

    const session = req.session;

    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { link } = req.body;
    const userId = session.user.id;

    const newItem = new WishlistItem({
      title: 'New Item',
      price: 0,
      image: 'https://via.placeholder.com/150',
      priority: 0,
      userId,
      link,
    });


    await newItem.save();

    res.send(newItem);
  } catch (error) {
    console.error('Error adding item to MongoDB:', error);
    console.error(error.stack);
    res.status(500).json({ error: 'Failed to add item' });
  }
};

export default withIronSessionApiRoute(addItem, sessionOptions);
