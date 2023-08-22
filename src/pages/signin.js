import React, { useState } from "react";
import SignInFormComponent from "../components/SigninForm";
import WishlistForm from "../components/WishlistForm";
import { useRouter } from 'next/router'; 

function SignInPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter(); 

  const handleSuccessfulLogin = () => {
    setLoggedIn(true);
    router.push('/WishlistForm');
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
        {loggedIn ? (
          <WishlistForm />
        ) : (
          <SignInFormComponent onSignIn={handleSuccessfulLogin} />
        )}
      </div>
    </div>
  );
}

export default SignInPage;
