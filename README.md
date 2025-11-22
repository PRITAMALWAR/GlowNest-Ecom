# 🛍️ GlowNest E-Commerce Platform

A modern, full-featured e-commerce web application built with React. Shop for products, manage your cart, and enjoy a seamless shopping experience.

## 🌐 Live Demo

**🔗 [View Live Project](https://glittery-donut-e66996.netlify.app/)**

## 📸 Screenshots

<div align="center">
  
![Home Page](https://drive.google.com/uc?export=view&id=1uQLm96h6SLOMl03FJ2nHfpfljaZUoDg-)
*Home Page with Hero Section*

![Products Page](https://drive.google.com/uc?export=view&id=1j8D-91zvOmGyuxpQXzD6P3MDpjUEXEDa)
*Products Listing with Filters*

![Product Details](https://drive.google.com/uc?export=view&id=1Y2q2OcZW1o1eu_Nyf4x_rSLRfbBtGd-s)
*Product Details Page*

![Shopping Cart](https://drive.google.com/uc?export=view&id=1wceyUI4rG-y02MHmPPg_dTOl49m-7A4F)
*Shopping Cart*

![User Profile](https://drive.google.com/uc?export=view&id=1zjSOMFijftfZgpa9JOFxWy4xnfMrPMjw)
*User Profile Page*

</div>

## ✨ Features

- 🔐 **User Authentication** - Register, login, and secure session management
- 🛒 **Shopping Cart** - Add, remove, and manage cart items with persistent storage
- 🎯 **Product Management** - Browse products with category filters and price sorting
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔔 **Toast Notifications** - Real-time feedback for all user actions
- 🛡️ **Protected Routes** - Secure access to user-specific pages
- 🎨 **Modern UI** - Clean, user-friendly interface with smooth animations

## 🛠️ Tech Stack

- **React 18** - UI Library
- **React Router v7** - Routing
- **Tailwind CSS** - Styling
- **Context API** - State Management
- **Axios** - HTTP Client
- **LocalStorage** - Data Persistence
- **Lucide React** - Icons

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd GlowNest-Ecom

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── Components/     # Reusable components
├── context/        # Context providers (Auth, Cart, Toast)
├── Pages/          # Page components
├── routes/         # Route configuration
└── utlis/          # Utility functions
```

## 🎯 Key Features Explained

### Authentication System
- User registration with email validation
- Secure login/logout functionality
- Protected routes for authenticated users
- Session persistence using LocalStorage

### Shopping Cart
- Add products to cart (requires login)
- Update item quantities
- Remove items
- Calculate total with discounts
- Persistent cart storage

### Product Features
- View all products in grid layout
- Filter by category
- Sort by price (low to high / high to low)
- View detailed product information
- Stock status indicators

## 🔐 Default Credentials

You can create a new account or use existing credentials:
- Register a new account through the signup page
- All user data is stored in browser LocalStorage

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌟 Highlights

- ✅ Complete authentication flow
- ✅ Full shopping cart functionality
- ✅ Product filtering and sorting
- ✅ Responsive mobile design
- ✅ Toast notification system
- ✅ Protected routes
- ✅ Modern UI/UX

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built with ❤️ using React

---

**🔗 [Live Demo](https://glittery-donut-e66996.netlify.app/) | 📧 For questions, open an issue**
