import { useEffect, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api/axios";
import { AuthState, resetUserAuthenticated } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import Notify from "./Notify";

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
            await api.post("/auth/validate/token/session", {
                token: authState.token,
            });
        } catch (error: any) {
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_CENTER,
                closeButton: false,
            });
            dispatch(resetUserAuthenticated());
            navigate("/auth/login");
        }
    };

    useEffect(() => {
        api.defaults.headers.common["Authorization"] = authState.token;

        sessionValidatorTimerRef.current = setInterval(validateSession, 30000);

        return () => clearInterval(sessionValidatorTimerRef.current);
    }, [authState.auth]);

    return <Notify />;
}
