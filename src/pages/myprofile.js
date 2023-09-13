import React, { useState, useEffect } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import Profile from "@/components/Profile";
import { useDarkMode } from "@/contexts/DarkModContext";

export const getServerSideProps = withIronSessionSsr(async (context) => {
  const { user } = context.req.session;

  return {
    props: {
      user,
    },
  };
}, sessionOptions);

const MyProfilePage = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const { darkMode } = useDarkMode();

  const updateUser = (updatedUser) => {
    console.log("updateUser function called with data:", updatedUser);
    setCurrentUser(updatedUser);
  };

  return (
    <div className={`min-h-screen ${
      darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-black"
    } flex justify-center items-center`}>
      <Profile user={currentUser} updateUser={updateUser} />
    </div>
  );
}

export default MyProfilePage;