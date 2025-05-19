import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadRazorpayScript } from "../utils/razorpay";

import { fetchAddresses } from "../redux/addressSlice"; // Your thunk
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { addresses, loading: addressesLoading, error: addressesError } = useSelector(
    (state) => state.address
  );

  const cartItems = useSelector((state) => state.cart?.items || []);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  // Fetch addresses on mount if user.token is present
  useEffect(() => {
    if (user.token) {
      dispatch(fetchAddresses(user.token));
    }
  }, [dispatch, user.token]);

  // When addresses load, select first one by default
  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddressId(addresses[0].id || addresses[0]._id);
    }
  }, [addresses]);

  // Clear cart function: calls backend and redux
  const clearCartFromBackend = async () => {
    try {
      await fetch(`/api/cart/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(clearCart());
    } catch (error) {
      console.error("Failed to clear cart from backend:", error);
    }
  };

  const isAddressSelected = () => {
    return selectedAddressId !== null;
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("🛒 Your cart is empty.");
      return;
    }

    if (!isAddressSelected()) {
      alert("❗ Please select a billing address.");
      return;
    }

    if (paymentMethod === "cod") {
      alert("✅ Order placed with Cash on Delivery!");
      await clearCartFromBackend();
      navigate("/");
      return;
    }

    // Razorpay payment flow
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const amountInPaise = total * 100;

    const selectedAddress = addresses.find(
      (addr) => (addr.id || addr._id) === selectedAddressId
    );

    const options = {
      key: "rzp_test_fLdHPGEAL3ijP6",
      amount: amountInPaise,
      currency: "INR",
      name: "BookNook",
      description: `Payment for ${cartItems.length} item(s)`,
      image: "https://via.placeholder.com/100x100?text=Logo",
      handler: async function (response) {
        alert("✅ Payment Successful!");
        console.log("Razorpay Response:", response);

        await clearCartFromBackend();

        navigate("/");
      },
      prefill: {
        name: selectedAddress?.name || "",
        email: user.email || "testuser@example.com",
        contact: selectedAddress?.phone || "9999999999",
      },
      notes: {
        cart_items: JSON.stringify(
          cartItems.map((item) => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
          }))
        ),
        address: JSON.stringify(selectedAddress),
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
        {/* Saved Addresses */}
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Select Billing Address</h2>
          {addressesLoading ? (
            <p>Loading addresses...</p>
          ) : addressesError ? (
            <p className="text-red-600">Error: {addressesError}</p>
          ) : addresses.length === 0 ? (
            <p>No saved addresses found. Please add an address in your profile.</p>
          ) : (
            <div className="space-y-4">
              {addresses.map((addr) => {
                const addrId = addr.id || addr._id;
                return (
                  <label
                    key={addrId}
                    className="block border rounded p-4 cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={addrId}
                      checked={selectedAddressId === addrId}
                      onChange={() => setSelectedAddressId(addrId)}
                      className="mr-3"
                    />
                    <span>
                      <strong>{addr.name}</strong>
                      ,{addr.city}, {addr.state}, {" "}
                      {addr.pincode || addr.pinCode || addr.postalCode || "N/A"} <br />
                      Phone: {addr.phone}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Order Summary + Payment */}
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="mb-4 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm border-b pb-2"
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold pt-3 border-t">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          )}

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
