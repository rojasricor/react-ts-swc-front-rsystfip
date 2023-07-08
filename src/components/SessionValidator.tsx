import { useEffect, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { AuthState, resetUserAuthenticated } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { showAndUpdateToast } from "../libs";
import ContainerToast from "./ContainerToast";

export default function SessionValidator(): React.JSX.Element {
    const dispatch = useAppDispatch();

    const authState: AuthState = useAppSelector(({ auth }) => auth);

    const navigate: NavigateFunction = useNavigate();

    const sessionValidatorTimerRef = useRef<NodeJS.Timer | undefined>(
        undefined
    );

    const validateSession = async (): Promise<void> => {
        if (!authState.auth || !authState.token) return;

        try {
            await api.post("/session/verify-jwt-of-session", {
                token: authState.token,
            });
        } catch (error: any) {
            showAndUpdateToast(error.response.data.error, {
                type: "error",
                position: "top-center",
                closeButton: false,
            });
            dispatch(resetUserAuthenticated());
            navigate("/auth/login");
        }
    };

    useEffect(() => {
        api.defaults.headers.common["Authorization"] = authState.token;

        sessionValidatorTimerRef.current = setInterval(validateSession, 5000);

        return () => clearInterval(sessionValidatorTimerRef.current);
    }, [authState.auth]);

    return <ContainerToast />;
}
