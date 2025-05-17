import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

import ModeComponent from "./Mode";

import { useSelector, useDispatch } from "react-redux";
import {logout } from "../redux/userSlice";


const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    window.location.href = "http://localhost:8080/api/logout";
  };

  return (
    <>
      <nav className="shadow-md px-4 md:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          BookNook
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

          {!user ? (
            <button onClick={() => setShowLogin(true)}>Login</button>
          ) : (
            <div className="flex items-center gap-3">
              <img
                src={user.avatarUrl || "https://www.gravatar.com/avatar/?d=mp"}
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-700">Hi, {user.name || "User"}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
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
