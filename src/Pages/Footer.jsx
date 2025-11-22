import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">GlowNest</h3>
            <p className="text-gray-600 text-sm mb-4">
              Your trusted destination for quality products. We bring you the best shopping experience with premium products and excellent customer service.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#shipping" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#returns" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <a href="mailto:support@glownest.com" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  support@glownest.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <a href="tel:+18001234567" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  +1 (800) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  123 Shopping Street, City, Country 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
