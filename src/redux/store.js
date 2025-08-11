import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slice/filterSlice';
import cartSlice from './slice/cartSlice';

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
    },
});