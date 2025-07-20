// Cart.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeCartItemFromBackend,
} from "../redux/cartSlice";
import {
  removeSellCartItemFromBackend,
  addSellCartItemToBackend,
} from "../redux/sellCartSlice";

// Selectors for buy cart
const selectCartItems = (state) => state.cart?.items || [];
const selectCartTotal = (state) =>
  (state.cart?.items || []).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

// Selectors for sell cart
const selectSellCartItems = (state) => state.sellCart?.items || [];
const selectSellCartTotal = (state) =>
  (state.sellCart?.items || []).reduce(
    (acc, item) => acc + item.sellPrice,
    0
  );

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("buy");

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const sellCartItems = useSelector(selectSellCartItems);
  const sellCartTotal = useSelector(selectSellCartTotal);

  const token = localStorage.getItem("jwt");

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemoveBuy = (id) => {
    if (!token) {
      console.warn("User not authenticated.");
      return;
    }
    dispatch(removeCartItemFromBackend({ id, token }));
  };

  const handleRemoveSell = (id) => {
    if (!token) {
      console.warn("User not authenticated.");
      return;
    }
    dispatch(removeSellCartItemFromBackend({ id, token }));
  };

  const handleSellNow = (item) => {
    if (!token) {
      console.warn("User not authenticated.");
      return;
    }

    // Dispatch to backend to ensure proper bookId storage
    dispatch(addSellCartItemToBackend({ bookId: item.bookId, token }))
      .unwrap()
      .then(() => {
        navigate(`/sell/${item.bookId}`);
      })
      .catch((err) => {
        console.error("Failed to add sell cart item:", err);
      });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* Tabs */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setActiveTab("buy")}
          className={`px-4 py-2 rounded ${
            activeTab === "buy"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Buy Cart
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`px-4 py-2 rounded ${
            activeTab === "sell"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Sell Cart
        </button>
      </div>

      {/* Buy Cart View */}
      {activeTab === "buy" && (
        <>
          {cartItems.length === 0 ? (
            <p>Your buy cart is empty.</p>
          ) : (
            <>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center bg-white shadow p-4 rounded"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-32 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <p className="text-gray-600">
                        Condition: {item.condition}
                      </p>
                      <p className="text-lg font-bold">₹{item.price}</p>
                      <div className="mt-2 flex items-center space-x-3">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={() => handleDecrement(item.id)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="text-red-500 hover:underline ml-4"
                      onClick={() => handleRemoveBuy(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-right">
                <p className="text-xl font-semibold">Total: ₹{cartTotal}</p>
                <Link to="/checkout">
                  <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </>
          )}
        </>
      )}

      {/* Sell Cart View */}
      {activeTab === "sell" && (
        <>
          {sellCartItems.length === 0 ? (
            <p>Your sell cart is empty.</p>
          ) : (
            <>
              <div className="space-y-6">
                {sellCartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center bg-white shadow p-4 rounded"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-32 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <p className="text-lg font-bold">
                        Sell Price: ₹{item.sellPrice}
                      </p>
                    </div>

                    {/* Sell Now Button */}
                    <button
                      onClick={() => handleSellNow(item)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-2"
                    >
                      Sell Now
                    </button>

                    <button
                      className="text-red-500 hover:underline ml-4"
                      onClick={() => handleRemoveSell(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-right">
                <p className="text-xl font-semibold">
                  Total Sell Value: ₹{sellCartTotal}
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
