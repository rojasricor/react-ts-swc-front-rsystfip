import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ROUTE, RESOURCE_ROUTE } from "../constants";
import { Row, Col, Form, Spinner } from "react-bootstrap";
import Submitter from "./Submitter";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setDocuments } from "../features/resources/resourcesSlice";
import {
  resetFormDataAdmin,
  setFormData,
  setIsLoading,
} from "../features/admin/adminSlice";

const FormUserAdd = () => {
  const isLoadingState = useSelector(({ admin }) => admin.isLoading);
  const formDataState = useSelector(({ admin }) => admin.formData);
  const documentsState = useSelector(({ resources }) => resources.documents);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(
      setFormData({
        ...formDataState,
        [e.target.name]: e.target.value,
      })
    );
  };

  const doCreateUser = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));

    try {
      const {
        data: { error, ok },
      } = await axios.post(`${API_ROUTE}/user`, {
        role: formDataState.role,
        name: formDataState.name,
        lastname: formDataState.lastname,
        docType: formDataState.docType,
        doc: formDataState.doc,
        email: formDataState.email,
        tel: formDataState.tel,
        password: formDataState.password,
        passwordConfirmation: formDataState.passwordConfirmation,
      });

      if (error || !ok) return toast.warn(error);

      dispatch(resetFormDataAdmin());
      toast.success(ok, { position: "top-left" });
    } catch ({ message }) {
      toast.error(message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const getDocuments = async () => {
    try {
      const { data } = await axios(`${RESOURCE_ROUTE}?resource=documents`);

      dispatch(setDocuments(data));
    } catch ({ message }) {
      toast.error(message);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <Form onSubmit={doCreateUser}>
      <Row className="g-2">
        <Col md={4}>
          <Form.FloatingLabel label="Rol usuario:">
            <Form.Select
              name="role"
              onChange={handleChange}
              value={formDataState.role}
              required
            >
              <option value="">No seleccionado</option>
              <option value="2">Rector</option>
              <option value="3">Secretaria</option>
            </Form.Select>
          </Form.FloatingLabel>
        </Col>

        <Col md={4}>
          <Form.FloatingLabel label="Nombres:">
            <Form.Control
              name="name"
              onChange={handleChange}
              value={formDataState.name}
              type="text"
              placeholder="Name"
              maxLength="25"
              spellCheck="false"
              autoComplete="off"
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={4}>
          <Form.FloatingLabel label="Apellidos:">
            <Form.Control
              name="lastname"
              onChange={handleChange}
              value={formDataState.lastname}
              type="text"
              placeholder="Lastname"
              maxLength="25"
              spellCheck="false"
              autoComplete="off"
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={8}>
          <Form.FloatingLabel label="Tipo de Documento:">
            <Form.Select
              name="docType"
              onChange={handleChange}
              value={formDataState.docType}
              required
            >
              <option value="">No seleccionado</option>
              {documentsState.map(({ id, description }, index) => (
                <option key={index} value={id}>
                  {description}
                </option>
              ))}
            </Form.Select>
          </Form.FloatingLabel>
        </Col>

        <Col md={4}>
          <Form.FloatingLabel label="Documento:">
            <Form.Control
              name="doc"
              onChange={handleChange}
              value={formDataState.doc}
              type="number"
              placeholder="Document"
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={8}>
          <Form.FloatingLabel label="Correo institucional:">
            <Form.Control
              name="email"
              onChange={handleChange}
              value={formDataState.email}
              type="email"
              placeholder="Email"
              spellCheck="false"
              autoComplete="off"
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={4}>
          <Form.FloatingLabel label="Celular:">
            <Form.Control
              name="tel"
              onChange={handleChange}
              value={formDataState.tel}
              type="number"
              placeholder="Phone"
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Contraseña:">
            <Form.Control
              name="password"
              onChange={handleChange}
              value={formDataState.password}
              type="password"
              placeholder="Password"
              autoComplete="off"
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Confirmar contraseña:">
            <Form.Control
              name="passwordConfirmation"
              onChange={handleChange}
              value={formDataState.passwordConfirmation}
              type="password"
              placeholder="Confirm password"
              autoComplete="off"
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Submitter loading={isLoadingState}>
          {!isLoadingState ? (
            <>
              Registrar <FaUserPlus className="mb-1" />
            </>
          ) : (
            <Spinner size="sm" />
          )}
        </Submitter>
      </Row>
    </Form>
  );
};

export default FormUserAdd;
