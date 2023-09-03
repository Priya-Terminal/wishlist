import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from 'next-auth/react';

import "../styles/globals.css";

import Layout from "@/components/layout/Layout";

import { getUser } from "@/utils/user";
import UserContext from "@/contexts/user";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ session ] = useSession();

  useEffect(() => {
    if (!user && session) {
      try {
        const userFromStorage = getUser(window);
        setUser(userFromStorage);
      } catch (err) {
        console.log(err);
      }
    }
  }, [user, session]);

  console.log("pageProps.session:", pageProps.session);

  return (
    <SessionProvider session={pageProps.session}> 
      <UserContext.Provider value={[user, setUser]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </SessionProvider> 
  );
};

export default MyApp;
