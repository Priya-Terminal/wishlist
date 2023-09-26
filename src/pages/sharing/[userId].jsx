import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { useDarkMode } from "@/contexts/DarkModContext";
import { sessionOptions } from "@/lib/session";

export const getServerSideProps = withIronSessionSsr(async (context) => {
  const { userId } = context.query;
  console.log("SharingPage userId:", userId);
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
      const response = await fetch(`/api/enrich?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("API Response Data:", data);
        const items = data.enrichedItems;
        console.log("Enriched items:", items);
        console.log(`Total items: ${items.totalItems}`);
        console.log(`Enriched items: ${items.enrichedItems}`);
        console.log(`Errored items: ${items.erroredItems}`);
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

  console.log("userId:", userId);
  console.log("wishlistItems:", wishlistItems);

  return user ? (
    <div className={`m-4 ${isLoading ? (darkMode ? 'dark:bg-black' : 'bg-white') : (darkMode ? 'dark:bg-gray-800' : 'bg-white')}`}>
      {isLoading ? (
        <div className={`p-4 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          Loading...
        </div>
      ) : userId && wishlistItems.length > 0 ? (
        <>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Wishlist Items:
          </h2>
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className={`mb-4 p-4 border rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
            >
              <div className="flex">
                <div className="w-1/4 pr-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-34 h-30 object-cover rounded-md ${darkMode ? 'border-gray-300' : ''}`}
                  />
                </div>
                <div className="w-3/4">
                  <p className={`font-semibold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    Item Link:
                  </p>
                  <a
                    href={item.link}
                    className={`text-blue-600 hover:underline ${darkMode ? 'dark:text-blue-300' : ''}`}
                  >
                    {item.link}
                  </a>
                  <p className={`font-semibold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    Title:
                  </p>
                  <p className={`dark:text-gray-300 ${darkMode ? 'text-gray-400' : ''}`}>{item.title}</p>
                  <p className={`font-semibold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    Description:
                  </p>
                  <p className={`dark:text-gray-300 ${darkMode ? 'text-gray-400' : ''}`}>{item.description}</p>
                </div>
              </div>
            </div>
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