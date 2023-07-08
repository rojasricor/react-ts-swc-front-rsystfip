import { useState } from "react";
import { Button, Col, Form, ModalFooter, Row, Spinner } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import { api } from "../api/axios";
import { registerAChange } from "../features/calendar/calendarSlice";
import {
    FormDataState,
    setIsLoading,
} from "../features/programming/programmingSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { showAndUpdateToast } from "../libs";
import { THandleChangeI } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import { cancellSchema } from "../validation";

interface IProps {
    closeModalCancell: () => void;
}

export default function FormCancellPerson({
    closeModalCancell,
}: IProps): React.JSX.Element {
    const [cancelled_asunt, setCancelled_asunt] = useState<string>("");

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
        if (error)
            return showAndUpdateToast(error.message, { type: "warning" });

        dispatch(setIsLoading(true));
        try {
            const { data } = await api.patch("/person", payload);

            dispatch(registerAChange());
            showAndUpdateToast(data.ok, {
                type: "success",
                position: "top-left",
            });
            setCancelled_asunt("");
            closeModalCancell();
        } catch (error: any) {
            showAndUpdateToast(error.response.data.error, { type: "error" });
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
