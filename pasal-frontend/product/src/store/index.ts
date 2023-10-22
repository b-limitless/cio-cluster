import { configureStore } from "@reduxjs/toolkit";
import product from '../../reducers/productSlice';

export const Store = configureStore({
    reducer: {
        product
    }
});

export type RootState = ReturnType <typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;