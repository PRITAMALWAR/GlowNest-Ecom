import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Products from "../Pages/Products";
import Register from "../Pages/Register";
import ProductDetails from "../Pages/ProductDetails";
import Profile from "../Pages/Profile";
import Cart from "../Pages/Cart";
import ProtectedRoutes from "../utlis/ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
