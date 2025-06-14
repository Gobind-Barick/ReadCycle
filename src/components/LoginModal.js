import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../redux/userSlice"; // ✅ Make sure this path is correct

const LoginModal = ({ onClose, onSignupClick }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch(); // ✅ Redux dispatch

  const handleSendOtp = async () => {
    if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`http://localhost:8080/api/auth/send-otp?mobile=${mobile}`);
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

      const res = await axios.post("http://localhost:8080/api/auth/verify-otp", {
        phone: fullPhone,
        otp: otp,
      });

      const { token, user } = res.data;

      // ✅ Set via Redux actions
      dispatch(setUser(user));
      dispatch(setToken(token));
    } catch (err) {
      alert("Invalid OTP or verification failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
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
          {isOtpSent ? "Enter OTP" : "Login via WhatsApp"}
        </h2>

        {!isOtpSent ? (
          <>
            <label className="block mb-2 text-sm font-medium">Mobile Number</label>
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
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {isLoading ? "Sending..." : "Get WhatsApp OTP"}
            </button>
          </>
        ) : (
          <>
            <label className="block mb-2 text-sm font-medium">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
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
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100"
        >
          <FcGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <button className="text-blue-600 underline" onClick={onSignupClick}>
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
