import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../redux/userSlice";

const LoginModal = ({ onClose, onSignupClick, onLoginSuccess }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSendOtp = async () => {
    if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`https://readcycle-backend-gyud.onrender.com/api/auth/send-otp?mobile=${mobile}`);
      setOtpSent(true);
    } catch (err) {
      alert("Failed to send OTP. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      const fullPhone = "91" + mobile;

      const res = await axios.post("https://readcycle-backend-gyud.onrender.com/api/auth/verify-otp", {
        phone: fullPhone,
        otp: otp,
      });

      const { token, user } = res.data;
      dispatch(setUser(user));
      dispatch(setToken(token));

      if (onLoginSuccess) {
        onLoginSuccess(); // ✅ Auto-close modal on login success
      }
    } catch (err) {
      alert("Invalid OTP or verification failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://readcycle-backend-gyud.onrender.com/oauth2/authorization/google";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-96 relative shadow-lg transition-all">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          {isOtpSent ? "Enter OTP" : "Login via WhatsApp"}
        </h2>

        {!isOtpSent ? (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter 10-digit mobile number"
            />
            <button
              onClick={handleSendOtp}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {isLoading ? "Sending..." : "Get WhatsApp OTP"}
            </button>
          </>
        ) : (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter OTP from WhatsApp"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {isLoading ? "Verifying..." : "Login"}
            </button>
          </>
        )}

        <div className="my-4 flex items-center">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="px-2 text-gray-500 dark:text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <FcGoogle className="text-xl" />
          <span className="text-gray-800 dark:text-gray-200">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
