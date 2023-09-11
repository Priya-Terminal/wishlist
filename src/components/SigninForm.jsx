import React, { useState } from 'react';
import { useDarkMode } from "@/contexts/DarkModContext";

function SignInForm({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { darkMode } = useDarkMode(); 

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { user } = await response.json();
        onSignIn(user);
      } else {
        const { error } = await response.json();
        alert(`Sign-in failed: ${error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during sign-in');
    }
  };

  return (
    <div
      className={`max-w-md mx-auto p-6 rounded-md shadow-md ${
        darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-black'
      }`}
    >
      <form onSubmit={handleSignIn}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className={`w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300 ${
              darkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-black' : 'text-black'
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ color: 'black' }}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className={`w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300 ${
              darkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-black' : 'text-black'
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ color: 'black' }}
          />
        </div>
        <button
          type="submit"
          className={`py-2 px-4 rounded-md hover:bg-blue-600 ${
            darkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-foreground'
          }`}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
