import React, { useState } from "react";
import { useRouter } from "next/router";

const SignupForm = ({ onSignUp }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [matchError, setMatchError] = useState("");
  const [signupError, setSignupError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters and contain uppercase, lowercase, digit, and special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setMatchError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 201) {
        const { user } = await response.json();
        onSignUp(user);
      }
    } catch (error) {
      setSignupError("An error occurred during signup.");
      console.error("Sign Up Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-md shadow-md text-foreground">
      <h2 className="text-foreground font-semibold mb-4">Sign up</h2>
      {signupError && <div className="text-red-500 mb-2">{signupError}</div>}
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300 text-foreground text-black"
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
            className="w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300 text-foreground text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            placeholder="Confrim Password"
            className={`w-full px-3 py-2 rounded border focus:ring text-black ${
              password === confirmPassword
                ? "focus:ring-blue-300"
                : "focus:ring-red-300"
            } text-foreground`}
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
            className="bg-blue-500 text-foreground py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
