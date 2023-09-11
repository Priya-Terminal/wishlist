import React, { useState } from "react";
import { useDarkMode } from "@/contexts/DarkModContext";

const WishlistForm = ({ onSubmit }) => {
  const [wishlistLink, setWishlistLinks] = useState("");
  const { darkMode } = useDarkMode(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(wishlistLink);
    setWishlistLinks("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex-grow p-4 ${
        darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-black"
      }`}
    >
      <label
        className={`block ${
          darkMode ? "text-gray-400" : "text-foreground font-semibold"
        } mb-2`}
      >
        Add Wishlist Link:
      </label>
      <input
        type="text"
        value={wishlistLink}
        onChange={(e) => setWishlistLink(e.target.value)}
        className={`border p-2 rounded-md w-full ${
          darkMode ? "placeholder-gray-400 text-gray-300" : "placeholder-black text-black"
        }`}
        placeholder="Enter Wishlist Link"
      />
      <button
        disabled={!wishlistLink}
        type="submit"
        className={`mt-2 ${
          darkMode
            ? "bg-blue-700 text-white disabled:bg-gray-600"
            : "bg-blue-500 text-foreground disabled:bg-gray-600"
        } py-2 px-4 rounded-md hover:bg-blue-600 hover:text-foreground`}
      >
        Add Link
      </button>
    </form>
  );
};

export default WishlistForm;