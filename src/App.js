import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import BuyPage from "./pages/BuyPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CategoryPage from './pages/CategoryPage';
import SearchResultsPage from './pages/SearchResultsPage';
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      {/* Pass user and setUser to Navbar so it can update if needed */}
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product-category/:category" element={<CategoryPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        
        {/* Pass setUser to update state after OAuth2 login */}
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
