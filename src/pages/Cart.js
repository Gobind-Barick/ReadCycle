import React from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  // Mock cart data
  const cartItems = [
    {
      id: 1,
      title: "Atomic Habits",
      price: 450,
      condition: "Good",
      image: "https://via.placeholder.com/100x130",
    },
    {
      id: 2,
      title: "1984",
      price: 250,
      condition: "Fair",
      image: "https://via.placeholder.com/100x130",
    },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center bg-white shadow p-4 rounded">
                <img src={item.image} alt={item.title} className="w-24 h-32 object-cover rounded mr-4" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Condition: {item.condition}</p>
                  <p className="text-lg font-bold">₹{item.price}</p>
                </div>
                <button className="text-red-500 hover:underline">Remove</button>
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
