import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ROUTE } from "../constants";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import Submitter from "./Submitter";
import { BiKey } from "react-icons/bi";
import { THandleSubmit } from "../types/THandleSubmits";
import { THandleChangeI } from "../types/THandleChanges";
import { IUserBase } from "../interfaces/IUserBase";

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

  const handleSubmit = async (e: THandleSubmit): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { error, ok },
      } = await axios.put(`${API_ROUTE}/password`, {
        id: userId,
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
        new_password_confirm: formData.confirmPassword,
      });

      if (error || !ok) {
        toast.warn(error);
        return;
      }

      setFormData(formDataInitialState);
      toast.success(ok, { position: "top-left" });
    } catch ({ message }: any) {
      toast.error(message);
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
              onChange={handleChange}
              value={formData.currentPassword}
              type="password"
              placeholder="Current password"
              autoComplete="off"
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={12}>
          <Form.FloatingLabel label="Contraseña nueva:">
            <Form.Control
              name="newPassword"
              onChange={handleChange}
              value={formData.newPassword}
              type="password"
              placeholder="New password"
              autoComplete="off"
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={12}>
          <Form.FloatingLabel label="Confirmar contraseña nueva:">
            <Form.Control
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
              type="password"
              placeholder="Confirm new password"
              autoComplete="off"
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
