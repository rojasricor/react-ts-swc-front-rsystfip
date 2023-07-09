import { useEffect, useRef } from "react";
import { Button, Col, Form, ModalFooter, Row, Spinner } from "react-bootstrap";
import { GiReturnArrow } from "react-icons/gi";
import { IoCalendarNumber } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { registerAChange } from "../features/calendar/calendarSlice";
import {
    Deans,
    FormDataState,
    setFormData,
    setIsLoading,
} from "../features/programming/programmingSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { notify } from "../libs/toast";
import { THandleChangeITS } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import { peopleEditSchema, schedulerSchema } from "../validation/joi";
import FooterFormPeople from "./FooterFormPeople";
import ProtectedElement from "./ProtectedElement";
import SelectDocument from "./SelectDocument";
import SelectFaculties from "./SelectFaculties";
import SelectPerson from "./SelectPerson";
import SmallCaption from "./SmallCaption";

interface IProps {
    action: "add" | "edit" | "schedule";
    closeModalScheduling?: () => void;
}

type TParams = { id: string };

export type actionFormSchedule = IProps["action"];

export default function FormSchedulePeople({
    action,
    closeModalScheduling,
}: IProps): React.JSX.Element {
    const { id } = useParams<TParams>();

    const facultieSelectRef = useRef<HTMLSelectElement>(null);

    const dispatch = useAppDispatch();

    const formDataState: FormDataState | undefined = useAppSelector(
        ({ programming: { formData } }) => formData[action]
    );
    const isLoadingState: boolean = useAppSelector(
        ({ programming }) => programming.isLoading
    );
    const deansState: Deans[] = useAppSelector(
        ({ programming }) => programming.deans
    );

    const editPerson = async (): Promise<void> => {
        const { error, value } = peopleEditSchema.validate({
            id,
            person: formDataState?.person,
            name: formDataState?.name,
            doctype: formDataState?.doctype,
            doc: formDataState?.doc,
            facultie: formDataState?.facultie,
            asunt: formDataState?.asunt,
        });
        if (error) return notify(error.message, { type: "warning" });

        dispatch(setIsLoading(true));
        try {
            const { data } = await api.put(`/people/${id}`, value);

            dispatch(setFormData([action]));

            notify(data.ok, {
                type: "success",
                position: "top-left",
            });
        } catch (error: any) {
            notify(error.response.data.error, { type: "error" });
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const schedulePerson = async (
        closeModalScheduling?: IProps["closeModalScheduling"]
    ): Promise<void> => {
        const { error, value } = schedulerSchema.validate({
            person: formDataState?.person,
            name: formDataState?.name,
            doctype: formDataState?.doctype,
            doc: formDataState?.doc,
            emailContact:
                formDataState?.emailContact === ""
                    ? null
                    : formDataState?.emailContact,
            telContact:
                formDataState?.telContact === ""
                    ? null
                    : formDataState?.telContact,
            facultie: formDataState?.facultie,
            asunt: formDataState?.asunt,
            color: formDataState?.color,
            date: formDataState?.date,
            start: formDataState?.start,
            end: formDataState?.end,
            status: formDataState?.status,
        });
        if (error) return notify(error.message, { type: "warning" });

        dispatch(setIsLoading(true));
        try {
            const { data } = await api.post("/people", value);

            dispatch(setFormData([action]));

            if (formDataState?.status === "scheduled" && closeModalScheduling) {
                dispatch(registerAChange());
                closeModalScheduling();
            }

            notify(data.ok, {
                type: "success",
                position: "top-left",
            });
        } catch (error: any) {
            notify(error.response.data.error, { type: "error" });
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const handleSubmit = (e: THandleSubmit) => {
        e.preventDefault();

        switch (action) {
            case "edit":
                return editPerson();

            case "schedule":
                return schedulePerson(closeModalScheduling);

            case "add":
                dispatch(
                    setFormData([
                        action,
                        {
                            ...formDataState,
                            status: "daily",
                        },
                    ])
                );
                return schedulePerson();
        }
    };

    const getUserData = async (): Promise<void> => {
        try {
            const { data } = await api(`/people/${id}`);

            dispatch(
                setFormData([
                    action,
                    {
                        ...formDataState,
                        person: data.category_id.toString(),
                        doctype: data.document_id.toString(),
                        facultie: data.facultie_id.toString(),
                        name: data.name,
                        doc: data.document_number,
                        asunt: data.come_asunt,
                    },
                ])
            );
        } catch (error: any) {
            notify(error.response.data.error, { type: "error" });
        }
    };

    const handleChange = (e: THandleChangeITS) => {
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

    const autocompleteDeansData = () => {
        if (!deansState || formDataState?.person !== "4") return;

        for (const dean of deansState) {
            if (dean._id === formDataState?.doc) {
                dispatch(
                    setFormData([
                        action,
                        {
                            ...formDataState,
                            doctype: "1",
                            name: dean.dean,
                            facultie: dean.facultie_id.toString(),
                            disabledAfterAutocomplete: true,
                        },
                    ])
                );

                if (facultieSelectRef.current)
                    facultieSelectRef.current.className =
                        "form-control border-0 bg-white";

                notify("Se han completado los datos", {
                    type: "info",
                    position: "top-left",
                });
                break;
            }
        }
    };

    useEffect(() => {
        autocompleteDeansData();
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
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formDataState?.doc}
                            type="number"
                            placeholder="Complete campo"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={8}
                            maxLength={30}
                            disabled={
                                formDataState?.disabledAll ||
                                formDataState?.disabledAfterAutocomplete
                            }
                            autoFocus
                            required
                        />
                    </Form.FloatingLabel>
                </Col>

                <Col md={6}>
                    <SelectDocument
                        action={action}
                        handleChange={handleChange}
                    />
                </Col>

                <Col md={6}>
                    <Form.FloatingLabel label="Nombres y Apellidos:">
                        <Form.Control
                            name="name"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formDataState?.name}
                            type="text"
                            placeholder="Complete campo"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={8}
                            maxLength={50}
                            disabled={
                                formDataState?.disabledAll ||
                                formDataState?.disabledAfterAutocomplete
                            }
                            required
                        />
                    </Form.FloatingLabel>
                </Col>

                <ProtectedElement isAllowed={action === "schedule"}>
                    <Col md={6}>
                        <Form.FloatingLabel label="Teléfono de contacto:">
                            <Form.Control
                                name="telContact"
                                className="border-0 bg-white"
                                onChange={handleChange}
                                value={formDataState?.telContact}
                                type="number"
                                placeholder="Complete campo"
                                autoComplete="off"
                                spellCheck={false}
                                minLength={10}
                                maxLength={10}
                                disabled={
                                    formDataState?.disabledAll ||
                                    formDataState?.disabledAfterAutocomplete
                                }
                                required
                            />
                        </Form.FloatingLabel>
                    </Col>
                </ProtectedElement>

                <ProtectedElement isAllowed={action === "schedule"}>
                    <Col md={6}>
                        <Form.FloatingLabel label="Email de contacto:">
                            <Form.Control
                                name="emailContact"
                                className="border-0 bg-white"
                                onChange={handleChange}
                                value={formDataState?.emailContact}
                                type="email"
                                placeholder="Complete campo"
                                autoComplete="off"
                                spellCheck={false}
                                minLength={10}
                                maxLength={30}
                                disabled={
                                    formDataState?.disabledAll ||
                                    formDataState?.disabledAfterAutocomplete
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
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formDataState?.asunt}
                            placeholder="Complete campo"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={10}
                            maxLength={150}
                            style={{ height: "100px" }}
                            disabled={formDataState?.disabledAll}
                            required
                        />
                    </Form.FloatingLabel>
                </Col>

                <ProtectedElement isAllowed={action === "schedule"}>
                    <Col md={12}>
                        <Form.Control
                            name="color"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formDataState?.color}
                            type="color"
                        />
                    </Col>
                </ProtectedElement>

                <SmallCaption />

                <ProtectedElement isAllowed={action !== "schedule"}>
                    <FooterFormPeople isAllowed={action === "edit"} />
                </ProtectedElement>

                <ProtectedElement isAllowed={action === "schedule"}>
                    <ModalFooter>
                        <Button variant="light" onClick={closeModalScheduling}>
                            Cerrar <GiReturnArrow className="mb-1" />
                        </Button>
                        <Button type="submit">
                            {!isLoadingState ? (
                                <>
                                    Agendar{" "}
                                    <IoCalendarNumber className="mb-1" />
                                </>
                            ) : (
                                <Spinner size="sm" />
                            )}
                        </Button>
                    </ModalFooter>
                </ProtectedElement>
            </Row>
        </Form>
    );
}
