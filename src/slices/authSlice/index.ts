import {createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState = {
    accessToken: "",
    userRole: "",
    isAuthenticated: false
}

    
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{accessToken: string, userRole: string}>) => {
            state.accessToken = action.payload.accessToken;
            state.userRole = action.payload.userRole;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.accessToken = "";
            state.userRole = "";
            state.isAuthenticated = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userRole");
        },
        updateAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        }
    }

})

export const {loginSuccess, logout, updateAccessToken} = authSlice.actions;
export default authSlice.reducer;