import { useState } from "react";
import { API_ROUTE } from "../constants";
import { Form, Spinner, ModalFooter, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast, Id as ToastId } from "react-toastify";
import { FaTimes, FaCheck } from "react-icons/fa";
import {
  FormDataState,
  setIsLoading,
} from "../features/programming/programmingSlice";
import Notify from "./Notify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { THandleSubmit } from "../types/THandleSubmits";
import { THandleChangeI } from "../types/THandleChanges";
import { showAndUpdateToast } from "../functions";

interface IProps {
  closeModalCancell: () => void;
}

const FormCancellPerson = ({
  closeModalCancell,
}: IProps): React.JSX.Element => {
  const [cancelled_asunt, setCancelled_asunt] = useState<string>("");
  const [myToast, setMyToast] = useState<ToastId>("");

  const dispatch = useAppDispatch();

  const isLoadingStatus: boolean = useAppSelector(
    ({ programming }) => programming.isLoading
  );
  const formDataState: FormDataState = useAppSelector(
    ({ programming }) => programming.formData.schedule
  );

  const handleSubmit = async (e: THandleSubmit): Promise<void> => {
    e.preventDefault();
    dispatch(setIsLoading(true));

    try {
      const {
        data: { ok, errors },
      } = await axios.patch(`${API_ROUTE}/person`, {
        id: formDataState.eventId,
        date: formDataState.date,
        cancelled_asunt,
      });

      if (errors || !ok) return showAndUpdateToast(errors, setMyToast);

      toast.success(ok, { position: "top-left" });
      toast.dismiss(myToast);
      setCancelled_asunt("");
      closeModalCancell();
    } catch ({ message }: any) {
      toast.error(message);
    } finally {
      dispatch(setIsLoading(false));
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
