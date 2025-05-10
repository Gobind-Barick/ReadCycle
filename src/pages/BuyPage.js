import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadRazorpayScript } from "../utils/razorpay";

const BuyPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const book = state?.book;

  if (!book) {
    return (
      <div className="p-6 text-xl">
        No book data found.{" "}
        <button
          className="text-blue-600 underline"
          onClick={() => navigate("/")}
        >
          Go back
        </button>
      </div>
    );
  }

  const handleCheckout = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const amountInPaise = book.price * 100;

    const options = {
      key: "rzp_test_fLdHPGEAL3ijP6", // ✅ Replace with your actual Razorpay test key
      amount: amountInPaise,
      currency: "INR",
      name: "BookNook",
      description: `Payment for ${book.title}`,
      image: "https://via.placeholder.com/100x100?text=Logo",
      // order_id: "mock", // ❌ Removed to avoid "Oops" error
      handler: function (response) {
        alert("✅ Payment Successful!");
        console.log("Razorpay Response:", response);
        navigate("/");
      },
      prefill: {
        name: "Test User",
        email: "testuser@example.com",
        contact: "9999999999",
      },
      notes: {
        book_title: book.title,
        book_id: book.id,
      },
      theme: {
        color: "#38a169",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
        <p className="text-gray-700 mb-1">Author: {book.author}</p>
        <p className="text-gray-700 mb-1">Condition: {book.condition}</p>
        <p className="text-gray-700 mb-4">Price: ₹{book.price}</p>
        <button
          onClick={handleCheckout}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default BuyPage;
