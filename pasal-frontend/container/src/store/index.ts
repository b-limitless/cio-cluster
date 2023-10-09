import { configureStore } from "@reduxjs/toolkit";
import auth from "../../reducers/authSlice";

export const Store = configureStore({
    reducer: {
        auth
    }
});

export type RootState = ReturnType <typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;