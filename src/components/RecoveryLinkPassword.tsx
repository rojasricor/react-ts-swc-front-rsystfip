import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Card, Spinner, Container } from "react-bootstrap";
import ResetTokenInvalid from "./ResetTokenInvalid";
import FormChangePswForget from "./FormChangePswForget";
import { API_ROUTE } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";

const RecoveryPassword = () => {
  const { email, resetToken } = useParams();
  const [tokenResetIsValid, setTokenResetIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyToken = async () => {
    setLoading(true);

    try {
      const {
        data: { tokenIsValid, error },
      } = await axios.post(`${API_ROUTE}/auth/verify/resetToken`, {
        resetToken,
        email,
      });

      setTokenResetIsValid(tokenIsValid);

      if (error) {
        toast.warn(error);
      }

      if (!tokenIsValid) {
        await axios.delete(`${API_ROUTE}/auth/delete/resetToken`, {
          headers: { "Content-Type": "application/json" },
          data: { resetToken },
        });
      }
    } catch ({ message }) {
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <Col md={4} className="mx-auto">
      <Card className="py-4">
        <h1 className="h3 text-center">Recuperacion de contraseña {email}</h1>
        <Card.Body>
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
};

export default RecoveryPassword;
