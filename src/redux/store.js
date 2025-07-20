
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import addressReducer from './addressSlice';
import sellCartReducer from './sellCartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
     cart: cartReducer,
     sellCart: sellCartReducer,
      address: addressReducer,
  },
});
