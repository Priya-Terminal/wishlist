import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";

import { sessionOptions } from "@/lib/session";

export const getServerSideProps = withIronSessionSsr(async (context) => {
  const { userId } = context.query;
  const { user} = context.req.session;

  return {
    props: {
      userId,
      user,
    },
  };
}, sessionOptions);

const SharingPage = ({ userId, user }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

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
        setWishlistItems(items);
      } else {
        console.error("Failed to fetch wishlist items");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return user ? (
    <div className="m-4">
      {userId && wishlistItems.length > 0 ? (
        <>
          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Wishlist Items:
          </h2>
          {wishlistItems.map((item) => (
            <div key={item._id} className="mb-4 p-4 border rounded-md bg-white">
              <p className="font-semibold mb-2 text-blue-600">Item Link:</p>
              <a href={item.link} className="text-blue-600 hover:underline">
                {item.link}
              </a>
            </div>
          ))}
        </>
      ) : (
        <p className="font-bold text-foreground">No wishlist items shared!</p>
      )}
    </div>
  ) : null;
};

export default SharingPage;
