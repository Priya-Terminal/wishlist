import { connectToDatabase } from './db';

export default async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('items');

    const items = await collection.find({}).toArray();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error retrieving items from MongoDB:', error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
};

