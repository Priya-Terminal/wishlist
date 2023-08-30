import { useEffect, useState } from "react";
import "../styles/globals.css";
import UserContext from "@/contexts/user";
import { getUser } from "@/utils/user";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      try {
        const userFromStorage = getUser(window);
        setUser(userFromStorage);
        router.push("/app");
      } catch (err) {
        console.log(err);
      }
    }
  }, [user]);

  console.log("User and setUser in MyApp:", user, setUser);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
};

export default MyApp;

