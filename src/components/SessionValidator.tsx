import { useEffect, useRef } from "react";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { API_ROUTE } from "../constants";
import { AuthState, resetUserAuthenticated } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toast } from "react-toastify";
import Notify from "./Notify";

const SessionValidator = (): React.JSX.Element | undefined => {
  const authState: AuthState = useAppSelector(({ auth }) => auth);

  const dispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();

  const sessionValidatorTimerRef = useRef<NodeJS.Timer | undefined>(undefined);

  const validateSession = async (): Promise<void> => {
    if (!authState.auth || !authState.token) return;

    try {
      await axios.post(
        `${API_ROUTE}/auth/validate/token/session`,
        { token: authState.token },
        { headers: { Authorization: authState.token } }
      );
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
    sessionValidatorTimerRef.current = setInterval(validateSession, 1000);

    return () => {
      clearInterval(sessionValidatorTimerRef.current);
    };
  }, [authState.auth]);

  return <Notify />;
};

export default SessionValidator;
