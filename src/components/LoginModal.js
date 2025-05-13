import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon

const LoginModal = ({ onClose, onSignupClick }) => {
  const [mobile, setMobile] = useState("");
  const [isOtpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080";
    // Replace with your actual backend URL if different
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          {isOtpSent ? "Enter OTP" : "Login"}
        </h2>

        {!isOtpSent ? (
          <>
            <label className="block mb-2 text-sm font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              placeholder="Enter 10-digit mobile number"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Get OTP
            </button>
          </>
        ) : (
          <>
            <label className="block mb-2 text-sm font-medium">Enter OTP</label>
            <input
              type="text"
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              placeholder="Enter OTP"
            />
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Login
            </button>
          </>
        )}

        {/* Divider */}
        <div className="my-4 flex items-center">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100"
        >
          <FcGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <button
            className="text-blue-600 underline"
            onClick={onSignupClick}
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
