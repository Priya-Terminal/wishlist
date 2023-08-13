
import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ mobileNumber, password });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md text-black">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block text-sm font-medium mb-1 text-black">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            className="w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300 text-black"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1 text-black">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-black py-2 px-4 rounded-md hover:bg-blue-600 text-black"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;


