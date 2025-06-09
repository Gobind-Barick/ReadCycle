import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import BuyPage from "./pages/BuyPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CategoryPage from "./pages/CategoryPage";
import AboutUs from "./pages/AboutUs";
import TermsAndCondition from "./pages/TermsAndCondition";
import Sell from "./pages/Sell";
import Categories from "./pages/Categories";
import Faq from "./pages/Faq";
import ReturnRefundPolicy from "./pages/ReturnRefundPolicy";
import ContactUs from "./pages/ContactUs";
import SearchResultsPage from "./pages/SearchResultsPage";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";
import Navbar from "./components/Navbar";
import UserProfilePage from "./pages/UserProfilePage";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { fetchCartItems } from "./redux/cartSlice"; // ✅ Import
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("jwt");

    if (storedUser && storedToken) {
      dispatch(setUser(JSON.parse(storedUser)));
      dispatch(fetchCartItems(storedToken)); // ✅ Fetch cart on app load
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
        <Route path="/about" element={<AboutUs />} />
        <Route path="/Privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndCondition />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/rrp" element={<ReturnRefundPolicy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
