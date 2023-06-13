import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Form, Spinner, Col, Row, ModalFooter, Button } from "react-bootstrap";
import axios from "axios";
import { API_ROUTE } from "../constants";
import { toast } from "react-toastify";
import SelectPerson from "./SelectPerson";
import SelectDocument from "./SelectDocument";
import SelectFaculties from "./SelectFaculties";
import SmallCaption from "./SmallCaption";
import FooterFormPeople from "./FooterFormPeople";
import { IoCalendarNumber } from "react-icons/io5";
import { GiReturnArrow } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  setIsLoading,
} from "../features/programming/programmingSlice";
import ProtectedElement from "./ProtectedElement";
import Notify from "./Notify";

const FormSchedulePeople = ({ action, closeModalScheduling }) => {
  const { id } = useParams();

  const isEdit = action === "edit";
  const isSchedule = action === "schedule";
  const isAdd = action === "add";

  const facultieSelectRef = useRef(null);

  const dispatch = useDispatch();

  const formDataState = useSelector(({ programming: { formData } }) => {
    if (isEdit) return formData.edit;
    if (isAdd) return formData.add;
    if (isSchedule) return formData.schedule;
  });
  const isLoadingState = useSelector(
    ({ programming }) => programming.isLoading
  );
  const deansState = useSelector(({ programming }) => programming.deans);

  const editPerson = async () => {
    dispatch(setIsLoading(true));

    try {
      const {
        data: { ok, error },
      } = await axios.put(`${API_ROUTE}/person`, {
        id,
        person: formDataState.person,
        name: formDataState.name,
        doctype: formDataState.doctype,
        doc: formDataState.doc,
        facultie: formDataState.facultie,
        asunt: formDataState.asunt,
      });

      if (error || !ok) return toast.warn(error);

      dispatch(setFormData([action]));

      toast.success(ok, { position: "top-left" });
    } catch ({ message }) {
      toast.error(message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const schedulePerson = async (closeModalScheduling) => {
    dispatch(setIsLoading(true));

    try {
      const {
        data: { ok, error },
      } = await axios.post(`${API_ROUTE}/person`, {
        person: formDataState.person,
        name: formDataState.name,
        doctype: formDataState.doctype,
        doc: formDataState.doc,
        emailContact:
          formDataState.emailContact === "" ? null : formDataState.emailContact,
        telContact:
          formDataState.telContact === "" ? null : formDataState.telContact,
        facultie: formDataState.facultie,
        asunt: formDataState.asunt,
        color: formDataState.color,
        date: formDataState.date,
        start: formDataState.start,
        end: formDataState.end,
        status: formDataState.status,
      });

      if (error || !ok) return toast.warn(error);

      dispatch(setFormData([action]));

      if (formDataState.status === "scheduled" && closeModalScheduling)
        closeModalScheduling();

      toast.success(ok, { position: "top-left" });
    } catch ({ message }) {
      toast.error(message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) return editPerson();
    if (isSchedule) return schedulePerson(closeModalScheduling);
    if (isAdd) {
      dispatch(
        setFormData([
          action,
          {
            ...formDataState,
            status: "daily",
          },
        ])
      );
      schedulePerson();
    }
  };

  const getUserData = async () => {
    try {
      const {
        data: {
          category_id,
          document_id,
          facultie_id,
          name,
          document_number,
          come_asunt,
        },
      } = await axios(`${API_ROUTE}/person?id=${id}`);

      dispatch(
        setFormData([
          action,
          {
            ...formDataState,
            person: category_id,
            doctype: document_id,
            facultie: facultie_id,
            name,
            doc: document_number,
            asunt: come_asunt,
          },
        ])
      );
    } catch ({ message }) {
      toast.error(message);
    }
  };

  const handleChange = (e) => {
    dispatch(
      setFormData([
        action,
        {
          ...formDataState,
          [e.target.name]: e.target.value,
        },
      ])
    );
  };

  const loadDeans = () => {
    if (!deansState || formDataState.person !== "4") return;

    for (const { _id, dean, facultie_id } of deansState) {
      if (_id === formDataState.doc) {
        dispatch(
          setFormData([
            action,
            {
              ...formDataState,
              doctype: 1,
              name: dean,
              facultie: facultie_id,
              disabledAfterAutocomplete: true,
            },
          ])
        );

        facultieSelectRef.current.className = "form-control";
        toast.info("Se han completado los datos", { position: "top-left" });
        break;
      }
    }
  };

  useEffect(() => {
    loadDeans();
  }, [formDataState.doc]);

  useEffect(() => {
    id && getUserData();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-2">
        <Col md={6}>
          <SelectPerson
            action={action}
            handleChange={handleChange}
            facultieSelectRef={facultieSelectRef}
          />
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Cédula:">
            <Form.Control
              name="doc"
              onChange={handleChange}
              value={formDataState.doc}
              type="number"
              placeholder="Complete campo"
              title="El número de documento debe ser de 8 a 10 dígitos"
              disabled={
                formDataState.disabledAll ||
                formDataState.disabledAfterAutocomplete
              }
              required
            />
          </Form.FloatingLabel>
        </Col>

        <Col md={6}>
          <SelectDocument action={action} handleChange={handleChange} />
        </Col>

        <Col md={6}>
          <Form.FloatingLabel label="Nombres y Apellidos:">
            <Form.Control
              name="name"
              onChange={handleChange}
              value={formDataState.name}
              type="text"
              placeholder="Complete campo"
              title="Ingrese nombres y apellidos"
              maxLength="35"
              autoComplete="off"
              spellCheck="false"
              disabled={
                formDataState.disabledAll ||
                formDataState.disabledAfterAutocomplete
              }
              required
            />
          </Form.FloatingLabel>
        </Col>

        <ProtectedElement isAllowed={isSchedule}>
          <Col md={6}>
            <Form.FloatingLabel label="Teléfono de contacto:">
              <Form.Control
                name="telContact"
                onChange={handleChange}
                value={formDataState.telContact}
                type="number"
                placeholder="Complete campo"
                title="Ingrese el teléfono de contacto, debe tener 10 dígitos"
                disabled={
                  formDataState.disabledAll ||
                  formDataState.disabledAfterAutocomplete
                }
                required
              />
            </Form.FloatingLabel>
          </Col>
        </ProtectedElement>

        <ProtectedElement isAllowed={isSchedule}>
          <Col md={6}>
            <Form.FloatingLabel label="Email de contacto:">
              <Form.Control
                name="emailContact"
                onChange={handleChange}
                value={formDataState.emailContact}
                type="email"
                placeholder="Complete campo"
                title="Ingrese el correo electrónico de contacto"
                autoComplete="off"
                spellCheck="false"
                disabled={
                  formDataState.disabledAll ||
                  formDataState.disabledAfterAutocomplete
                }
                required
              />
            </Form.FloatingLabel>
          </Col>
        </ProtectedElement>

        <Col md={12}>
          <SelectFaculties
            action={action}
            handleChange={handleChange}
            facultieSelectRef={facultieSelectRef}
          />
        </Col>

        <Col md={12}>
          <Form.FloatingLabel label="Asunto:">
            <Form.Control
              as="textarea"
              name="asunt"
              onChange={handleChange}
              value={formDataState.asunt}
              placeholder="Complete campo"
              minLength="5"
              maxLength="100"
              spellCheck="false"
              autoComplete="off"
              disabled={formDataState.disabledAll}
              style={{ height: "100px" }}
              required
            />
          </Form.FloatingLabel>
        </Col>

        <ProtectedElement isAllowed={isSchedule}>
          <Col md={12}>
            <Form.Control
              name="color"
              onChange={handleChange}
              type="color"
              title="Choose your color"
              value={formDataState.color}
            />
          </Col>
        </ProtectedElement>

        <SmallCaption />

        <ProtectedElement isAllowed={!isSchedule}>
          <FooterFormPeople isAllowed={action === "edit"} />
        </ProtectedElement>

        <ProtectedElement isAllowed={isSchedule}>
          <ModalFooter>
            <Button variant="light" onClick={closeModalScheduling}>
              Cerrar <GiReturnArrow className="mb-1" />
            </Button>
            <Button type="submit">
              {!isLoadingState ? (
                <>
                  Agendar <IoCalendarNumber className="mb-1" />
                </>
              ) : (
                <Spinner size="sm" />
              )}
            </Button>
          </ModalFooter>
        </ProtectedElement>
      </Row>
      <Notify />
    </Form>
  );
};

export default FormSchedulePeople;
