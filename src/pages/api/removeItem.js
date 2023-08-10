import { client } from './db';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  if (req.method === 'DELETE') {
    const itemId = req.body.id;
    console.log('Deleting item with ID:', itemId);

    try {
      const db = client.db('wishlist'); 
      const collection = db.collection('items');

      const objectId = ObjectId(itemId);

      const result = await collection.deleteOne({ _id: objectId });

      if (result.deletedCount > 0) {
        const items = await collection.find({}).toArray();
        res.status(200).json(items);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      console.error('Error deleting item from MongoDB:', error);
      res.status(500).json({ error: 'Failed to delete item' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

