// import { ObjectId } from 'mongodb';
// import { getDatabase } from '@/models';

// export default async (req, res) => {
//   if (req.method === 'DELETE') {
//     const itemId = req.body.id;
//     console.log('Deleting item with ID:', itemId);

//     try {
//       const db = await getDatabase();
//       const collection = db.collection('items');

//       const objectId = ObjectId(itemId);

//       const result = await collection.deleteOne({ _id: objectId });

//       if (result.deletedCount > 0) {
//         const items = await collection.find({}).toArray();
//         res.status(200).json(items);
//       } else {
//         res.status(404).json({ error: 'Item not found' });
//       }
//     } catch (error) {
//       console.error('Error deleting item from MongoDB:', error);
//       res.status(500).json({ error: 'Failed to delete item' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// };

import { ObjectId } from 'mongodb';
import { getDatabase, WishlistItem } from '@/models';

export default async (req, res) => {
  if (req.method === 'DELETE') {
    const itemId = req.body.id;
    console.log('Deleting item with ID:', itemId);

    try {
      await getDatabase();
      const objectId = new ObjectId(itemId);
      console.log('Deleting object with ID:', objectId);

      const result = await WishlistItem.deleteOne({ _id: objectId });

      if (result.deletedCount > 0) {
        const items = await WishlistItem.find({}).sort({ priority: 1 });
        console.log('Deleting object with ID:', objectId);
        res.status(200).json(items);
      } else {
        console.log('Item not found for deletion');
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


