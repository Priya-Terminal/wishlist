import { useContext, useEffect, useState } from "react";
import WishlistForm from "@/components/WishlistForm";
import WishlistItem from "@/components/WishlistItem";
import { removeUser } from "@/utils/user";
import UserContext from "@/contexts/user";
import { useRouter } from "next/router";

const App = () => {
  const [user, setUser] = useContext(UserContext);
  const [consolidatedLink, setConsolidatedLink] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

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

  const handleEditItem = (item) => {
    setEditingItem(item);
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

  return user ? (
    <>
      <WishlistForm onSubmit={handleFormSubmit} />
      {consolidatedLink && (
        <div className="mt-6 p-4 border rounded-md bg-gray-200">
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
          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Wishlist Items:
          </h2>
          {wishlistItems.map((item) => (
            <div key={item._id} className="mb-4 p-4 border rounded-md bg-white">
              <p className="font-semibold mb-2 text-blue-600">Wishlist Link:</p>
              <p className="text-blue-600">{item.link}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEditItem(item)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                >
                  Edit
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
        </div>
      )}

      {editingItem && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Edit Item:
          </h2>
          <WishlistForm
            onSubmit={handleEditSubmit}
            initialLink={editingItem.link}
          />
          <button
            onClick={handleCancelEdit}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Cancel Edit
          </button>
        </div>
      )}
    </>
  ) : null;
};

export default App;
