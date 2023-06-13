import { Modal } from "react-bootstrap";
import FormCancellPerson from "./FormCancellPerson";

const ModalCancellPersonConfirmation = ({
  stateModalCancell,
  closeModalCancell,
}) => (
  <Modal
    show={stateModalCancell}
    onHide={closeModalCancell}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>Cancelar cita</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Estás seguro que deseas cancelar ésta cita?
      <FormCancellPerson closeModalCancell={closeModalCancell} />
    </Modal.Body>
  </Modal>
);

export default ModalCancellPersonConfirmation;
