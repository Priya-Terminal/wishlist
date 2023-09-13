import React, { useContext, useEffect } from "react";
import Link from "next/link";
import UserContext from "@/contexts/user";
import { useDarkMode } from "@/contexts/DarkModContext";

const SignUpSignInSection = () => (
  <div className="mt-4 flex justify-center items-center">
    <Link href="/signin">
      <div className="text-blue-700 font-bold opacity-60 hover:opacity-100 py-2 px-4 rounded-lg border-2 border-blue-700">
        Sign in
      </div>
    </Link>
    <div className="mx-2"></div> 
    <Link href="/signup">
      <div className="text-green-700 font-bold opacity-60 hover:opacity-100 py-2 px-4 rounded-lg border-2 border-green-700">
        Sign up
      </div>
    </Link>
  </div>
);

const GoToAppSection = ({ user }) => {
  const { darkMode } = useDarkMode(); 

  return (
    <div className="mt-4 flex justify-center">
      <p className={`text-${darkMode ? 'white' : 'black'} font-semibold`}>
        Hello <b className={`text-${darkMode ? 'white' : 'black'}`}>
        {user.name ? user.name : user.email}
        </b>, view and manage your wish list items{" "}
        <Link
          className={`text-blue-700 font-bold opacity-70 hover:underline hover:opacity-100 border-b-blue-700`}
          href="/app"
        >
          here
        </Link>
        .
      </p>
    </div>
  );
};


const Home = () => {
  const [user] = useContext(UserContext);
  const { darkMode } = useDarkMode();

  useEffect(() => {}, [user]);

  return (
    <div
      className={`flex flex-grow justify-center items-center h-screen ${
        darkMode ? "bg-gray-800" : "bg-zinc-200"
      }`}
    >
      <div
        className={`m-auto max-w-md p-6 rounded-lg shadow-md ${
          darkMode ? "bg-gray-800" : "bg-slate-200"
        }`}
      >
        <h1
          className={`text-4xl font-bold mb-6 text-center ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          ShareWish
        </h1>

        <div
          className={`mb-8 text-center ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          <p>
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
