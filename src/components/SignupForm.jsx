import { useState } from 'react';
import Link from 'next/link';

const SignupForm = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    if (!isValidPassword(password)) {
      setValidationError(
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, digit, and special character.'
      );
      return;
    }

    onSignup({ email, password });
    handleAlert('Signup successful! You can now log in.');
  };

  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleAlert = (message) => {
    alert(message);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md text-black">
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>
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
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-black">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={`w-full px-3 py-2 rounded border focus:ring ${
              passwordsMatch ? 'focus:ring-blue-300' : 'focus:ring-red-300'
            } text-black`}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordsMatch(true);
              setValidationError('');
            }}
            required
          />
          {!passwordsMatch && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
          )}
        </div>
        <div className="flex space-x-2 justify-between items-center">
          <a
            href="#"
            onClick={handleSubmit}
            className="bg-blue-500 text-black py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Signup
          </a>
          <div className="flex items-center font-bold">
          <a href="/" className="text-center">
              Back to Home
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;