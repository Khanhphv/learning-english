import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    showTab: false
}


const tabSignInRegisterSlice = createSlice({
    name: 'tabSignInRegister',
    initialState,
    reducers: {
        showTabSignInRegister: (state) => {
            state.showTab = true;
        },
        hideTabSignInRegister: (state) => {
            state.showTab = false;
        }
    }


})

export const { showTabSignInRegister, hideTabSignInRegister } = tabSignInRegisterSlice.actions;
export default tabSignInRegisterSlice.reducer;