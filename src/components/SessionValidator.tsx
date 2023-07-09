import { useEffect, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import api from "../api";
import { AuthState, resetUserAuthenticated } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { notify } from "../libs/toast";
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
            notify(error.response.data.error, { type: "error" });
            dispatch(resetUserAuthenticated());
            navigate("/auth/login");
        }
    };

    useEffect(() => {
        api.defaults.headers.common["Authorization"] = authState.token;

        sessionValidatorTimerRef.current = setInterval(validateSession, 30000);

        return () => clearInterval(sessionValidatorTimerRef.current);
    }, [authState.auth]);

    return <ContainerToast />;
}
