import React, { useState, useEffect } from 'react';

function ProfilePage({ user, updateUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(user.name);
    setEmail(user.email);
  };

  const handleProfileUpdate = async () => {
    try {
      const userData = {
        name,
        email,
        id: user.id, 
      };

      const response = await fetch('/api/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        updateUser({ ...user, name, email }); 
        setIsEditing(false); 
        alert('Profile updated successfully');
      } else {
        const { error } = await response.json();
        alert(`Profile update failed: ${error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during profile update');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-md shadow-md bg-white">
      {isEditing ? (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full px-3 py-2 rounded border focus:ring focus:ring-blue-300"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleProfileUpdate}
            >
              Update Profile
            </button>
            <button
              className="ml-2 bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-2">
            <span className="text-gray-700 font-bold">Name:</span> {user.name}
          </p>
          <p className="mb-4">
            <span className="text-gray-700 font-bold">Email:</span> {user.email}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleEditClick}
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
