import { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { BiKey } from "react-icons/bi";
import { useParams } from "react-router-dom";
import api from "../api";
import { notify } from "../libs/toast";
import { THandleChangeI } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import { forgetPswSchema } from "../validation/joi";
import Submitter from "./Submitter";

interface FormData {
    password: string;
    confirmPassword: string;
}

type TParams = { resetToken: string };

export default function FormChangePswForget(): React.JSX.Element {
    const formDataInitialState: FormData = {
        password: "",
        confirmPassword: "",
    };

    const [formData, setFormData] = useState<FormData>(formDataInitialState);
    const [loading, setLoading] = useState<boolean>(false);

    const { resetToken } = useParams<TParams>();

    const handleSubmit = async (e: THandleSubmit): Promise<void> => {
        e.preventDefault();

        const { error, value } = forgetPswSchema.validate({
            resetToken,
            password: formData.password,
            password_confirm: formData.confirmPassword,
        });
        if (error) return notify(error.message, { type: "warning" });

        setLoading(true);
        try {
            const { data } = await api.put("/account/update-password", value);

            setFormData(formDataInitialState);
            notify(data.ok, {
                type: "success",
                position: "top-left",
            });
        } catch (error: any) {
            notify(error.response.data.error, { type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: THandleChangeI) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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

                <Submitter loading={loading}>
                    {!loading ? (
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
