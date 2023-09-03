import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import SignupForm from "../components/SignupForm";
import { saveUser } from "../utils/user";
import UserContext from "@/contexts/user";

const SignupPage = () => {
  const router = useRouter();
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (user) {
      router.push("/app");
    }
  }, []);

  const handleSuccessfulSignup = (user) => {
    saveUser(window, user);
    router.push("/app");
  };

  return !user && (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-3xl font-semibold mb-4">Sign up</h1>
        <SignupForm onSignUp={handleSuccessfulSignup} />
      </div>
    </div>
  );
};

export default SignupPage;
