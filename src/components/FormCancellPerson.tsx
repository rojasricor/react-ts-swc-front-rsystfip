import { useState } from "react";
import { Button, Col, Form, ModalFooter, Row, Spinner } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Id as ToastId, toast } from "react-toastify";
import { api } from "../api/axios";
import { registerAChange } from "../features/calendar/calendarSlice";
import {
    FormDataState,
    setIsLoading,
} from "../features/programming/programmingSlice";
import { showAndUpdateToast } from "../functions";
import { useAppDispatch, useAppSelector } from "../hooks";
import { cancellSchema } from "../validation";
import { THandleChangeI } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";

interface IProps {
    closeModalCancell: () => void;
}

export default function FormCancellPerson({
    closeModalCancell,
}: IProps): React.JSX.Element {
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

        const payload = {
            id: formDataState.eventId,
            date: formDataState.date,
            cancelled_asunt,
        };
        const { error } = cancellSchema.validate(payload);
        if (error) return showAndUpdateToast(error.message, setMyToast);

        dispatch(setIsLoading(true));
        try {
            const {
                data: { ok, errors },
            } = await api.patch("/person", payload);

            if (errors || !ok) return showAndUpdateToast(errors, setMyToast);

            dispatch(registerAChange());
            toast.success(ok, { position: "top-left" });
            toast.dismiss(myToast);
            setCancelled_asunt("");
            closeModalCancell();
        } catch (error: any) {
            toast.error(error.message);
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
                            name="cancelled_asunt"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={cancelled_asunt}
                            placeholder="Complete campo"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={10}
                            maxLength={150}
                            style={{ height: "100px" }}
                            autoFocus
                            required
                        />
                    </Form.FloatingLabel>
                </Col>
                <ModalFooter>
                    <Button onClick={closeModalCancell} variant="light">
                        No <FaTimes className="mb-1" />
                    </Button>
                    <Button
                        variant="danger"
                        disabled={isLoadingStatus}
                        type="submit"
                    >
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
        </Form>
    );
}
