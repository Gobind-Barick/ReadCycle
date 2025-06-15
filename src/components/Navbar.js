// src/components/Navbar.js
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import ModeComponent from "./Mode";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    window.location.reload();
    window.location.href = "https://readcycle-backend-gyud.onrender.com/api/logout";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="w-full z-50 bg-white dark:bg-gray-900 shadow px-4 py-3 md:px-10 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-black dark:text-white">Readcycle</Link>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-md text-black dark:text-white font-semibold">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded"
            />
            <button type="submit" className="absolute right-2 top-1.5 text-gray-600">
              <FiSearch />
            </button>
          </form>

          <Link to="/" className="hover:underline">Buy</Link>
          <Link to="/sell" className="hover:underline">Sell</Link>
          <Link to="/cart" className="relative">
            <FiShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          <ModeComponent />
          {!user ? (
            <button onClick={() => setShowLogin(true)}>Login</button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                onClick={() => setDropdownOpen(!dropdownOpen)}
                src={user.avatarUrl || "https://www.gravatar.com/avatar/?d=mp"}
                className="w-8 h-8 rounded-full cursor-pointer border"
                alt="user"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border rounded shadow">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-3 text-sm text-gray-800 dark:text-white font-semibold overflow-y-auto max-h-[calc(100vh-4rem)]">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded text-black dark:text-white"
            />
          </form>
          <Link to="/" className="block">Buy</Link>
          <Link to="/sell" className="block">Sell</Link>
          <Link to="/cart" className="block">Cart ({cartItems.length})</Link>
          <ModeComponent />
          {!user ? (
            <button onClick={() => setShowLogin(true)}>Login</button>
          ) : (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="text-red-600">Logout</button>
            </>
          )}
        </div>
      )}

      {showLogin && !user && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSignupClick={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && !user && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onLoginClick={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
