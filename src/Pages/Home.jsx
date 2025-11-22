import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Loader from "../Components/Common/Loader";
import { Star, ShoppingCart, ArrowRight, TrendingUp, Award, Zap, CheckCircle } from "lucide-react";
import { CartContext } from "../context/CartProvider";
import { AuthContext } from "../context/AuthProvider";
import { ToastContext } from "../context/ToastProvider";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { showSuccess, showWarning } = useContext(ToastContext);
  const [addedProductId, setAddedProductId] = useState(null);

  // Safely get cart function
  const addToCart = cartContext?.addToCart || (() => {});

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products.slice(0, 8));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

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

  return (
    <div className="bg-white">
      {/* Hero Section - Alternative Design */}
      <div className="relative bg-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-semibold text-sm">Premium Quality Products</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                Shop Smarter,<br />
                <span className="text-blue-600">Live Better</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Find everything you need in one place. From everyday essentials to luxury items, we've got you covered with the best prices and quality.
              </p>

              {/* Benefits List */}
              <div className="space-y-3 mb-10 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Premium Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Best Prices in the Market</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Fast & Free Delivery</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => navigate("/products")}
                  className="group bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transform hover:scale-105"
                >
                  Start Shopping
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="bg-white text-gray-800 border-2 border-gray-300 px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all font-semibold text-lg shadow-md hover:shadow-lg"
                >
                  About Us
                </button>
              </div>
            </div>

            {/* Right Column - Stats & Features */}
            <div className="grid grid-cols-2 gap-6">
              {/* Stat Cards */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                <div className="text-gray-600 text-sm">Happy Customers</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">5K+</div>
                <div className="text-gray-600 text-sm">Products Available</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-2 col-span-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
                    <div className="text-gray-600 text-sm">Satisfaction Guarantee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Featured Products
            </h2>
            <p className="text-gray-600">
              Handpicked selection of our best products
            </p>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const discountedPrice =
                product.price * (1 - product.discountPercentage / 100);
              return (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-64 object-contain bg-gray-50 p-4"
                    />
                    {product.discountPercentage > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                        {Math.round(product.discountPercentage)}% OFF
                      </div>
                    )}
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-colors ${
                        addedProductId === product.id
                          ? "bg-green-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                      title="Add to cart"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{product.brand}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
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
                      <span className="text-sm text-gray-600 ml-1">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-gray-800">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      {product.discountPercentage > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <p className="text-xs mb-3">
                      {product.stock > 0 ? (
                        <span className="text-green-600">In Stock</span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </p>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
