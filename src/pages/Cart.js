import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cartSlice"; // Adjust path if needed

// Safe selector for cart items
const selectCartItems = (state) => state.cart?.items || [];

// Total selector based on items
const selectCartTotal = (state) =>
  (state.cart?.items || []).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
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
                  <p className="text-gray-600">Condition: {item.condition}</p>
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
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 text-right">
            <p className="text-xl font-semibold">Total: ₹{total}</p>
            <Link to="/checkout">
              <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
