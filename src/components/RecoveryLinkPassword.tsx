import { useEffect, useState } from "react";
import { Card, Col, Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { showAndUpdateToast } from "../libs";
import FormChangePswForget from "./FormChangePswForget";
import ResetTokenInvalid from "./ResetTokenInvalid";

type TParams = { email: string; resetToken: string };

export default function RecoveryLinkPassword(): React.JSX.Element {
    const { email, resetToken } = useParams<TParams>();
    const [tokenResetIsValid, setTokenResetIsValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const verifyToken = async (): Promise<void> => {
        setLoading(true);

        try {
            const { data } = await api.post("/auth/verify/resetToken", {
                resetToken,
                email,
            });

            setTokenResetIsValid(data.tokenIsValid);

            if (!data.tokenIsValid) {
                await api.delete("/auth/delete/resetToken", {
                    headers: { "Content-Type": "application/json" },
                    data: { resetToken },
                });
            }
        } catch (error: any) {
            showAndUpdateToast(error.response.data.error, { type: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <Col md={4} className="mx-auto">
            <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
                <h1 className="h3 text-center">
                    Recuperacion de contraseña {email}
                </h1>
                <Card.Body className="my-4">
                    {!loading ? (
                        tokenResetIsValid ? (
                            <FormChangePswForget />
                        ) : (
                            <ResetTokenInvalid />
                        )
                    ) : (
                        <Container className="text-center">
                            <Spinner className="my-5" />
                        </Container>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
}
