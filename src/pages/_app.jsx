import { useEffect, useState } from "react";

import "../styles/globals.css";

import Layout from "@/components/layout/Layout";

import { getUser } from "@/utils/user";
import UserContext from "@/contexts/user";

const MyApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      const userFromStorage = getUser(window);
      setUser(userFromStorage);
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
