import { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { BiMailSend } from "react-icons/bi";
import { toast, Id as ToastId } from "react-toastify";
import { api } from "../api/axios";
import { showAndUpdateToast } from "../functions";
import { recoverPswSchema } from "../validation";
import { THandleChangeI } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import Submitter from "./Submitter";

export default function FormRecoveryPsw(): React.JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [myToast, setMyToast] = useState<ToastId>("");

    const handleSubmit = async (e: THandleSubmit): Promise<void> => {
        e.preventDefault();

        const payload = { email, APP_ROUTE: window.location.href };
        const { error } = recoverPswSchema.validate(payload);
        if (error) return showAndUpdateToast(error.message, setMyToast);

        setLoading(true);
        try {
            const {
                data: { errors, ok },
            } = await api.post("/auth/recover/password", payload);

            if (errors || !ok) return showAndUpdateToast(errors, setMyToast);

            toast.success(ok);
            toast.dismiss(myToast);
        } catch (error: any) {
            toast.error(error.message);
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
