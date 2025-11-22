import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Check, ArrowLeft } from "lucide-react";
import { CartContext } from "../context/CartProvider";
import { AuthContext } from "../context/AuthProvider";
import { ToastContext } from "../context/ToastProvider";
import Loader from "../Components/Common/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { showSuccess, showWarning } = useContext(ToastContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Safely get cart functions
  const addToCart = cartContext?.addToCart || (() => {});
  const isInCart = cartContext?.isInCart || (() => false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product not found
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Calculate discounted price
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const productInCart = isInCart(product.id);

  // Handle add to cart
  const handleAddToCart = () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      showWarning("Please login to add items to cart", 2000);
      setTimeout(() => {
        navigate("/register");
      }, 2000);
      return;
    }
    
    // Add to cart if logged in
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showSuccess(
      `${quantity} ${quantity === 1 ? "item" : "items"} added to cart!`
    );
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
              <img
                src={
                  selectedImage === 0
                    ? product.thumbnail
                    : product.images?.[selectedImage - 1]
                }
                alt={product.title}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-5 gap-2">
                <button
                  onClick={() => setSelectedImage(0)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === 0
                      ? "border-blue-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </button>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index + 1)}
                    className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === index + 1
                        ? "border-blue-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Brand and Title */}
            <div>
              <p className="text-sm text-gray-500 uppercase mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.rating})</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{product.reviews?.length || 0} reviews</span>
            </div>

            {/* Price */}
            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-800">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                      -{Math.round(product.discountPercentage)}% OFF
                    </span>
                  </>
                )}
              </div>
              <p
                className={`text-sm font-medium ${
                  product.stock < 10 ? "text-red-600" : "text-green-600"
                }`}
              >
                {product.stock < 10
                  ? `Only ${product.stock} left in stock!`
                  : `${product.stock} available in stock`}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-800 font-semibold min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-semibold transition-colors ${
                  product.stock === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : productInCart
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {productInCart
                  ? "Add More to Cart"
                  : product.stock === 0
                  ? "Out of Stock"
                  : !isLoggedIn
                  ? "Login to Add to Cart"
                  : "Add to Cart"}
              </button>
              {isLoggedIn && (
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full bg-gray-100 text-gray-800 py-4 px-6 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  View Cart
                </button>
              )}
            </div>

            {/* Product Description */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Additional Information */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Product Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Category:</span>{" "}
                    {product.category}
                  </p>
                  {product.sku && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">SKU:</span> {product.sku}
                    </p>
                  )}
                  {product.weight && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Weight:</span> {product.weight}g
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  {product.warrantyInformation && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Warranty:</span>{" "}
                      {product.warrantyInformation}
                    </p>
                  )}
                  {product.shippingInformation && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Shipping:</span>{" "}
                      {product.shippingInformation}
                    </p>
                  )}
                  {product.returnPolicy && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Returns:</span>{" "}
                      {product.returnPolicy}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Customer Reviews ({product.reviews.length})
                </h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium text-gray-800">
                          {review.reviewerName}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{review.comment}</p>
                      <p className="text-gray-400 text-xs">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;