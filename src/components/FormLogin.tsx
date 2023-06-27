import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AUTH_KEY } from "../constants";
import { Row, Col, Form, Spinner } from "react-bootstrap";
import Submitter from "./Submitter";
import { AuthState, setAuthenticatedUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { IoMdLogIn } from "react-icons/io";
import { THandleChangeI } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import { useAppDispatch } from "../hooks";
import { showAndUpdateToast } from "../functions";
import { api } from "../api/axios";
import { authSchema } from "../schemas/joiValidation";

const FormLogin = (): React.JSX.Element => {
  interface FormData {
    username: string;
    password: string;
  }

  const formDataInitialState: FormData = {
    username: "",
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

    const { error } = authSchema.validate(formData);
    if (error) return showAndUpdateToast(error.message);

    setLoading(true);
    try {
      const { data, headers } = await api.post("/auth", formData);

      if (data.errors) return showAndUpdateToast(data.errors);

      const dataToSavedSession: AuthState = {
        ...data,
        token: headers.authorization,
      };
      window.localStorage.setItem(AUTH_KEY, JSON.stringify(dataToSavedSession));

      dispatch(setAuthenticatedUser(dataToSavedSession));

      navigate("/home/welcome");
    } catch (error: any) {
      toast.error(error.message);
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
              name="username"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formData.username}
              type="text"
              placeholder="Usuario"
              autoComplete="off"
              spellCheck={false}
              minLength={5}
              maxLength={30}
              autoFocus
              required
            />
          </Form.FloatingLabel>
        </Col>
        <Col md={12}>
          <Form.FloatingLabel label="Contraseña">
            <Form.Control
              name="password"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formData.password}
              type={passwordVisible ? "text" : "password"}
              placeholder="Contraseña"
              autoComplete="off"
              spellCheck={false}
              minLength={8}
              maxLength={30}
              required
            />
          </Form.FloatingLabel>
        </Col>
        <Col md={12}>
          <Form.Check
            className="mt-2"
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
