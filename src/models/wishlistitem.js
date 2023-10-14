import mongoose from "mongoose";

mongoose.models = {};

const wishlistItemSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  link: String,
  image: String,
  priority: Number,
  userId: String,
});

const WishlistItem = mongoose.model("WishlistItem", wishlistItemSchema);

export const findByIdAndUpdate = async (id, updateData, options) => {
  try {
    const updatedItem = await WishlistItem.findByIdAndUpdate(
      id,
      updateData,
      options
    );

    if (!updatedItem) {
      return null;
    }

    return updatedItem;
  } catch (error) {
    console.error("Error updating wishlist item:", error);
    throw error;
  }
};

export default WishlistItem;