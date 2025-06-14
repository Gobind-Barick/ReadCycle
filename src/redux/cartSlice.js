// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Replace with your backend URL
const BASE_URL = 'http://localhost:8080/api/cart';

// Get cart items for user
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Fetch failed');
    }
  }
);

// Add item to cart in DB
export const addCartItemToBackend = createAsyncThunk(
  'cart/addCartItemToBackend',
  async ({ item, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(BASE_URL, item, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Add failed');
    }
  }
);

// Remove item from cart in DB
export const removeCartItemFromBackend = createAsyncThunk(
  'cart/removeCartItemFromBackend',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Remove failed');
    }
  }
);

const initialState = {
  items: [], // { id, title, image, condition, price, quantity }
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // For local use
    incrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCartItemToBackend.fulfilled, (state, action) => {
        const existing = state.items.find(i => i.id === action.payload.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push(action.payload);
        }
      })

      .addCase(removeCartItemFromBackend.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const {
  incrementQuantity,
  decrementQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
