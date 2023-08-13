import React, { useState } from 'react';

const WishlistForm = ({ onSubmit }) => {
  const [wishlistLinks, setWishlistLinks] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(wishlistLinks);
    setWishlistLinks('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block font-semibold mb-2">Add Wishlist Link:</label>
      <input
        type="text"
        value={wishlistLinks}
        onChange={(e) => setWishlistLinks(e.target.value)}
        className="border p-2 rounded-md w-full text-black placeholder-black"
        placeholder="Enter Wishlist Link"
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white"
      >
        Add Link
      </button>
    </form>
  );
};

export default WishlistForm;
