import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const Navbar = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser || null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage if not passed in props
    const storedUser = localStorage.getItem("user");
    if (!user && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user:", err);
      }
    }
  }, [user]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload(); // or navigate(0)
  };

  const renderAvatar = () => {
    const initials = user?.name?.charAt(0)?.toUpperCase() || "U";
    return (
      <div className="relative group">
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm cursor-pointer">
          {initials}
        </div>
        {/* Dropdown menu */}
        <div className="absolute hidden group-hover:block right-0 mt-2 bg-white border rounded shadow-md z-10 min-w-[120px]">
          <div className="px-4 py-2 text-sm text-gray-700">Hi, {user.name}</div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    );
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

          {!user ? (
            <button onClick={() => setShowLogin(true)}>Login</button>
          ) : (
            renderAvatar()
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
