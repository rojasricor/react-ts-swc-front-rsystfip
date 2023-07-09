import { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { BiKey } from "react-icons/bi";
import { api } from "../api/axios";
import { IUserBase } from "../interfaces/IUserBase";
import { notify } from "../libs/toast";
import { THandleChangeI } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import { changePswSchema } from "../validation/joi";
import Submitter from "./Submitter";

interface IProps {
    userId: IUserBase["id"];
}

interface FormState {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function FormChangePsw({ userId }: IProps): React.JSX.Element {
    const formDataInitialState: FormState = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const [formData, setFormData] = useState<FormState>(formDataInitialState);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: THandleSubmit): Promise<void> => {
        e.preventDefault();

        const { error, value } = changePswSchema.validate({
            id: userId.toString(),
            current_password: formData.currentPassword,
            new_password: formData.newPassword,
            new_password_confirm: formData.confirmPassword,
        });
        if (error) return notify(error.message, { type: "warning" });

        setLoading(true);
        try {
            const { data } = await api.put(
                `/account/update-password/${value.id}`,
                value
            );

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
                    <Form.FloatingLabel label="Contraseña anterior:">
                        <Form.Control
                            name="currentPassword"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formData.currentPassword}
                            type="password"
                            placeholder="Current password"
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
                    <Form.FloatingLabel label="Contraseña nueva:">
                        <Form.Control
                            name="newPassword"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formData.newPassword}
                            type="password"
                            placeholder="New password"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={8}
                            maxLength={30}
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
