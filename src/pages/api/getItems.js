import { getDatabase, WishlistItem } from '@/models';
import { getSession } from 'next-auth/client';

export default async (req, res) => {
  try {
    await getDatabase();

    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const userId = session.user.id;


    const items = await WishlistItem.find({userId}).sort({ priority: 1 });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error retrieving items from MongoDB:', error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
};

