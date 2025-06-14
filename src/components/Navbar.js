import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import ModeComponent from "./Mode";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    dispatch(logout());
    window.location.reload();
    window.location.href = "https://readcycle-backend-gyud.onrender.com/api/logout";
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
      <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md px-4 md:px-10 py-4 flex items-center justify-between transition-colors duration-300">
        <Link to="/" className="text-2xl font-bold text-black dark:text-white">
          Readcycle
        </Link>

        <div className="flex items-center gap-6 font-medium text-sm md:text-base text-gray-700 dark:text-gray-300">
          <button onClick={() => setShowSearch(!showSearch)} className="text-xl hover:text-black dark:hover:text-white">
            <FiSearch />
          </button>

          {showSearch && (
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-200 dark:bg-gray-800 border border-gray-400 dark:border-gray-700 rounded-md px-3 py-1 text-sm text-black dark:text-white focus:outline-none"
              />
            </form>
          )}

          <ModeComponent />
          <Link to="/" className="hover:text-black dark:hover:text-white">Buy</Link>
          <Link to="/sell" className="hover:text-black dark:hover:text-white">Sell</Link>

          <Link to="/cart" className="relative hover:text-black dark:hover:text-white">
            <FiShoppingCart className="text-xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {!user ? (
            <button onClick={() => setShowLogin(true)} className="hover:text-black dark:hover:text-white">
              Login
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                onClick={() => setDropdownOpen((prev) => !prev)}
                src={user.avatarUrl || "https://www.gravatar.com/avatar/?d=mp"}
                alt="User avatar"
                className="w-8 h-8 rounded-full cursor-pointer border border-black dark:border-white"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg py-2 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

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
