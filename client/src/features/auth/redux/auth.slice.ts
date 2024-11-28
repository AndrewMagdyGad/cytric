import { User } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./auth.api";

const initialState: {
    user: User | null;
    token: string | null;
    isloading: boolean;
} = {
    user: null,
    token: null,
    isloading: false,
};

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isloading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isloading = false;
            }
        );
    },

    selectors: {
        selectCurrentUser: (state) => state.user,
        userIsLoading: (state) => state.isloading,
        isLoggedIn: (state) => !!state.user && !!state.token,
    },
});

export const { selectCurrentUser, userIsLoading, isLoggedIn } =
    authSlice.selectors;
export const { setUser, setLoading, logout } = authSlice.actions;
