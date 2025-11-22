import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { User, Mail, LogOut, ShoppingBag, Settings, Heart } from "lucide-react";

const Profile = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  // Show loading if no user
  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/register");
  };

  // Safe defaults for user properties
  const userName = user?.name || "User";
  const userEmail = user?.email || "No email";
  const userJoinDate = user?.joinDate || "Recently";
  const userProfilePicture = user?.profilePicture || "https://cdn.icon-icons.com/icons2/3150/PNG/512/user_profile_male_icon_192702.png";
  const userTotalOrders = user?.totalOrders || 0;

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Profile Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={userProfilePicture}
                alt="User Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                onError={(e) => {
                  e.target.src = "https://cdn.icon-icons.com/icons2/3150/PNG/512/user_profile_male_icon_192702.png";
                }}
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {userName}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-4">
                <Mail className="w-5 h-5" />
                <span>{userEmail}</span>
              </div>
              <p className="text-gray-500 mb-4">
                Member since {userJoinDate}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-xl font-bold text-blue-600">
                    {userTotalOrders}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => navigate("/products")}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow text-left"
          >
            <ShoppingBag className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1">Shop Now</h3>
            <p className="text-sm text-gray-600">
              Browse our collection of products
            </p>
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow text-left"
          >
            <ShoppingBag className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1">My Cart</h3>
            <p className="text-sm text-gray-600">View your shopping cart</p>
          </button>

          <button className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow text-left">
            <Heart className="w-8 h-8 text-red-600 mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1">Wishlist</h3>
            <p className="text-sm text-gray-600">Your saved items</p>
          </button>
        </div>

        {/* Account Settings */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Account Settings
          </h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">Edit Profile</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">Account Settings</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">Order History</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
