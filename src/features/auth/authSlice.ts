import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTH_KEY } from "../../constants";

const userSessionSaved: string | null = window.sessionStorage.getItem(AUTH_KEY);

interface User {
  id: number;
  role: string;
  name: string;
  email: string;
  permissions: string[];
}

export interface AuthState {
  auth: boolean;
  user: User;
}

const userInitialState: User = {
  id: 0,
  role: "",
  name: "",
  email: "",
  permissions: [],
};

const initialState: AuthState = {
  auth: false,
  user: userInitialState,
};

const authSlice = createSlice({
  name: "auth",
  initialState: userSessionSaved ? JSON.parse(userSessionSaved) : initialState,
  reducers: {
    setAuthenticatedUser: (
      _state,
      { payload }: PayloadAction<AuthState>
    ): AuthState => payload,
    resetUserAuthenticated: (): AuthState => initialState,
  },
});

export const { setAuthenticatedUser, resetUserAuthenticated } =
  authSlice.actions;

export default authSlice.reducer;
