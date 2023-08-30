import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import "../styles/globals.css";

import Layout from "@/components/layout/Layout";

import { getUser } from "@/utils/user";
import UserContext from "@/contexts/user";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      try {
        const userFromStorage = getUser(window);
        setUser(userFromStorage);
      } catch (err) {
        console.log(err);
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
};

export default MyApp;
