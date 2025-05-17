import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product-category/:category" element={<CategoryPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
