import React, { useContext, useEffect } from "react";
import SignInForm from "../components/SigninForm";
import { useRouter } from "next/router";
import { saveUser } from "@/utils/user";
import UserContext from "@/contexts/user";

function SignInPage() {
  const [user] = useContext(UserContext)
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/app");
    }
  }, []);

  const handleSuccessfulLogin = (loggedInUser) => {
    saveUser(window, loggedInUser);
    router.push("/app");

    alert('Sign-in successful');
  };

  const handleFailedLogin = () => {
    alert('An error occurred during sign-in');
  };

  return !user && (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
        <SignInForm onSignIn={ (user) => {
          if (user) {
            handleSuccessfulLogin(user);
          } else {
            handleFailedLogin();
          }
        }} />
      </div>
    </div>
  );
}

export default SignInPage;
