import { createContext } from "react";
import React, { useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // Load user from localStorage on mount
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("currentUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error loading user:", error);
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  // Update login state when user changes
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  // Register new user
  const handleRegister = (userData) => {
    try {
      // Get all users from localStorage
      const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");

      // Check if user already exists
      const existingUser = allUsers.find((u) => u.email === userData.email);

      if (existingUser) {
        return {
          success: false,
          message: "Email already registered. Please login instead.",
        };
      }

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password, // In production, hash this password
        profilePicture:
          "https://cdn.icon-icons.com/icons2/3150/PNG/512/user_profile_male_icon_192702.png",
        joinDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        totalOrders: 0,
        createdAt: new Date().toISOString(),
      };

      // Add to all users
      allUsers.push(newUser);
      localStorage.setItem("allUsers", JSON.stringify(allUsers));

      // Set as current user (auto login)
      const { password, ...userWithoutPassword } = newUser;
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      localStorage.setItem("authToken", newUser.email);
      setUser(userWithoutPassword);

      return {
        success: true,
        message: "Account created successfully!",
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: "Registration failed. Please try again.",
      };
    }
  };

  // Login user
  const handleLogin = (email, password) => {
    try {
      // Get all users from localStorage
      const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");

      // Find user by email
      const foundUser = allUsers.find((u) => u.email === email);

      if (!foundUser) {
        return {
          success: false,
          message: "User not found. Please check your email.",
        };
      }

      // Check password
      if (foundUser.password !== password) {
        return {
          success: false,
          message: "Incorrect password. Please try again.",
        };
      }

      // Remove password before storing
      const { password: _, ...userWithoutPassword } = foundUser;

      // Set as current user
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      localStorage.setItem("authToken", foundUser.email);
      setUser(userWithoutPassword);

      return {
        success: true,
        message: "Login successful!",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Login failed. Please try again.",
      };
    }
  };

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    setUser(null);
    setIsLoggedIn(false);
  };

  // Get current user
  const getCurrentUser = () => {
    return user;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        handleLogin,
        handleRegister,
        handleLogout,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
