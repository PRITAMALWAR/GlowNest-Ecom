import Navbar from "./Components/Common/Navbar";

import "./app.css";
import AuthProvider from "./context/AuthProvider";
import CartProvider from "./context/CartProvider";
import ToastProvider from "./context/ToastProvider";
import AppRoutes from "./routes/AppRoutes";

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Navbar />
          <AppRoutes />
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}
