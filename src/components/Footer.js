import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">BookBazaar</h3>
          <p className="text-sm">
            Your trusted marketplace for buying and selling pre-loved books.
            Discover, trade, and enjoy reading like never before.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/sell" className="hover:text-white">Sell Books</Link></li>
            <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Customer Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/returns" className="hover:text-white">Returns & Refunds</Link></li>
            <li><Link to="/shipping" className="hover:text-white">Shipping Info</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 mt-2">
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg className="w-6 h-6 fill-current hover:text-white" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.63 9.87v-6.99H8v-2.88h2.37V9.41c0-2.34 1.4-3.63 3.52-3.63.72 0 1.66.13 1.66.13v1.84h-.94c-.93 0-1.22.58-1.22 1.17v1.41h2.08l-.33 2.88h-1.75v6.99A10 10 0 0 0 22 12z"/>
              </svg>
            </a>
            {/* Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg className="w-6 h-6 fill-current hover:text-white" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.27 4.27 0 0 0 1.88-2.37 8.5 8.5 0 0 1-2.7 1.03A4.24 4.24 0 0 0 16.14 4c-2.35 0-4.25 1.9-4.25 4.25 0 .33.04.65.1.96C7.69 8.96 4.3 7.16 2 4.49a4.26 4.26 0 0 0-.58 2.14c0 1.48.76 2.78 1.9 3.54a4.2 4.2 0 0 1-1.93-.53v.05c0 2.07 1.47 3.8 3.42 4.2a4.2 4.2 0 0 1-1.92.07c.54 1.67 2.1 2.89 3.95 2.93A8.51 8.51 0 0 1 2 19.54 12 12 0 0 0 8.29 21c7.55 0 11.69-6.26 11.69-11.69 0-.18 0-.35-.01-.53A8.36 8.36 0 0 0 22.46 6z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="w-6 h-6 fill-current hover:text-white" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2 0 3.584.01 4.849.07 1.17.057 1.96.24 2.41.404a4.9 4.9 0 0 1 1.71 1.11 4.9 4.9 0 0 1 1.11 1.71c.164.45.347 1.24.404 2.41.06 1.265.07 1.648.07 4.848s-.01 3.584-.07 4.849c-.057 1.17-.24 1.96-.404 2.41a4.9 4.9 0 0 1-1.11 1.71 4.9 4.9 0 0 1-1.71 1.11c-.45.164-1.24.347-2.41.404-1.265.06-1.648.07-4.849.07s-3.584-.01-4.849-.07c-1.17-.057-1.96-.24-2.41-.404a4.9 4.9 0 0 1-1.71-1.11 4.9 4.9 0 0 1-1.11-1.71c-.164-.45-.347-1.24-.404-2.41C2.21 15.584 2.2 15.2 2.2 12s.01-3.584.07-4.849c.057-1.17.24-1.96.404-2.41a4.9 4.9 0 0 1 1.11-1.71 4.9 4.9 0 0 1 1.71-1.11c.45-.164 1.24-.347 2.41-.404C8.416 2.21 8.8 2.2 12 2.2m0-2.2C8.735 0 8.332.01 7.052.07 5.771.129 4.812.33 4.05.595a7.113 7.113 0 0 0-2.57 1.65 7.113 7.113 0 0 0-1.65 2.57C.33 5.187.129 6.145.07 7.426.01 8.706 0 9.109 0 12s.01 3.294.07 4.574c.059 1.281.26 2.24.525 3.003.327.877.791 1.667 1.65 2.57.903.859 1.693 1.323 2.57 1.65.763.265 1.722.466 3.003.525C8.706 23.99 9.109 24 12 24s3.294-.01 4.574-.07c1.281-.059 2.24-.26 3.003-.525a7.113 7.113 0 0 0 2.57-1.65 7.113 7.113 0 0 0 1.65-2.57c.265-.763.466-1.722.525-3.003.059-1.281.07-1.684.07-4.574s-.01-3.294-.07-4.574c-.059-1.281-.26-2.24-.525-3.003a7.113 7.113 0 0 0-1.65-2.57A7.113 7.113 0 0 0 19.426.595C18.663.33 17.704.129 16.423.07 15.143.01 14.74 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.162a3.998 3.998 0 1 1 0-7.996 3.998 3.998 0 0 1 0 7.996zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BookBazaar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
