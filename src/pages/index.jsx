import React, { useContext, useEffect } from "react";
import Link from "next/link";
import UserContext from "@/contexts/user";

const SignUpSignInSection = () => (
  <div className="mb-4 flex justify-center">
    <Link href="/signin">
      <div className="text-blue-700 font-bold opacity-60 hover:opacity-100 p-2 rounded-lg border-2 border-blue-700">
        Sign in
      </div>
    </Link>
    <span className="mx-2">|</span>
    <Link href="/signup">
      <div className="text-green-700 font-bold opacity-60 hover:opacity-100 p-2 rounded-lg border-2 border-green-700">
        Sign up
      </div>
    </Link>
  </div>
);

const GoToAppSection = ({ user }) => (
  <div className="mt-4 flex justify-center">
    <p className="text-foreground">
      Hello <b>{user.email}</b>, view and manage your wish list items{" "}
      <Link
        className="text-blue-700 font-bold opacity-60 hove:underline hover:opacity-100 border-b-blue-700"
        href="/app"
      >
        here
      </Link>
      .
    </p>
  </div>
);

const Home = () => {
  const [user] = useContext(UserContext);

  useEffect(() => {}, [user]);

  return (
    <div className="flex flex-grow justify-center items-center">
      <div className="m-auto max-w-md p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-timesnewRoman mb-6 text-center text-foreground">
          ShareWish
        </h1>

        <div className="mb-8 text-center">
          <p className="text-foreground">
            Share your wishlist items with everyone with{" "}
            <b className="underline">ShareWish</b>
          </p>
          {user ? <GoToAppSection user={user} /> : <SignUpSignInSection />}
        </div>
      </div>
    </div>
  );
};

export default Home;
