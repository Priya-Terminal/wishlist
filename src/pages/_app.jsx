import { useEffect, useState } from "react";

import "../styles/globals.css";

import Layout from "@/components/layout/Layout";

import { getUser } from "@/utils/user";
import UserContext from "@/contexts/user";
import { DarkModeProvider } from "@/contexts/DarkModContext";

const MyApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      const userFromStorage = getUser(window);
      console.log("MyApp userFromStorage:", userFromStorage); 
      setUser(userFromStorage);
    }
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <DarkModeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DarkModeProvider>
    </UserContext.Provider>
  );
};

export default MyApp;
