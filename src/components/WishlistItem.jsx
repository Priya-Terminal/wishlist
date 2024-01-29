import React, { useState } from 'react';
import { useDarkMode } from '@/contexts/DarkModContext';

const WishlistItem = ({ item, onEdit, onSave, onDelete, editingItem }) => {
  const { darkMode } = useDarkMode();
  const [newLink, setNewLink] = useState(item.link);

  const handleEdit = () => {
    onEdit(item);
  };

  const handleSave = () => {
    onSave(item._id, newLink);
  };

  const handleCancel = () => {
    onEdit(null);
    setNewLink(item.link);
  };

  return (
    <div className={`mb-4 p-4 border rounded-md flex ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="w-3/4">
        <p className={`font-semibold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Item Link:</p>
        <div className={`overflow-x-auto ${darkMode ? 'dark:text-blue-300' : 'text-blue-600'}`}>
          {item.isEditing || item === editingItem ? (
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className={`border rounded-md p-2 ${darkMode ? 'bg-gray-700 text-gray-300' : ''}`}
            />
          ) : (
            <a href={item.link} target="_blank" className={`${darkMode ? 'text-blue-300 hover:underline' : 'text-blue-600 hover:underline'}`}>
              {item.link}
            </a>
          )}
        </div>
        <div className="mt-2">
          {item.isEditing || item === editingItem ? (
            <>
              <button onClick={handleCancel} className={`bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600`}>
                Cancel
              </button>
              <button onClick={handleSave} className={`bg-blue-500 text-white py-2 px-4 rounded-md hover-bg-green-600 ml-2`}>
                Save
              </button>
            </>
          ) : (
            <button onClick={handleEdit} className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600`}>
              Edit
            </button>
          )}
          <button onClick={() => onDelete(item._id)} className={`bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ${darkMode ? 'text-foreground' : ''} ml-2`}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;