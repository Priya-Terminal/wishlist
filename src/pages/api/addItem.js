import { getDatabase, WishlistItem } from '@/models';

export default async (req, res) => {
  try {
    const { link } = req.body;

    await getDatabase();

    const newItem = new WishlistItem({
      title: 'New Item',
      price: 0,
      image: 'https://via.placeholder.com/150',
      priority: 0,
      userId: '1',
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
