import { useEffect, useState } from "react";
import { toast, Id as ToastId } from "react-toastify";
import { Row, Col, Form, Spinner } from "react-bootstrap";
import Submitter from "./Submitter";
import { FaUserPlus } from "react-icons/fa";
import { setDocuments } from "../features/resources/resourcesSlice";
import {
  FormData,
  resetFormDataAdmin,
  setFormData,
  setIsLoading,
} from "../features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { THandleChangeITS } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import { IDocument } from "../interfaces/IResources";
import { v4 } from "uuid";
import { showAndUpdateToast } from "../functions";
import { api } from "../api/axios";

const FormUserAdd = (): React.JSX.Element => {
  const isLoadingState: boolean = useAppSelector(
    ({ admin }) => admin.isLoading
  );
  const formDataState: FormData = useAppSelector(({ admin }) => admin.formData);
  const documentsState: IDocument[] = useAppSelector(
    ({ resources }) => resources.documents
  );

  const [myToast, setMyToast] = useState<ToastId>("");

  const dispatch = useAppDispatch();

  const handleChange = (e: THandleChangeITS) => {
    dispatch(
      setFormData({
        ...formDataState,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = async (e: THandleSubmit): Promise<void> => {
    e.preventDefault();
    dispatch(setIsLoading(true));

    try {
      const {
        data: { errors, ok },
      } = await api.post("/user", {
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

      if (errors || !ok) return showAndUpdateToast(errors, setMyToast);

      dispatch(resetFormDataAdmin());
      toast.success(ok, { position: "top-left" });
      toast.dismiss(myToast);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const getDocuments = async (): Promise<void> => {
    try {
      const { data } = await api("/resource", {
        params: { resource: "documents" },
      });

      dispatch(setDocuments(data));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-2">
        <Col md={4}>
          <Form.FloatingLabel label="Rol usuario:">
            <Form.Select
              name="role"
              className="border-0 bg-white"
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
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.name}
              type="text"
              placeholder="Name"
              autoComplete="off"
              spellCheck={false}
              minLength={3}
              maxLength={25}
              autoFocus
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={4}>
          <Form.FloatingLabel label="Apellidos:">
            <Form.Control
              name="lastname"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.lastname}
              type="text"
              placeholder="Lastname"
              autoComplete="off"
              spellCheck={false}
              minLength={3}
              maxLength={25}
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={8}>
          <Form.FloatingLabel label="Tipo de Documento:">
            <Form.Select
              name="docType"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.docType}
              required
            >
              <option value="">No seleccionado</option>
              {documentsState.map(({ id, description }) => (
                <option key={v4()} value={id}>
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
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.doc}
              type="number"
              placeholder="Document"
              autoComplete="off"
              spellCheck={false}
              minLength={8}
              maxLength={10}
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={8}>
          <Form.FloatingLabel label="Correo institucional:">
            <Form.Control
              name="email"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.email}
              type="email"
              placeholder="Email"
              autoComplete="off"
              spellCheck={false}
              minLength={10}
              maxLength={30}
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={4}>
          <Form.FloatingLabel label="Celular:">
            <Form.Control
              name="tel"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.tel}
              type="number"
              placeholder="Phone"
              autoComplete="off"
              spellCheck={false}
              minLength={10}
              maxLength={10}
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Contraseña:">
            <Form.Control
              name="password"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.password}
              type="password"
              placeholder="Password"
              autoComplete="off"
              spellCheck={false}
              minLength={8}
              maxLength={30}
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Confirmar contraseña:">
            <Form.Control
              name="passwordConfirmation"
              className="border-0 bg-white"
              onChange={handleChange}
              value={formDataState.passwordConfirmation}
              type="password"
              placeholder="Confirm password"
              autoComplete="off"
              spellCheck={false}
              minLength={8}
              maxLength={30}
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
