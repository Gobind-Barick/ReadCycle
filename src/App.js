import React from "react";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product-category/:category" element={<CategoryPage />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsAndCondition />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/rrp" element={<ReturnRefundPolicy />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
