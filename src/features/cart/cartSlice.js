import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      title: "Atomic Habits",
      price: 450,
      condition: "Good",
      image: "https://via.placeholder.com/100x130",
      quantity: 1,
    },
    {
      id: 2,
      title: "1984",
      price: 250,
      condition: "Fair",
      image: "https://via.placeholder.com/100x130",
      quantity: 1,
    },
  ]
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { 
  incrementQuantity, 
  decrementQuantity, 
  removeItem, 
  addItem,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = state => state.cart.items;
export const selectCartTotal = state => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);