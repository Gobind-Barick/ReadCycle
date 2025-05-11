import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadRazorpayScript } from "../utils/razorpay";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
  });

  const mockBook = {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: 450,
    condition: "Good",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      form.name.trim() &&
      form.address.trim() &&
      form.city.trim() &&
      form.pincode.trim()
    );
  };

  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      alert("❗ Please fill in all billing details.");
      return;
    }

    if (paymentMethod === "cod") {
      alert("✅ Order placed with Cash on Delivery!");
      navigate("/");
      return;
    }

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const amountInPaise = mockBook.price * 100;

    const options = {
      key: "rzp_test_fLdHPGEAL3ijP6",
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
        name: form.name,
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
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleInputChange}
            className="w-full p-2 border mb-4 rounded"
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={handleInputChange}
            className="w-full p-2 border mb-4 rounded"
          />
          <input
            name="city"
            type="text"
            placeholder="City"
            value={form.city}
            onChange={handleInputChange}
            className="w-full p-2 border mb-4 rounded"
          />
          <input
            name="pincode"
            type="text"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleInputChange}
            className="w-full p-2 border mb-4 rounded"
          />
        </div>

        {/* Order Summary + Payment */}
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="mb-4">
            <p className="font-medium">{mockBook.title}</p>
            <p>Price: ₹{mockBook.price}</p>
          </div>

          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="mb-6 space-y-2">
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
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span>Cash on Delivery</span>
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
