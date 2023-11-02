import { configureStore } from "@reduxjs/toolkit";
import auth from "../../reducers/authSlice";
import product from '../../reducers/productSlice';
import users from "../../reducers/userSlice";

export const Store = configureStore({
    reducer: {
        auth, 
        product, 
        users
    }
});

export type RootState = ReturnType <typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;