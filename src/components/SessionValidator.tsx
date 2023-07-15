import { useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AuthState, resetUserAuthenticated } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { notify } from "../libs/toast";
import api from "../services/api.service";
import * as sessionService from "../services/session.service";
import ContainerToast from "./ContainerToast";

export default function SessionValidator(): React.JSX.Element {
    const dispatch = useAppDispatch();

    const authState: AuthState = useAppSelector(({ auth }) => auth);

    const navigate: NavigateFunction = useNavigate();

    const sessionValidatorTimerRef = useRef<NodeJS.Timer | undefined>(
        undefined
    );

    const { mutate } = useMutation(sessionService.verifySession, {
        onError: (error: any) => {
            notify(error.response.data.error, { type: "error" });
            dispatch(resetUserAuthenticated());
            navigate("/auth/login");
        },
    });

    useEffect(() => {
        api.defaults.headers.common["Authorization"] = authState.token;

        sessionValidatorTimerRef.current = setInterval(() => {
            if (!authState.auth || !authState.token) return;
            mutate(authState);
        }, 30000);

        return () => clearInterval(sessionValidatorTimerRef.current);
    }, [authState.auth]);

    return <ContainerToast />;
}
