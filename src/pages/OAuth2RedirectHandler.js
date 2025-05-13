import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuth2RedirectHandler = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");

    if (token && name && email) {
      const user = { name, email };

      // Save token and user in localStorage
      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Set user in app state
      setUser(user);

      // Redirect to home
      navigate("/");
    } else {
      // Missing expected query params
      console.error("Missing OAuth2 redirect parameters");
      navigate("/");
    }
  }, [location, navigate, setUser]);

  return <div>Logging in...</div>;
};

export default OAuth2RedirectHandler;
