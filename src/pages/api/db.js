import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://priya:uljrV1pGvs0vQVME@cluster0.cqf9jj2.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('wishlist');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export { connectToDatabase, client };




//priya:uljrV1pGvs0vQVME@cluster0.cqf9jj2.mongodb.net/?retryWrites=true&w=majority