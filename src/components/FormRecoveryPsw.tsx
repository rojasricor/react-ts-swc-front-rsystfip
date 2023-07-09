import { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { BiMailSend } from "react-icons/bi";
import api from "../api";
import { notify } from "../libs/toast";
import { THandleChangeI } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import { recoverPswSchema } from "../validation/joi";
import Submitter from "./Submitter";

export default function FormRecoveryPsw(): React.JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (e: THandleSubmit): Promise<void> => {
        e.preventDefault();

        const { error, value } = recoverPswSchema.validate({
            email,
            APP_ROUTE: window.location.href,
        });
        if (error) return notify(error.message, { type: "warning" });

        setLoading(true);
        try {
            const { data } = await api.post(
                "/account/send-jwt-for-recover-password",
                value
            );

            notify(data.ok, { type: "success" });
        } catch (error: any) {
            notify(error.response.data.error, { type: "error" });
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
