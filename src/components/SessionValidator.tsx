import { useEffect, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AuthState, resetUserAuthenticated } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toast } from "react-toastify";
import Notify from "./Notify";
import { api } from "../api/axios";

const SessionValidator = (): React.JSX.Element | undefined => {
  const authState: AuthState = useAppSelector(({ auth }) => auth);

  const dispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();

  const sessionValidatorTimerRef = useRef<NodeJS.Timer | undefined>(undefined);

  const validateSession = async (): Promise<void> => {
    if (!authState.auth || !authState.token) return;

    try {
      await api.post("/auth/validate/token/session", {
        token: authState.token,
      });
    } catch (error: any) {
      toast.error(error.response.data, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
      });
      dispatch(resetUserAuthenticated());
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    api.defaults.headers.common["Authorization"] = authState.token;

    sessionValidatorTimerRef.current = setInterval(validateSession, 1000);

    return () => {
      clearInterval(sessionValidatorTimerRef.current);
    };
  }, [authState.auth]);

  return <Notify />;
};

export default SessionValidator;
