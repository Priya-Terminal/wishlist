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

const App = ({ userId, user }) => {
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

  // console.log("Wishlist Items:", wishlistItems);

  // wishlistItems.forEach((item, index) => {
  //   console.log(`Item ${index + 1}:`, item);
  //   console.log(`Description of Item ${index + 1}:`, item.description);
  // });

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
      } else if (response.status === 400) {
          const errorData = await response.json();
          setAlertMessage(errorData.error);
          setTimeout(() => {
            setAlertMessage("");
          }, 2000);
        }else{
        console.error("Failed to add wishlist item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewLink(item.link);
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
              <div key={item._id} className={`mb-4 p-4 border rounded-md flex ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                <div className="w-1/4 pr-4">
                  <img src={item.image} alt={item.title} className={`w-34 h-30 object-cover rounded-md ${darkMode ? "border-gray-300" : ""}`} />
                </div>
  
                <div className="w-3/4">
                  <p className={`font-semibold mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Item Link:</p>
                  <div className="overflow-x-auto">
                    {editingItem === item ? (
                      <input
                        type="text"
                        value={newLink}
                        onChange={(e) => setNewLink(e.target.value)}
                        className={`border rounded-md p-2 ${darkMode ? "bg-gray-700 text-gray-300" : ""}`}
                      />
                    ) : (
                      item.link && (
                        <a href={item.link} target="_blank" className={`${darkMode ? "text-blue-300 hover:underline" : "text-blue-600 hover:underline"}`}>
                          {item.link}
                        </a>
                      )
                    )}
                  </div>
  
                  <p className={`font-semibold mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Title:</p>
                  <p className={`dark:text-gray-300 ${darkMode ? "text-gray-400" : ""}`}>{item.title}</p>
  
                  <p className={`font-semibold mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Description:</p>
                  <p className="dark:text-gray-300">{item.description || "No description available."}</p>
  
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        if (editingItem === item) {
                          handleSaveItem(item._id, newLink);
                        } else {
                          handleEditItem(item);
                        }
                      }}
                      className={`bg-blue-500 text-white py-2 px-4 rounded-md ${editingItem === item ? "hover:bg-green-600" : "hover:bg-blue-600"}`}
                    >
                      {editingItem === item ? "Save" : "Edit"}
                    </button>
  
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className={`bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ${darkMode ? "text-foreground" : ""} ml-2`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
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