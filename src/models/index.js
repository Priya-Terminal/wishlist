import mongoose from 'mongoose';

let isConnected = false;

export const getDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

import User from './user';
import WishlistItem from './wishlistitem';

export { User, WishlistItem };
