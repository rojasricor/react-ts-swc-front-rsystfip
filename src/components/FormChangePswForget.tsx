import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, Id as ToastId } from "react-toastify";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import Submitter from "./Submitter";
import { BiKey } from "react-icons/bi";
import { THandleSubmit } from "../types/THandleSubmits";
import { THandleChangeI } from "../types/THandleChanges";
import { showAndUpdateToast } from "../functions";
import { api } from "../api/axios";

interface FormData {
  password: string;
  confirmPassword: string;
}

type TParams = {
  resetToken: string;
  email: string;
};

const FormChangePswForget = (): React.JSX.Element => {
  const formDataInitialState: FormData = {
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [myToast, setMyToast] = useState<ToastId>("");

  const { resetToken, email } = useParams<TParams>();

  const handleSubmit = async (e: THandleSubmit): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { errors, ok },
      } = await api.put("/recover/password", {
        email,
        resetToken,
        password: formData.password,
        password_confirm: formData.confirmPassword,
      });

      if (errors || !ok) return showAndUpdateToast(errors, setMyToast);

      setFormData(formDataInitialState);
      toast.success(ok, { position: "top-left" });
      toast.dismiss(myToast);
    } catch (error: any) {
      toast.error(error.message);
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
};

export default FormChangePswForget;
