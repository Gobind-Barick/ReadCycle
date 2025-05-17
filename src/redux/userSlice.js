// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("jwt") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));

      // If token already exists and profile page hasn't been reloaded, force reload once
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

      // Clear sessionStorage reload flag on logout
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("profilePageReloaded");
      }
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
