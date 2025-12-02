import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    currentUser: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        setCurrentUser: (state, action) => {
       state.currentUser = action.payload
       },
    }
});

export const { login, Logout, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
