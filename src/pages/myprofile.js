import React, { useEffect, useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import Profile from "@/components/Profile";

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

  const updateUser = (updatedUser) => {
    console.log("updateUser function called with data:", updatedUser);
    setCurrentUser(updatedUser);
  };

  return (
    <div className="m-4">
      <Profile user={currentUser} updateUser={updateUser} />
    </div>
  );
};

export default MyProfilePage;
