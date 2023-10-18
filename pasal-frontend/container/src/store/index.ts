import { configureStore } from "@reduxjs/toolkit";
import auth from "../../reducers/authSlice";
import product from '../../reducers/productSlice';

export const Store = configureStore({
    reducer: {
        auth, 
        product
    }
});

export type RootState = ReturnType <typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;