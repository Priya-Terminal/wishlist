import React, { useState } from 'react';

function SignInFormComponent({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        onSignIn(); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md text-black">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-black py-2 px-4 rounded-md hover:bg-blue-600 text-black"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignInFormComponent;
