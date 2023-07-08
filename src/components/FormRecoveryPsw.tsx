import { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { BiMailSend } from "react-icons/bi";
import { api } from "../api/axios";
import { showAndUpdateToast } from "../libs/toast";
import { THandleChangeI } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import { recoverPswSchema } from "../validation";
import Submitter from "./Submitter";

export default function FormRecoveryPsw(): React.JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (e: THandleSubmit): Promise<void> => {
        e.preventDefault();

        const payload = { email, APP_ROUTE: window.location.href };
        const { error } = recoverPswSchema.validate(payload);
        if (error)
            return showAndUpdateToast(error.message, { type: "warning" });

        setLoading(true);
        try {
            const { data } = await api.post("/auth/recover/password", payload);

            showAndUpdateToast(data.ok, { type: "success" });
        } catch (error: any) {
            showAndUpdateToast(error.response.data.error, { type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: THandleChangeI) => setEmail(e.target.value);

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="g-3">
                <Col md={12}>
                    <Form.FloatingLabel label="Email de registro">
                        <Form.Control
                            name="email"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={email}
                            type="email"
                            placeholder="Email"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={10}
                            maxLength={30}
                            autoFocus
                            required
                        />
                    </Form.FloatingLabel>
                </Col>

                <Submitter loading={loading}>
                    {!loading ? (
                        <>
                            Enviar email <BiMailSend className="mb-1" />
                        </>
                    ) : (
                        <Spinner size="sm" />
                    )}
                </Submitter>
            </Row>
        </Form>
    );
}
