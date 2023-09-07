// pages/myprofile.js
import { useEffect, useState } from "react";
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
  // You can fetch user data if needed or simply pass it from props

  return (
    <div className="m-4">
      <Profile user={user} />
    </div>
  );
};

export default MyProfilePage;
