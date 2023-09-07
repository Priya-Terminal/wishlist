import React, { useState } from "react";

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  
  const [editedUser, setEditedUser] = useState({
    name: user.name || "",     
    email: user.email || "",   
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        setIsEditing(false);
        alert("User data updated successfully");
      } else {
        console.error("Failed to update user data");
        alert("Failed to update user data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("An error occurred while updating user data. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl mb-4">Profile</h1>
      <div>
        <strong>Name:</strong> {isEditing ? (
          <input
            type="text"
            placeholder="Enter your name"
            value={editedUser.name}
            onChange={handleInputChange}
            className="border rounded-md p-2 mb-2 focus:border-blue-500"
          />
        ) : (
          <span>{editedUser.name}</span>
        )}
      </div>
      <div>
        <strong>Email:</strong> {isEditing ? (
          <input
            type="email"
            placeholder="Enter your email"
            value={editedUser.email}
            onChange={handleInputChange}
            className="border rounded-md p-2 mb-2 focus:border-blue-500"
          />
        ) : (
          <span>{editedUser.email}</span>
        )}
      </div>
      {isEditing ? (
        <div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-red-500 text-white p-2 rounded mt-4 ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default Profile;