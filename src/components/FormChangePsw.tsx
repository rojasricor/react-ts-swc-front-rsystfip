import { useState } from "react";
import { toast, Id as ToastId } from "react-toastify";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import Submitter from "./Submitter";
import { BiKey } from "react-icons/bi";
import { THandleSubmit } from "../types/THandleSubmits";
import { THandleChangeI } from "../types/THandleChanges";
import { IUserBase } from "../interfaces/IUserBase";
import { showAndUpdateToast } from "../functions";
import { api } from "../api/axios";

interface IProps {
  userId: IUserBase["id"];
}

interface FormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const FormChangePsw = ({ userId }: IProps): React.JSX.Element => {
  const formDataInitialState: FormState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState<FormState>(formDataInitialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [myToast, setMyToast] = useState<ToastId>("");

  const handleSubmit = async (e: THandleSubmit): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { errors, ok },
      } = await api.put("/password", {
        id: userId,
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
        new_password_confirm: formData.confirmPassword,
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
};

export default FormChangePsw;
