import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartProvider";
import { AuthContext } from "../context/AuthProvider";
import { ToastContext } from "../context/ToastProvider";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Loader from "../Components/Common/Loader";

const Cart = () => {
  const cartContext = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { showSuccess, showInfo } = useContext(ToastContext);
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/register");
    }
  }, [isLoggedIn, navigate]);

  // Show loading if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Safety check for cart context
  if (!cartContext) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = cartContext;

  // Ensure cart is an array
  const cartArray = Array.isArray(cart) ? cart : [];

  // Empty cart state
  if (cartArray.length === 0) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            You have {cartArray.length} {cartArray.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartArray.map((item) => {
              const discountedPrice =
                item.price * (1 - item.discountPercentage / 100);

              return (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3
                        className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer hover:text-blue-600"
                        onClick={() => navigate(`/products/${item.id}`)}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Brand: {item.brand}
                      </p>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-gray-800">
                            ${discountedPrice.toFixed(2)}
                          </span>
                          {item.discountPercentage > 0 && (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                ${item.price.toFixed(2)}
                              </span>
                              <span className="text-sm text-green-600 font-medium">
                                {Math.round(item.discountPercentage)}% OFF
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 font-medium">
                          Quantity:
                        </span>
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                      <button
                        onClick={() => {
                          updateQuantity(item.id, item.quantity - 1);
                          if (item.quantity > 1) {
                            showInfo("Quantity updated");
                          }
                        }}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                          <span className="px-4 py-2 text-gray-800 font-semibold min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                      <button
                        onClick={() => {
                          updateQuantity(item.id, item.quantity + 1);
                          showInfo("Quantity updated");
                        }}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div className="flex flex-col justify-between items-end">
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          showSuccess(`${item.title} removed from cart`);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Subtotal</p>
                        <p className="text-lg font-bold text-gray-800">
                          ${(discountedPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartArray.length} items)</span>
                  <span className="font-semibold">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/products")}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    showInfo("Cart cleared");
                  }}
                  className="w-full text-red-600 py-2 hover:text-red-700 transition-colors text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

