import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://readcycle-backend-gyud.onrender.com/api/sell-cart';

/**
 * Fetch sell cart items from backend
 */
export const fetchSellCartItems = createAsyncThunk(
  'sellCart/fetchSellCartItems',
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

/**
 * Add item to sell cart in backend
 */
export const addSellCartItemToBackend = createAsyncThunk(
  'sellCart/addSellCartItemToBackend',
  async ({ bookId, token }, { rejectWithValue }) => {
                   console.log("Adding to sell cart, bookId:", bookId);

    try {

      const response = await axios.post(
        BASE_URL,
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } },

      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Add failed');
    }
  }
);

/**
 * Remove item from sell cart in backend by ID
 */
export const removeSellCartItemFromBackend = createAsyncThunk(
  'sellCart/removeSellCartItemFromBackend',
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

/**
 * Clear entire sell cart in backend
 */
export const clearSellCartInBackend = createAsyncThunk(
  'sellCart/clearSellCartInBackend',
  async (token, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true; // success flag
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Clear failed');
    }
  }
);

const initialState = {
  items: [], // { id, title, author, sellPrice, quantity, user }
  loading: false,
  error: null,
};

const sellCartSlice = createSlice({
  name: 'sellCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchSellCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSellCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addSellCartItemToBackend.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addSellCartItemToBackend.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Remove
      .addCase(removeSellCartItemFromBackend.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeSellCartItemFromBackend.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Clear
      .addCase(clearSellCartInBackend.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(clearSellCartInBackend.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default sellCartSlice.reducer;
