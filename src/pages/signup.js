import React from "react";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-3xl font-semibold mb-4">Sign up</h1>
        <SignupForm />
     </div>
    </div>
  );
};

export default SignupPage;


