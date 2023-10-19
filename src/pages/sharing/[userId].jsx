import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { useDarkMode } from "@/contexts/DarkModContext";
import { sessionOptions } from "@/lib/session";
import WishlistItem from "@/components/WishlistItem";

export const getServerSideProps = withIronSessionSsr(async (context) => {
  const { userId } = context.query;
  const { user } = context.req.session;

  return {
    props: {
      userId,
      user,
    },
  };
}, sessionOptions);

const SharingPage = ({ userId, user }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { darkMode } = useDarkMode();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/item?user=${userId}`);
      if (response.ok) {
        const items = await response.json();
        console.log("Fetched wishlist items:", items);
        setWishlistItems(items);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch wishlist items");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return user ? (
    <div className={`m-4 ${isLoading ? (darkMode ? 'dark:bg-black' : 'bg-white') : (darkMode ? 'dark:bg-gray-800' : 'bg-white')}`}>
      {isLoading ? (
        <div className={`p-4 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          Loading...
        </div>
      ) : wishlistItems.length > 0 ? (
        <>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Wishlist Items:
          </h2>
          {wishlistItems.map((item) => (
            <WishlistItem
              key={item._id}
              item={item}
              readOnly={true}  
            />
          ))}
        </>
      ) : (
        <p className={`font-bold ${darkMode ? 'text-foreground' : 'text-black'}`}>
          No wishlist items shared!
        </p>
      )}
    </div>
  ) : null;
}

export default SharingPage;