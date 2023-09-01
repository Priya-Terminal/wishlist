import React from 'react';

const WishlistItem = ({ item, onEdit, onDelete }) => {
  return (
    <div className="flex justify-between text-foreground items-center mb-2">
      <p>{item.link}</p>
      <div>
        <button
          onClick={() => onEdit(item)}
          className="bg-blue-500 text-foreground py-1 px-2 rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="bg-red-500 text-foreground py-1 px-2 ml-2 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
