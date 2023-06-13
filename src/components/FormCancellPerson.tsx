import { useState } from "react";
import { API_ROUTE } from "../constants";
import { Form, Spinner, ModalFooter, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { setIsLoading } from "../features/programming/programmingSlice";
import Notify from "./Notify";

const FormCancellPerson = ({ closeModalCancell }) => {
  const [cancelled_asunt, setCancelled_asunt] = useState("");

  const isLoadingStatus = useSelector(
    ({ programming }) => programming.isLoading
  );
  const formDataState = useSelector(({ programming }) => programming.formData);

  const cancellPerson = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const {
        data: { ok, error },
      } = await axios.patch(`${API_ROUTE}/person`, {
        id: formDataState.eventId,
        date: formDataState.date,
        cancelled_asunt,
      });

      if (error || !ok) return toast.warn(error);

      toast.success(ok, { position: "top-left" });
      setCancelled_asunt("");
      closeModalCancell();
    } catch ({ message }) {
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => setCancelled_asunt(e.target.value);

  return (
    <Form onSubmit={cancellPerson}>
      <Row className="g-3 my-2">
        <Col md={12}>
          <Form.FloatingLabel label="Asunto cancelamiento:">
            <Form.Control
              as="textarea"
              onChange={handleChange}
              placeholder="Complete campo"
              minLength="5"
              maxLength="100"
              spellCheck="false"
              autoComplete="off"
              value={cancelled_asunt}
              style={{ height: "100px" }}
              required
            />
          </Form.FloatingLabel>
        </Col>
        <ModalFooter>
          <Button onClick={closeModalCancell} variant="light">
            No <FaTimes className="mb-1" />
          </Button>
          <Button variant="danger" disabled={isLoadingStatus} type="submit">
            {!isLoadingStatus ? (
              <>
                Sí, cancelar <FaCheck className="mb-1" />
              </>
            ) : (
              <Spinner size="sm" />
            )}
          </Button>
        </ModalFooter>
      </Row>
      <Notify />
    </Form>
  );
};

export default FormCancellPerson;
