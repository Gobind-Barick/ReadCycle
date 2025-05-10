import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-4 md:px-10 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        BookNook
      </Link>
      <div className="flex gap-6 text-gray-700 font-medium text-sm md:text-base">
        <Link to="/">Buy</Link>
        <Link to="/sell">Sell</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
