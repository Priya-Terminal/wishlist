import React, { useState } from "react";
import SignInFormComponent from "../components/SigninForm";
import { useRouter } from "next/router";

function SignInPage() {
  const router = useRouter();

  const handleSuccessfulLogin = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
        <SignInFormComponent onSignIn={handleSuccessfulLogin} />
      </div>
    </div>
  );
}

export default SignInPage;
