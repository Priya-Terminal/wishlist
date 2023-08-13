import React, { useState, useEffect } from 'react';
import WishlistForm from '../components/WishlistForm';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Home = () => {
  const [consolidatedLink, setConsolidatedLink] = useState('');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleSignup = async (userData) => {
    try {
      console.log('Sending signup request:', userData);
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        setShowSignupForm(false);
        console.log('Signup successful');
      } else {
        console.error('Failed to signup');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async (userData) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        setShowLoginForm(false);
        console.log('Login successful');
      } else {
        console.error('Failed to login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

      if (response.ok) {
        const newItem = await response.json();
        const updatedWishlistItems = [...wishlistItems, newItem];
        setWishlistItems(updatedWishlistItems);

        const consolidatedLink = generateConsolidatedLink(updatedWishlistItems);
        setConsolidatedLink(consolidatedLink);
      } else {
        console.error('Failed to add wishlist items');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteItem = async (id) => {
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLoginForm(false);
    setShowSignupForm(false);
  };

  return (
    <div className="min-h-screen bg-primary flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-timesnewRoman mb-6 text-center text-primary text-black">
          Wishlist Consolidator
        </h1>
        {showLoginForm && <LoginForm onLogin={handleLogin} />}
        {showSignupForm && <SignupForm onSignup={handleSignup} />}
        {isLoggedIn && !showLoginForm && !showSignupForm && (
          <div>
            <WishlistForm onSubmit={handleFormSubmit} />
            {consolidatedLink && (
              <div className="mt-6 p-4 border rounded-md bg-gray-200">
                <p className="font-semibold mb-2 text-black">Consolidated Link:</p>
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
            {wishlistItems.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4 text-black">Wishlist Items:</h2>
                <ul>
                  {wishlistItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center justify-between py-2 border-b border-gray-300 last:border-b-0"
                    >
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
            )}
            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        )}
        {!showLoginForm && !showSignupForm && !isLoggedIn && (
          <div>
            <div className="mb-8 text-center">
              <p className="text-black">Hi! Welcome to the Wishlist App</p>
            </div>
            <div className="mb-4 flex justify-center">
              <button
                onClick={() => setShowLoginForm(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
              >
                Login
              </button>
              <button
                onClick={() => setShowSignupForm(true)}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Signup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}  
export default Home;
