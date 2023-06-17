import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ROUTE } from "../constants";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import Submitter from "./Submitter";
import { BiMailSend } from "react-icons/bi";
import { handleSubmit } from "../types/handleSubmit";
import { handleChangeQD } from "../types/handleChange";

const FormRecoveryPsw = (): React.JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: handleSubmit): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { error, ok },
      } = await axios.post(`${API_ROUTE}/auth/recover/password`, {
        email,
        APP_ROUTE: window.location.href,
      });

      if (error || !ok) {
        toast.warn(error);
        return;
      }

      toast.success(ok);
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: handleChangeQD) => setEmail(e.target.value);

  return (
    <Form onSubmit={handleSubmit}>
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
