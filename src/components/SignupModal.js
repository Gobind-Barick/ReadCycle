// src/components/SignupModal.js
import React from "react";

const SignupModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
        ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Create an Account</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email (optional)"
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button onClick={onClose} className="text-blue-600 underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
