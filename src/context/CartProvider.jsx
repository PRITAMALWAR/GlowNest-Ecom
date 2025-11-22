import { createContext, useState, useEffect } from "react";

// Create Cart Context
export const CartContext = createContext(null);

// Cart Provider Component
const CartProvider = ({ children }) => {
  // Load cart from localStorage on mount
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Ensure it's an array
        return Array.isArray(parsedCart) ? parsedCart : [];
      }
      return [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      // Ensure cart is an array before saving
      if (Array.isArray(cart)) {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // If exists, increase quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new, add with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update product quantity in cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total items in cart
  const getTotalItems = () => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((total, item) => {
      const quantity = item?.quantity || 0;
      return total + quantity;
    }, 0);
  };

  // Calculate total price
  const getTotalPrice = () => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((total, item) => {
      if (!item || typeof item.price !== 'number') return total;
      const discountedPrice = item.price * (1 - (item.discountPercentage || 0) / 100);
      const quantity = item.quantity || 0;
      return total + discountedPrice * quantity;
    }, 0);
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    if (!Array.isArray(cart)) return false;
    return cart.some((item) => item?.id === productId);
  };

  // Provide cart state and functions to children
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

