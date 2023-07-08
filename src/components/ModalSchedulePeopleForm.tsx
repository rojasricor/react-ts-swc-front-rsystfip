import { Modal } from "react-bootstrap";
import FormSchedulePeople from "./FormSchedulePeople";

interface IProps {
    stateModalScheduling: boolean;
    closeModalScheduling: () => void;
}

export default function ModalSchedulePeopleForm({
    stateModalScheduling,
    closeModalScheduling,
}: IProps): React.JSX.Element {
    return (
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
}
