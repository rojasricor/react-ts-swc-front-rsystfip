import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTH_KEY } from "../../constants";
import { ObjsHasSameStructure } from "../../libs/utils";

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

const userSessionSaved: AuthState = JSON.parse(
    window.localStorage.getItem(AUTH_KEY) || "{}"
);

const authSlice = createSlice({
    name: "auth",
    initialState: ObjsHasSameStructure(userSessionSaved, initialState)
        ? userSessionSaved
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
