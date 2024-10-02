import { configureStore } from "@reduxjs/toolkit";


import authReducer from "../slices/authSlice";
import tabSignInRegisterReducer from "../slices/tabSignInRegisterSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        tabSignInRegister:  tabSignInRegisterReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
