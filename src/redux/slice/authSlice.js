import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    currentUser: null,
    token: null,
    refreshToken: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isLoggedIn = true;
        },
        setCurrentUser: (state, action) => {
       state.currentUser = action.payload
       },
        Logout: (state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
            state.token = null;
            state.refreshToken = null;
        },
         setToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

export const { login, Logout, setCurrentUser, setToken } = authSlice.actions;
export default authSlice.reducer;
