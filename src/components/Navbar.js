import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi"; // use react-icons for the search icon
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add your routing or search logic here
  };

  return (
    <>
      <nav className="bg-white shadow-md px-4 md:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          BookNook
        </Link>

        <div className="flex items-center gap-6 text-gray-700 font-medium text-sm md:text-base">
          {/* Search icon */}
          <button onClick={() => setShowSearch(!showSearch)} className="text-xl">
            <FiSearch />
          </button>

          {/* Search input field (toggleable) */}
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

          <Link to="/">Buy</Link>
          <Link to="/sell">Sell</Link>
          <button onClick={() => setShowLogin(true)}>Login</button>
        </div>
      </nav>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSignupClick={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
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
