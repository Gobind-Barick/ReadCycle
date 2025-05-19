import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { fetchCartItems } from "../redux/cartSlice"; // ✅ Import

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const userString = params.get("user");

    if (token && userString) {
      try {
        const user = JSON.parse(decodeURIComponent(userString));

        // ✅ Save token and user to localStorage
        localStorage.setItem("jwt", token);
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Update Redux state
        dispatch(setUser(user));

        // ✅ Fetch cart items
        dispatch(fetchCartItems(token));

        // Redirect to homepage
        navigate("/");
      } catch (error) {
        console.error("Failed to parse user info:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [location, navigate, dispatch]);

  return <div>Logging in...</div>;
};

export default OAuth2RedirectHandler;
