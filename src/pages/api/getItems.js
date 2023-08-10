import { getDatabase, WishlistItem } from '@/models';

export default async (req, res) => {
  try {
    await getDatabase();

    const items = await WishlistItem.find({}).sort({ priority: 1 });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error retrieving items from MongoDB:', error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
};

