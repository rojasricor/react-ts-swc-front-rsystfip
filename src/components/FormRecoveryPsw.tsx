import { useState } from "react";
import { toast, Id as ToastId } from "react-toastify";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import Submitter from "./Submitter";
import { BiMailSend } from "react-icons/bi";
import { THandleSubmit } from "../types/THandleSubmits";
import { THandleChangeI } from "../types/THandleChanges";
import { showAndUpdateToast } from "../functions";
import { api } from "../api/axios";

const FormRecoveryPsw = (): React.JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [myToast, setMyToast] = useState<ToastId>("");

  const handleSubmit = async (e: THandleSubmit): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { errors, ok },
      } = await api.post("/auth/recover/password", {
        email,
        APP_ROUTE: window.location.href,
      });

      if (errors || !ok) return showAndUpdateToast(errors, setMyToast);

      toast.success(ok);
      toast.dismiss(myToast);
    } catch ({ message }: any) {
      toast.error(message);
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
