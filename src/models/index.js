import mongoose from "mongoose";

import User from "./user";
import WishlistItem from "./wishlistitem";

export async function getDatabase() {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export { User, WishlistItem };
