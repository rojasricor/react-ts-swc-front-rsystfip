import { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { BiKey } from "react-icons/bi";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { notify } from "../libs/toast";
import * as accountService from "../services/account.service";
import { THandleChangeI } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import { forgetPswSchema } from "../validation/schemas";
import Submitter from "./Submitter";

interface FormData {
    password: string;
    confirmPassword: string;
}

export default function FormChangePswForget(): React.JSX.Element {
    const formDataInitialState: FormData = {
        password: "",
        confirmPassword: "",
    };

    const [formData, setFormData] = useState<FormData>(formDataInitialState);

    const { resetToken } = useParams<{ resetToken: string }>();

    const { mutate, isLoading } = useMutation(
        accountService.changePasswordWithJwt,
        {
            onSuccess: (data) => {
                setFormData(formDataInitialState);
                notify(data.ok, {
                    type: "success",
                    position: "top-left",
                });
            },
            onError: (error: any) =>
                notify(error.response.data.error, { type: "error" }),
        }
    );

    const handleSubmit = (e: THandleSubmit) => {
        e.preventDefault();

        const { error, value } = forgetPswSchema.validate({
            resetToken,
            password: formData.password,
            password_confirm: formData.confirmPassword,
        });
        if (error) return notify(error.message, { type: "warning" });

        mutate(value);
    };

    const handleChange = (e: THandleChangeI) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="g-3">
                <Col md={12}>
                    <Form.FloatingLabel label="Contraseña nueva:">
                        <Form.Control
                            name="password"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formData.password}
                            type="password"
                            placeholder="New password"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={8}
                            maxLength={30}
                            autoFocus
                            required
                        />
                    </Form.FloatingLabel>
                </Col>

                <Col md={12}>
                    <Form.FloatingLabel label="Confirmar contraseña nueva:">
                        <Form.Control
                            name="confirmPassword"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            type="password"
                            placeholder="Confirm new password"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={8}
                            maxLength={30}
                            required
                        />
                    </Form.FloatingLabel>
                </Col>

                <Submitter loading={isLoading}>
                    {!isLoading ? (
                        <>
                            Cambiar contraseña <BiKey className="mb-1" />
                        </>
                    ) : (
                        <Spinner size="sm" />
                    )}
                </Submitter>
            </Row>
        </Form>
    );
}
