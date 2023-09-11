import React from 'react';
import { useDarkMode } from '@/contexts/DarkModContext';

const WishlistItem = ({ item, onEdit, onDelete }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`flex justify-between items-center mb-2 ${darkMode ? 'text-gray-300' : 'text-foreground'}`}>
      <p>{item.link}</p>
      <div>
        <button
          onClick={() => onEdit(item)}
          className={`bg-blue-500 py-1 px-2 rounded-md hover:bg-blue-600 ${darkMode ? 'text-foreground' : 'text-white'}`}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className={`bg-red-500 py-1 px-2 ml-2 rounded-md hover:bg-red-600 ${darkMode ? 'text-foreground' : 'text-white'}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
