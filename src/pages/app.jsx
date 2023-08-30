import { useContext, useEffect, useState } from "react";
import WishlistForm from "@/components/WishlistForm";
import { removeUser } from "@/utils/user";
import UserContext from "@/contexts/user";
import { useRouter } from "next/router";

const App = () => {
  const [user, setUser] = useContext(UserContext);
  const [consolidatedLink, setConsolidatedLink] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/getItems");
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

  const generateConsolidatedLink = (items) => {
    const links = items.map((item) => item.link);
    const consolidatedLink = links.join(", ");
    return consolidatedLink;
  };

  const handleFormSubmit = async (wishlistLink) => {
    try {
      const response = await fetch("/api/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: wishlistLink }),
      });

      if (response.ok) {
        const newItem = await response.json();
        const updatedWishlistItems = [...wishlistItems, newItem];
        setWishlistItems(updatedWishlistItems);

        const consolidatedLink = generateConsolidatedLink(updatedWishlistItems);
        setConsolidatedLink(consolidatedLink);
      } else {
        console.error("Failed to add wishlist items");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch("/api/removeItem", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setWishlistItems(wishlistItems.filter((item) => item._id !== id));
      } else {
        console.error("Failed to delete wishlist item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogoutLinkClick = async () => {
    try {
      removeUser(window);
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return user ? (
    <>
      <WishlistForm onSubmit={handleFormSubmit} />

      {consolidatedLink && (
        <div className="mt-6 p-4 border rounded-md bg-gray-200">
          <p className="font-semibold mb-2 text-foreground">Consolidated Link:</p>
          <a
            href={consolidatedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {consolidatedLink}
          </a>
        </div>
      )}

      {wishlistItems.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Wishlist Items:
          </h2>
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-foreground items-center mb-2"
            >
              <p>{item.link}</p>
              <button
                onClick={() => handleDeleteItem(item._id)}
                className="bg-red-500 text-foreground py-1 px-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <button
          href="#"
          onClick={handleLogoutLinkClick}
          className="bg-red-500 text-foreground py-2 px-4 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </>
  ) : null;
};

export default App;
