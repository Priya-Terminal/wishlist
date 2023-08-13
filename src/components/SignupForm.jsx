
import { useState } from 'react';

const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
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
    onSignup({ username, mobileNumber, password, confirmPassword });
  };

  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    return passwordPattern.test(password);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md text-black">
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1 text-black">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300 text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-black py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Signup
          </button>
        </div>
        <div className="mb-4">
          {validationError && (
            <p className="text-red-500 text-sm mt-1">{validationError}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupForm;



