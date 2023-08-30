import React, { useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import UserContext from "@/contexts/user";

const Home = () => {
  const [user] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/app");
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-timesnewRoman mb-6 text-center text-primary text-black">
          ShareWish
        </h1>

        <div className="mb-8 text-center">
          <p className="text-black">
            Share your wishlist items with everyone with{" "}
            <b className="underline">ShareWish</b>
          </p>
        </div>
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
      </div>
    </div>
  );
};

export default Home;
