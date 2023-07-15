import { AuthState } from "../features/auth/authSlice";
import api from "./api.service";

export const verifySession = async ({ token }: AuthState) =>
    await api.post("/session/verify-jwt-of-session", { token });
