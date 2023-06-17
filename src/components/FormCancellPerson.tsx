import { useState } from "react";
import { API_ROUTE } from "../constants";
import { Form, Spinner, ModalFooter, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTimes, FaCheck } from "react-icons/fa";
import { setIsLoading } from "../features/programming/programmingSlice";
import Notify from "./Notify";
import { useAppSelector } from "../hooks";
import { THandleSubmit } from "../types/THandleSubmits";
import { THandleChangeI } from "../types/THandleChanges";

interface Props {
  closeModalCancell: () => void;
}

const FormCancellPerson = ({ closeModalCancell }: Props): React.JSX.Element => {
  const [cancelled_asunt, setCancelled_asunt] = useState<string>("");

  const isLoadingStatus = useAppSelector(
    ({ programming }) => programming.isLoading
  );
  const formDataState = useAppSelector(
    ({ programming }) => programming.formData.schedule
  );

  const handleSubmit = async (e: THandleSubmit): Promise<void> => {
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

      if (error || !ok) {
        toast.warn(error);
        return;
      }

      toast.success(ok, { position: "top-left" });
      setCancelled_asunt("");
      closeModalCancell();
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: THandleChangeI) =>
    setCancelled_asunt(e.target.value);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3 my-2">
        <Col md={12}>
          <Form.FloatingLabel label="Asunto cancelamiento:">
            <Form.Control
              as="textarea"
              onChange={handleChange}
              placeholder="Complete campo"
              minLength={5}
              maxLength={100}
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
