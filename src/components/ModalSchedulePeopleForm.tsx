import { Modal } from "react-bootstrap";
import FormSchedulePeople from "./FormSchedulePeople";

interface Props {
  stateModalScheduling: boolean;
  closeModalScheduling: () => void;
}

const ModalSchedulePeopleForm = ({
  stateModalScheduling,
  closeModalScheduling,
}: Props): React.JSX.Element => (
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
