import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ROUTE } from "../constants";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import Submitter from "./Submitter";
import { BiMailSend } from "react-icons/bi";

const FormRecoveryPsw = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const recoverPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data: { error, ok },
      } = await axios.post(`${API_ROUTE}/auth/recover/password`, {
        email,
        APP_ROUTE: window.location.href,
      });

      if (error || !ok) return toast.warn(error);

      toast.success(ok);
    } catch ({ message }) {
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setEmail(e.target.value);

  return (
    <Form onSubmit={recoverPassword}>
      <Row className="g-3">
        <Col md={12}>
          <Form.FloatingLabel label="Email de registro">
            <Form.Control
              onChange={handleChange}
              value={email}
              type="email"
              placeholder="Email"
              spellCheck="false"
              autoComplete="off"
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
};

export default FormRecoveryPsw;
