import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { API_ROUTE, AUTH_KEY } from "../constants";
import { Row, Col, Form, Spinner } from "react-bootstrap";
import Submitter from "./Submitter";
import axios from "axios";
import { AuthState, setAuthenticatedUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { IoMdLogIn } from "react-icons/io";
import { THandleChangeI } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import { useAppDispatch } from "../hooks";
import { showAndUpdateToast } from "../functions";

const FormLogin = (): React.JSX.Element => {
  interface FormData {
    user: string;
    password: string;
  }

  const formDataInitialState: FormData = {
    user: "",
    password: "",
  };

  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();

  const handleChange = (e: THandleChangeI) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: THandleSubmit): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, headers } = await axios.post(`${API_ROUTE}/auth`, {
        username: formData.user,
        password: formData.password,
      });

      if (data.errors) return showAndUpdateToast(data.errors);

      const dataToSavedSession: AuthState = {
        ...data,
        token: headers.authorization,
      };
      window.localStorage.setItem(AUTH_KEY, JSON.stringify(dataToSavedSession));

      dispatch(setAuthenticatedUser(dataToSavedSession));

      navigate("/home/welcome");
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3">
        <Col md={12}>
          <Form.FloatingLabel label="Nombre de usuario">
            <Form.Control
              name="user"
              onChange={handleChange}
              value={formData.user}
              type="text"
              placeholder="Usuario"
              autoComplete="off"
              spellCheck="false"
              autoFocus
              required
            />
          </Form.FloatingLabel>
        </Col>
        <Col md={12}>
          <Form.FloatingLabel label="Contraseña">
            <Form.Control
              name="password"
              onChange={handleChange}
              value={formData.password}
              type={passwordVisible ? "text" : "password"}
              placeholder="Contraseña"
              autoComplete="off"
              required
            />
          </Form.FloatingLabel>
        </Col>
        <Col md={12}>
          <Form.Check
            onClick={() => setPasswordVisible(!passwordVisible)}
            type="switch"
            label="Mostrar contraseña"
          />
        </Col>
        <Submitter loading={loading}>
          {!loading ? (
            <>
              Entrar <IoMdLogIn className="mb-1" />
            </>
          ) : (
            <Spinner size="sm" />
          )}
        </Submitter>
      </Row>
    </Form>
  );
};

export default FormLogin;
