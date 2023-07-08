import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTH_KEY } from "../../constants";

const userSessionSaved: string | null = window.localStorage.getItem(AUTH_KEY);

interface User {
    iat: number;
    exp: number;
    id: number;
    role: string;
    name: string;
    email: string;
    permissions: string[];
}

export interface AuthState {
    auth: boolean;
    user: User;
    token: string;
}

const initialState: AuthState = {
    auth: false,
    user: {
        iat: 0,
        exp: 0,
        id: 0,
        role: "",
        name: "",
        email: "",
        permissions: [],
    },
    token: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState: userSessionSaved
        ? (JSON.parse(userSessionSaved) as AuthState)
        : initialState,
    reducers: {
        setAuthenticatedUser: (
            _state,
            { payload }: PayloadAction<AuthState>
        ): AuthState => payload,
        resetUserAuthenticated: (): AuthState => {
            window.localStorage.removeItem(AUTH_KEY);

            return initialState;
        },
    },
});

export const { setAuthenticatedUser, resetUserAuthenticated } =
    authSlice.actions;

export default authSlice.reducer;
