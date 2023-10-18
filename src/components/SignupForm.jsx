import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDarkMode } from "@/contexts/DarkModContext"; 

const SignupForm = ({ onSignUp }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [matchError, setMatchError] = useState("");
  const [signupError, setSignupError] = useState("");
  const { darkMode } = useDarkMode(); 

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_.])[A-Za-z\d@$!%*?&_.]{8,}$/;

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters and contain uppercase, lowercase, digit, and special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setMatchError("Passwords do not match.");
      return;
    } else {
      setMatchError("");
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 201) {
        const { user } = await response.json();
        onSignUp(user);
      } else {
        const { error } = await response.json();
        setSignupError(`An error occurred during signup: ${error}`);
      }
    } catch (error) {
      setSignupError("An error occurred during signup.");
      console.error("Sign Up Error:", error);
    }
  };

  return (
    <div
      className={`max-w-md mx-auto p-6 rounded-md shadow-md ${
        darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-black"
      }`}
    >
      {signupError && (
        <div className="text-red-500 mb-2">{signupError}</div>
      )}
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className={`w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300 ${
              darkMode
                ? "dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                : "text-black"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className={`w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300 ${
              darkMode
                ? "dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                : "text-black"
            }`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value.match(passwordRegex)) {
                setPasswordError("");
              }
            }}
            required
          />
        </div>

        {passwordError && (
          <div className="text-red-500 text-sm mt-1">{passwordError}</div>
        )}

        <div className="mb-4">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className={`w-full px-3 py-2 rounded border focus:ring ${
              darkMode
                ? "dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                : "text-black"
            } ${
              password === confirmPassword
                ? "focus:ring-blue-300"
                : "focus:ring-red-300"
            }`}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setMatchError("");
            }}
            required
          />
          {password !== confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{matchError}</p>
          )}
        </div>
        <div className="flex space-x-2 justify-between items-center">
          <button
            type="submit"
            className={`bg-blue-500 text-black py-2 px-4 rounded-md hover:bg-blue-600 ${
              darkMode ? "bg-blue-700 text-white" : "bg-blue-500 text-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
