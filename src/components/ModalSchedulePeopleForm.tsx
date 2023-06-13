import { Modal } from "react-bootstrap";
import FormSchedulePeople from "./FormSchedulePeople";

const ModalSchedulePeopleForm = ({
  stateModalScheduling,
  closeModalScheduling,
}) => (
  <Modal
    show={stateModalScheduling}
    onHide={closeModalScheduling}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>Agendamiento Programado</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <FormSchedulePeople
        action="schedule"
        closeModalScheduling={closeModalScheduling}
      />
    </Modal.Body>
  </Modal>
);

export default ModalSchedulePeopleForm;
