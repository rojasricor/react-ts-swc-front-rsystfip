import { useEffect, useRef } from "react";
import { Button, Col, Form, ModalFooter, Row, Spinner } from "react-bootstrap";
import { GiReturnArrow } from "react-icons/gi";
import { IoCalendarNumber } from "react-icons/io5";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { registerAChange } from "../features/calendar/calendarSlice";
import {
    Deans,
    FormDataState,
    setFormData,
} from "../features/programming/programmingSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { notify } from "../libs/toast";
import * as deanService from "../services/dean.service";
import * as peopleService from "../services/people.service";
import * as scheduleService from "../services/schedule.service";
import { THandleChangeITS } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import { peopleEditSchema, schedulerSchema } from "../validation/schemas";
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

export type actionFormSchedule = IProps["action"];

export default function FormSchedulePeople({
    action,
    closeModalScheduling,
}: IProps): React.JSX.Element {
    const { id } = useParams<{ id: string }>();

    const facultieSelectRef = useRef<HTMLSelectElement>(null);

    const dispatch = useAppDispatch();

    const formDataState: FormDataState = useAppSelector(
        ({ programming: { formData } }) => formData[action]
    );

    const deansState: Deans[] = useAppSelector(
        ({ programming }) => programming.deans
    );

    const mutationEditPerson = useMutation(peopleService.editPeople, {
        onSuccess: (data) => {
            dispatch(setFormData([action]));

            notify(data.ok, {
                type: "success",
                position: "top-left",
            });
        },
        onError: (error: any) =>
            notify(error.response.data.error, { type: "error" }),
    });

    const mutationSavePeople = useMutation(peopleService.savePeople);
    const mutationSchedule = useMutation(scheduleService.saveSchedule);
    const mutationSaveDean = useMutation(deanService.saveDean);

    const editPerson = () => {
        const { error, value } = peopleEditSchema.validate({
            id,
            person: formDataState.person,
            name: formDataState.name,
            doctype: formDataState.doctype,
            doc: formDataState.doc,
            facultie: formDataState.facultie,
            asunt: formDataState.asunt,
        });
        if (error) return notify(error.message, { type: "warning" });

        mutationEditPerson.mutate(value);
    };

    const schedulePerson = async (
        closeModalScheduling?: IProps["closeModalScheduling"]
    ): Promise<void> => {
        const { error, value } = schedulerSchema.validate({
            person: formDataState.person,
            name: formDataState.name,
            doctype: formDataState.doctype,
            doc: formDataState.doc,
            emailContact: formDataState.emailContact || undefined,
            telContact: formDataState.telContact || undefined,
            facultie: formDataState.facultie,
            asunt: formDataState.asunt,
            color: formDataState.color,
            date: formDataState.date,
            start: formDataState.start,
            end: formDataState.end,
            status: formDataState.status,
        });
        if (error) return notify(error.message, { type: "warning" });

        try {
            const data = await mutationSavePeople.mutateAsync(value);

            await mutationSchedule.mutateAsync({
                person_id: data.personCreated.id.toString(),
                status: value.status,
                color: value.color,
                date_filter: value.date || undefined,
                start_date: value.start || undefined,
                end_date: value.end || undefined,
            });

            if (value.person === "4") {
                await mutationSaveDean.mutateAsync({
                    _id: value.doc,
                    dean: value.name,
                    facultie_id: value.facultie,
                });
            }

            dispatch(setFormData([action]));

            if (formDataState.status === "scheduled" && closeModalScheduling) {
                dispatch(registerAChange());
                closeModalScheduling();
            }

            notify(data.ok, {
                type: "success",
                position: "top-left",
            });
        } catch (error: any) {
            notify(error.response.data.error, { type: "error" });
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

    const { data, error } = useQuery<any, any>(
        ["personData", id],
        () => peopleService.getData(id as string),
        { enabled: !!id }
    );

    const handleChange = (e: THandleChangeITS) => {
        dispatch(
            setFormData([
                action,
                { ...formDataState, [e.target.name]: e.target.value },
            ])
        );
    };

    const autocompleteDeansData = () => {
        if (!deansState || formDataState.person !== "4") return;

        for (let i = 0; i < deansState.length; i++) {
            const { _id, dean, facultie_id } = deansState[i];

            if (_id === formDataState.doc) {
                dispatch(
                    setFormData([
                        action,
                        {
                            ...formDataState,
                            doctype: "1",
                            name: dean,
                            facultie: facultie_id.toString(),
                            disabledAfterAutocomplete: true,
                        },
                    ])
                );

                if (facultieSelectRef.current) {
                    facultieSelectRef.current.className =
                        "form-control border-0 bg-white";
                }

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
        if (data)
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
        if (error) notify(error.response.data.error, { type: "error" });
    }, [data, error]);

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
                            value={formDataState.doc}
                            type="number"
                            placeholder="Complete campo"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={8}
                            maxLength={30}
                            disabled={
                                formDataState.disabledAll ||
                                formDataState.disabledAfterAutocomplete
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
                            value={formDataState.name}
                            type="text"
                            placeholder="Complete campo"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={8}
                            maxLength={50}
                            disabled={
                                formDataState.disabledAll ||
                                formDataState.disabledAfterAutocomplete
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
                                value={formDataState.telContact}
                                type="number"
                                placeholder="Complete campo"
                                autoComplete="off"
                                spellCheck={false}
                                minLength={10}
                                maxLength={10}
                                disabled={
                                    formDataState.disabledAll ||
                                    formDataState.disabledAfterAutocomplete
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
                                value={formDataState.emailContact}
                                type="email"
                                placeholder="Complete campo"
                                autoComplete="off"
                                spellCheck={false}
                                minLength={10}
                                maxLength={30}
                                disabled={
                                    formDataState.disabledAll ||
                                    formDataState.disabledAfterAutocomplete
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
                            value={formDataState.asunt}
                            placeholder="Complete campo"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={10}
                            maxLength={150}
                            style={{ height: "100px" }}
                            disabled={formDataState.disabledAll}
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
                            value={formDataState.color}
                            type="color"
                        />
                    </Col>
                </ProtectedElement>

                <SmallCaption />

                <ProtectedElement isAllowed={action !== "schedule"}>
                    <FooterFormPeople
                        isAllowed={action === "edit"}
                        isLoading={
                            mutationEditPerson.isLoading ||
                            mutationSavePeople.isLoading ||
                            mutationSchedule.isLoading ||
                            mutationSaveDean.isLoading
                        }
                    />
                </ProtectedElement>

                <ProtectedElement isAllowed={action === "schedule"}>
                    <ModalFooter>
                        <Button variant="light" onClick={closeModalScheduling}>
                            Cerrar <GiReturnArrow className="mb-1" />
                        </Button>
                        <Button type="submit">
                            {!(
                                mutationEditPerson.isLoading ||
                                mutationSavePeople.isLoading ||
                                mutationSchedule.isLoading ||
                                mutationSaveDean.isLoading
                            ) ? (
                                <>
                                    Agendar
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
