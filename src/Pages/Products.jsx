import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Loader from "../Components/Common/Loader";
import { useNavigate } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartProvider";
import { AuthContext } from "../context/AuthProvider";
import { ToastContext } from "../context/ToastProvider";
import Footer from "./Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { showSuccess, showError, showWarning } = useContext(ToastContext);
  const [sortOrder, setSortOrder] = useState("none");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [addedProductId, setAddedProductId] = useState(null);

  // Safely get cart functions
  const addToCart = cartContext?.addToCart || (() => {});
  const isInCart = cartContext?.isInCart || (() => false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    
    // Check if user is logged in
    if (!isLoggedIn) {
      showWarning("Please login to add items to cart", 2000);
      setTimeout(() => {
        navigate("/register");
      }, 2000);
      return;
    }
    
    // Add to cart if logged in
    addToCart(product);
    setAddedProductId(product.id);
    showSuccess(`${product.title} added to cart!`);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  const sortedProducts = () => {
    let filteredProducts =
      selectedCategory === "all"
        ? products
        : products.filter((product) => product.category === selectedCategory);

    if (sortOrder === "none") return filteredProducts;
    return filteredProducts.sort((a, b) => {
      if (sortOrder === "h2l") {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            All Products
          </h1>
          <p className="text-gray-600 mb-6">
            Discover our wide range of quality products
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Category:
              </label>
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                onChange={handleSortChange}
                value={sortOrder}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">Default</option>
                <option value="l2h">Price: Low to High</option>
                <option value="h2l">Price: High to Low</option>
              </select>
            </div>
            <div className="ml-auto text-sm text-gray-600">
              Showing {sortedProducts().length} products
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts().map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative group">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute top-4 right-4">
                  <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                {product.discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                    {Math.round(product.discountPercentage)}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <p className="text-sm text-gray-500 uppercase">
                    {product.brand}
                  </p>
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.title}
                  </h2>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.floor(product.rating)
                            ? "fill-yellow-400"
                            : "fill-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.rating})
                  </span>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-800">
                      $
                      {(
                        product.price *
                        (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                    </span>
                    {product.discountPercentage > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stock Status */}
                <p className="text-sm mb-4">
                  {product.stock > 0 ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={product.stock === 0}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                      product.stock === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : addedProductId === product.id
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    title={!isLoggedIn ? "Login to add to cart" : "Add to cart"}
                  >
                    <ShoppingCart
                      className={`w-5 h-5 ${
                        addedProductId === product.id ? "text-white" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
