import { connectToDatabase } from './db';

export default async (req, res) => {
  try {
    const { link } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection('items'); 

    const newItem = { link };
    const result = await collection.insertOne(newItem);

    if (result.insertedCount > 0) {
      res.status(201).json(result.ops[0]);
    } else {
      res.status(500).json({ error: 'Failed to add item' });
    }
  } catch (error) {
    console.error('Error adding item to MongoDB:', error);
    console.error(error.stack);
    res.status(500).json({ error: 'Failed to add item' });
  }
};



//'mongodb+srv://priya:uljrV1pGvs0vQVME@cluster0.cqf9jj2.mongodb.net/?retryWrites=true&w=majority'