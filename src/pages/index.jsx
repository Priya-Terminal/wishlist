import React, { useState, useEffect } from 'react';
import WishlistForm from '../components/WishlistForm';

const Home = () => {
  const [consolidatedLink, setConsolidatedLink] = useState('');
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/getItems');
        if (response.ok) {
          const items = await response.json();
          setWishlistItems(items);
        } else {
          console.error('Failed to fetch wishlist items');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  const generateConsolidatedLink = (items) => {
    const links = items.map((item) => item.link);
    const consolidatedLink = links.join(', ');
    return consolidatedLink;
  };

  const handleFormSubmit = async (wishlistLink) => {
    try {
      const response = await fetch('/api/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: wishlistLink }),
      });

      console.log('Response:', response);

      if (response.ok) {
        const newItem = await response.json();
        console.log('New Item:', newItem);


        const updatedWishlistItems = [...wishlistItems, newItem];
        setWishlistItems(updatedWishlistItems);

        const consolidatedLink = generateConsolidatedLink(updatedWishlistItems);
        console.log('Consolidated Link:', consolidatedLink);
        setConsolidatedLink(consolidatedLink);
      } else {
        console.error('Failed to add wishlist items');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    console.log('Deleting item with ID:', id);
    try {
      const response = await fetch('/api/removeItem', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setWishlistItems(wishlistItems.filter((item) => item._id !== id));
      } else {
        console.error('Failed to delete wishlist item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold mb-6 text-center text-primary">
          Wishlist Consolidator
        </h1>
        <WishlistForm onSubmit={handleFormSubmit} />
        {consolidatedLink && (
          <div className="mt-6 p-4 border rounded-md bg-gray-200">
            <p className="font-semibold mb-2">Consolidated Link:</p>
            <a
              href={consolidatedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {consolidatedLink}
            </a>
          </div>
        )}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Wishlist Items:</h2>
          <ul>
            {wishlistItems.map((item) => (
              <li key={item._id} className="flex items-center justify-between py-2 border-b border-gray-300 last:border-b-0">
                <span className="text-gray-700">{item.link}</span>
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;



