import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../Common/Navbar/Navbar";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState(user);

  useEffect(() => {
    if (!user) {
      console.log("No user logged in");
      return;
    }
    // Optionally fetch additional user data here
  }, [user]);

  if (!userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
        <p className="text-center text-white text-xl font-semibold">
          User details not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <Navbar />
      <div className="h-[70px]" />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
          {/* Profile Image */}
          <div className="w-36 h-36 bg-gray-700 rounded-full overflow-hidden shadow-lg mb-6 border-4 border-gray-700">
            <img
              src={`https://api.dicebear.com/6.x/initials/svg?text=${userDetails.username}`}
              alt={userDetails.username}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Username */}
          <h2 className="text-4xl font-extrabold mb-2 text-white tracking-wide">
            {userDetails.username}
          </h2>
          <p className="text-lg text-gray-400 mb-6">{userDetails.email}</p>

          {/* User Details */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-700 rounded-lg p-5 flex flex-col items-center">
              <span className="text-sm text-gray-400 mb-1">Role</span>
              <span className="text-xl font-semibold text-white">
                {userDetails.role}
              </span>
            </div>
            <div className="bg-gray-700 rounded-lg p-5 flex flex-col items-center">
              <span className="text-sm text-gray-400 mb-1">To Watch List</span>
              <span className="text-xl font-semibold text-white">
                {userDetails.toWatchList.length} items
              </span>
            </div>
            <div className="bg-gray-700 rounded-lg p-5 flex flex-col items-center">
              <span className="text-sm text-gray-400 mb-1">Recently Viewed</span>
              <span className="text-xl font-semibold text-white">
                {userDetails.recentlyViewed.length} items
              </span>
            </div>
            <div className="bg-gray-700 rounded-lg p-5 flex flex-col items-center">
              <span className="text-sm text-gray-400 mb-1">Recently Searched</span>
              <span className="text-xl font-semibold text-white">
                {userDetails.recentlySearched.length} items
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;