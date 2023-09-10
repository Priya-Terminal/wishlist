import React, { useState } from "react";

const WishlistForm = ({ onSubmit }) => {
  const [wishlistLink, setWishlistLinks] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(wishlistLink);
    setWishlistLinks("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex-grow p-4 bg-white">
      <label className="block text-foreground font-semibold mb-2">
        Add Wishlist Link:
      </label>
      <input
        type="text"
        value={wishlistLink}
        onChange={(e) => setWishlistLinks(e.target.value)}
        className="border p-2 rounded-md w-full placeholder-black text-black"
        placeholder="Enter Wishlist Link"
      />
      <button
        disabled={!wishlistLink}
        type="submit"
        className="mt-2 bg-blue-500 text-foreground py-2 px-4 rounded-md disabled:bg-gray-600 hover:bg-blue-600 hover:text-foreground"
      >
        Add Link
      </button>
    </form>
  );
};

export default WishlistForm;