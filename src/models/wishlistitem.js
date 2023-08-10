import mongoose from "mongoose";

mongoose.models = {};

const wishlistItemSchema = mongoose.Schema({
  title: String,
  price: Number,
  link: String,
  image: String,
  priority: Number,
  userId: String,
});

const WishlistItem = mongoose.model("WishlistItem", wishlistItemSchema);

export default WishlistItem;