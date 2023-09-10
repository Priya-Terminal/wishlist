import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import Link from "next/link";

import { sessionOptions } from "@/lib/session";

import WishlistForm from "@/components/WishlistForm";

export const getServerSideProps = withIronSessionSsr(async (context) => {
  const { user } = context.req.session;

  return {
    props: {
      user,
    },
  };
}, sessionOptions);

const App = ({ user }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [copied, setCopied] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newLink, setNewLink] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/item");
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

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/sharing/${user.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

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
      } else {
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
    <div className="flex-grow p-4 overflow-y-auto">
      <div className="flex-none bg-white text-black p-4">
        <WishlistForm onSubmit={handleFormSubmit} />
        <button
          disabled={copied}
          type="button"
          onClick={handleCopyUrl}
          className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
            copied
              ? "bg-green-600"
              : "hover:bg-blue-600 disabled:bg-gray-600"
          }`}
        >
          {copied ? "Copied!" : "Copy Sharing URL"}
        </button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {wishlistItems.length > 0 ? (
          <>
            <h2 className="text-lg font-semibold mb-4 text-blue-600">
              Wishlist Items:
            </h2>
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="mb-4 p-4 border rounded-md bg-white"
              >
                <p className="font-semibold mb-2 text-blue-600">Item Link:</p>
                <div className="overflow-x-auto">
                  {editingItem === item ? (
                    <input
                      type="text"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      className="border rounded-md p-2"
                    />
                  ) : (
                    <Link
                      href={item.link}
                      className="text-blue-600 hover:underline"
                    >
                      {item.link}
                    </Link>
                  )}
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => {
                      if (editingItem === item) {
                        handleSaveItem(item._id, newLink);
                      } else {
                        handleEditItem(item);
                      }
                    }}
                    className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
                      editingItem === item ? "hover:bg-green-600" : "hover:bg-blue-600"
                    }`}
                  >
                    {editingItem === item ? "Save" : "Edit"}
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="font-bold text-foreground">
            No wishlist items found. Try adding some!
          </p>
        )}
      </div>
    </div>
  ) : null;
};

export default App;