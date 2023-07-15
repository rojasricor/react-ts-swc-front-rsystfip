import { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { IoMdLogIn } from "react-icons/io";
import { useMutation } from "react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AUTH_KEY } from "../constants";
import { AuthState, setAuthenticatedUser } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks";
import { notify } from "../libs/toast";
import * as authService from "../services/auth.service";
import { THandleChangeI } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import { authSchema } from "../validation/schemas";
import Submitter from "./Submitter";

export default function FormLogin(): React.JSX.Element {
    interface FormData {
        username: string;
        password: string;
    }

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: "",
    });

    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleChange = (e: THandleChangeI) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const { mutate, isLoading } = useMutation(authService.auth, {
        onSuccess: ({ data, headers }) => {
            const dataToSavedSession: AuthState = {
                ...data,
                token: headers.authorization,
            };
            window.localStorage.setItem(
                AUTH_KEY,
                JSON.stringify(dataToSavedSession)
            );

            dispatch(setAuthenticatedUser(dataToSavedSession));
            navigate("/home/welcome");
        },
        onError: (error: any) =>
            notify(error.response.data.error, { type: "error" }),
    });

    const handleSubmit = (e: THandleSubmit) => {
        e.preventDefault();

        const { error, value } = authSchema.validate(formData);
        if (error) return notify(error.message, { type: "warning" });

        mutate(value);
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
                            placeholder="Username"
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
                            placeholder="Password"
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
                <Submitter loading={isLoading}>
                    {!isLoading ? (
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
}
