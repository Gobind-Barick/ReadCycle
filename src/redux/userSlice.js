// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Safely parse user from localStorage
let storedUser = null;
try {
  const userStr = localStorage.getItem("user");
  storedUser = userStr ? JSON.parse(userStr) : null;
} catch (err) {
  console.error("Error parsing user from localStorage", err);
  localStorage.removeItem("user"); // Clean up corrupted value
}

const initialState = {
  user: storedUser,
  token: localStorage.getItem("jwt") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));

      if (typeof window !== "undefined" && localStorage.getItem("jwt") && !sessionStorage.getItem("profilePageReloaded")) {
        sessionStorage.setItem("profilePageReloaded", "true");
        window.location.reload();
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("jwt", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("profilePageReloaded");
      }
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
