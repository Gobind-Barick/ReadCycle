import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/addresses';

export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
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

export const addAddress = createAsyncThunk(
  'address/addAddress',
  async ({ token, address }, { rejectWithValue }) => {
    try {
      const res = await axios.post(BASE_URL, address, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Add failed');
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
      });
  },
});

export default addressSlice.reducer;
