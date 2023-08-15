import { useState } from 'react';

const LoginForm = ({ onLogin, loginResult }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const  loginSuccess = await onLogin({ email, password });

    if (loginSuccess) {
      handleAlert('Login successful!');
    }else {
      handleAlert('An error occurred while logging in.');
    }
  };

  const handleAlert = (message) => {
    alert(message);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md text-black">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-black py-2 px-4 rounded-md hover:bg-blue-600 text-black"
          >
            Login
          </button>
          <div className="flex items-center ml-4 font-bold">
            <div className="flex items-center space-x-2"> {/* Wrapping div */}
              <a href="/" className="text-center">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </form>
      <div className="mb-4">
        {loginResult && loginResult.success && (
          <p className="text-green-500 text-sm mt-1">Login successful! Welcome back.</p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
