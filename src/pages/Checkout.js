import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadRazorpayScript } from "../utils/razorpay";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const mockBook = {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: 450,
    condition: "Good",
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod !== "razorpay") {
      alert("Only Razorpay is implemented at the moment.");
      return;
    }

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const amountInPaise = mockBook.price * 100;

    const options = {
      key: "rzp_test_fLdHPGEAL3ijP6", // ✅ Your Razorpay test key
      amount: amountInPaise,
      currency: "INR",
      name: "BookNook",
      description: `Payment for ${mockBook.title}`,
      image: "https://via.placeholder.com/100x100?text=Logo",
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
        book_title: mockBook.title,
        book_id: mockBook.id,
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
          <input type="text" placeholder="Full Name" className="w-full p-2 border mb-4 rounded" />
          <input type="text" placeholder="Address" className="w-full p-2 border mb-4 rounded" />
          <input type="text" placeholder="City" className="w-full p-2 border mb-4 rounded" />
          <input type="text" placeholder="Pincode" className="w-full p-2 border mb-4 rounded" />
        </div>

        {/* Order Summary + Payment */}
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="mb-4">
            <p className="font-medium">{mockBook.title}</p>
            <p>Price: ₹{mockBook.price}</p>
          </div>

          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={() => setPaymentMethod("razorpay")}
              />
              <span>Pay with Razorpay</span>
            </label>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
