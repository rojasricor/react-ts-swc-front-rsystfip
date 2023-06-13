import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTH_KEY } from "../../constants";

const userSessionSaved: string | null = window.sessionStorage.getItem(AUTH_KEY);

interface User {
  id?: number;
  role?: string;
  name?: string;
  email?: string;
  permissions?: string[];
}

interface authState {
  auth: boolean;
  user: User;
}

const initialState: authState = {
  auth: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: userSessionSaved ? JSON.parse(userSessionSaved) : initialState,
  reducers: {
    setAuthenticatedUser: (_state, { payload }: PayloadAction<authState>) =>
      payload,
    resetUserAuthenticated: () => initialState,
  },
});

export const { setAuthenticatedUser, resetUserAuthenticated } =
  authSlice.actions;

export default authSlice.reducer;
