import React, { useState, useEffect } from 'react';
import WishlistForm from '../components/WishlistForm';
import SigninForm from '../components/SigninForm';
import SignupPage from './signup'; 
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home = () => {
  const [consolidatedLink, setConsolidatedLink] = useState('');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginResult, setLoginResult] = useState(null);

  const router = useRouter();

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

  const handleLogoutLinkClick = () => {
    setIsLoggingIn(false);
    setShowLoginForm(false);
    setShowSignupForm(false);
    setIsLoggedIn(false);
  };

  const handleLoginLinkClick = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const handleSignupLinkClick = () => {
    setShowSignupForm(true);
    setShowLoginForm(false);
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
        setLoginResult('Login successful'); 
        router.push('/WishlistForm');
        return true;
      } else {
        console.error('Failed to login');
        setLoginResult('Login failed'); 
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginResult('An error occurred during login.'); 
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  };
  

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
        window.location.href = '/';
      } else {
        console.error('Failed to signup');
      }
    } catch (error) {
      console.error('Error:', error);
    }
};

return (
  <div className="min-h-screen bg-primary flex justify-center items-center">
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-timesnewRoman mb-6 text-center text-primary text-black">
        Wishlist Consolidator
      </h1>

      {showLoginForm && <SigninForm onLogin={handleLogin} loginResult={loginResult} />}

      {showSignupForm && <SignupPage onSignup={handleSignup} />}

      {isLoggedIn ? (
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
              {wishlistItems.map((item) => (
                <div key={item._id} className="flex justify-between text-black items-center mb-2">
                  <p>{item.link}</p>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <a
              href="#"
              onClick={handleLogoutLinkClick}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-8 text-center">
            <p className="text-black">Hi! Welcome to the Wishlist App</p>
          </div>
          <div className="mb-4 flex justify-center">
            <Link href="/signin">
              <span
                className={`text-blue-700 font-bold hover:underline ${
                  isLoggingIn ? 'opacity-50 pointer-events-none' : ''
                }`}
                onClick={handleLoginLinkClick}
              >
                Sign in
              </span>
            </Link>
            <span className="mx-2">|</span>
            <Link href="/signup">
              <span
                className="text-green-700 font-bold hover:underline"
                onClick={handleSignupLinkClick}
              >
                Sign up
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
);
}

export default Home;