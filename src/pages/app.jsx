import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import Link from "next/link";
import WishlistForm from "@/components/WishlistForm";
import WishlistItem from "@/components/WishlistItem";
import { useDarkMode } from "@/contexts/DarkModContext";
import { sessionOptions } from "@/lib/session";

export const getServerSideProps = withIronSessionSsr(async (context) => {
  const { user } = context.req.session;

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: user || null,
    },
  };
}, sessionOptions);

const App = ({  user }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [copied, setCopied] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newLink, setNewLink] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const isAppPage = router.pathname === "/app";

  useEffect(() => {
    console.log("useEffect called!");
    console.log("useEffect called with user:", user);
    if (!user) {
      router.push("/");
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      console.log("Fetching data..");
      const response = await fetch("/api/item");
      if (response.ok) {
        const items = await response.json();
        console.log("Fetched Wishlist Items:", items);
        setWishlistItems(items);
      } else {
        console.error("Failed to fetch wishlist items");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/sharing/${user.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  console.log("User ID:", user.id);
  console.log("User Data:", user);

  const handleFormSubmit = async (wishlistLink) => {
    setAlertMessage("Adding wishlist item...");
    try {
      const response = await fetch("/api/item", {
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
        setAlertMessage("WIshlist item added sucessfully!");
        setTimeout(() => {
          setAlertMessage("");
        }, 2000);
      } else if (response.status === 400) {
          const errorData = await response.json();
          setAlertMessage(errorData.error);
          setTimeout(() => {
            setAlertMessage("");
          }, 2000);
        }else{
        setAlertMessage("Failed to add wishlist item");
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
        console.error("Failed to add wishlist item");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("An error occured");
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  };
  const handleEditItem = (item) => {
    setEditingItem(item);
    if (item) {
      setNewLink(item.link);
    }
  };

  const handleSaveItem = async (id, newLink) => {
    try {
      const response = await fetch("/api/item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, link: newLink }),
      });

      if (response.ok) {
        const updatedItems = wishlistItems.map((item) =>
          item._id === id ? { ...item, link: newLink } : item
        );
        setWishlistItems(updatedItems);
        setEditingItem(null);
      } else {
        console.error("Failed to update wishlist item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch("/api/item", {
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

  return user ? (
    <div className={`flex-grow p-4 overflow-y-auto ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-black"}`}>
      <div className={`flex-none ${darkMode ? "bg-gray-800" : "bg-white"} text-black p-4`}>
        <WishlistForm onSubmit={handleFormSubmit} />
      </div>

      {alertMessage && (
        <div className="bg-red-500 text-white py-2 px-4 rounded-md mb-4">
          {alertMessage}
        </div>
      )}

      <div className="flex-grow p-4 overflow-y-auto">
        {wishlistItems.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-lg font-semibold ${darkMode ? "text-blue-300" : "text-blue-600"} ${isAppPage ? "underline" : ""}`}>
                Wishlist Items:
              </h2>

              <button
                disabled={copied}
                type="button"
                onClick={handleCopyUrl}
                className={`bg-blue-500 text-white py-2 px-4 rounded-md ${copied ? "bg-green-600" : "hover:bg-blue-600 disabled:bg-gray-600"}`}
              >
                {copied ? "Copied!" : "Copy Sharing URL"}
              </button>
            </div>

            {wishlistItems.map((item) => (
              <WishlistItem
                key={item._id}
                item={item}
                onEdit={handleEditItem}
                onSave={handleSaveItem}
                onDelete={handleDeleteItem}
                editingItem={editingItem} 
                readOnly={false}
              />
            ))}
          </>
        ) : (
          <p className={`font-bold ${darkMode ? "text-foreground" : "text-black"}`}>
            No wishlist items found. Try adding some!
          </p>
        )}
      </div>
    </div>
  ) : null;
}

export default App;