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
  const cartItems = useSelector((state) => state.cart.items); // ⬅️ Get cart items from Redux
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
      <nav className="shadow-md px-4 md:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Readcycle
        </Link>

        <div className="flex items-center gap-6 text-gray-700 font-medium text-sm md:text-base">
          <button onClick={() => setShowSearch(!showSearch)} className="text-xl">
            <FiSearch />
          </button>

          {showSearch && (
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-md px-3 py-1 text-sm focus:outline-none"
              />
            </form>
          )}

          <ModeComponent />
          <Link to="/">Buy</Link>
          <Link to="/sell">Sell</Link>

          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative">
            <FiShoppingCart className="text-xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Login/Profile Section */}
          {!user ? (
            <button onClick={() => setShowLogin(true)}>Login</button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                onClick={() => setDropdownOpen((prev) => !prev)}
                src={user.avatarUrl || "https://www.gravatar.com/avatar/?d=mp"}
                alt="User avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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
