import { useEffect } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { v4 } from "uuid";
import {
    FormData,
    resetFormDataAdmin,
    setFormData,
} from "../features/admin/adminSlice";
import { setDocuments } from "../features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IDocument } from "../interfaces/IResources";
import { notify } from "../libs/toast";
import * as documentService from "../services/document.service";
import * as userService from "../services/user.service";
import { THandleChangeITS } from "../types/THandleChanges";
import { THandleSubmit } from "../types/THandleSubmits";
import { userSchema } from "../validation/schemas";
import Submitter from "./Submitter";

export default function FormUserAdd(): React.JSX.Element {
    const formDataState: FormData = useAppSelector(
        ({ admin }) => admin.formData
    );
    const documentsState: IDocument[] = useAppSelector(
        ({ resources }) => resources.documents
    );

    const dispatch = useAppDispatch();

    const handleChange = (e: THandleChangeITS) => {
        dispatch(
            setFormData({
                ...formDataState,
                [e.target.name]: e.target.value,
            })
        );
    };

    const { mutate, isLoading } = useMutation(userService.saveUser, {
        onSuccess: (data) => {
            dispatch(resetFormDataAdmin());
            notify(data.ok, {
                type: "success",
                position: "top-left",
            });
        },
        onError: (error: any) =>
            notify(error.response.data.error, { type: "error" }),
    });

    const handleSubmit = (e: THandleSubmit) => {
        e.preventDefault();

        const { error, value } = userSchema.validate(formDataState);
        if (error) return notify(error.message, { type: "warning" });

        mutate(value);
    };

    const { data, error } = useQuery<[], any>(
        "documents",
        documentService.getDocuments
    );

    useEffect(() => {
        if (data) dispatch(setDocuments(data));
        if (error) notify(error.response.data.error, { type: "error" });
    }, [data, error]);

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="g-2">
                <Col md={4}>
                    <Form.FloatingLabel label="Rol usuario:">
                        <Form.Select
                            name="role"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formDataState.role}
                            required
                        >
                            <option value="">No seleccionado</option>
                            <option value="2">Rector</option>
                            <option value="3">Secretaria</option>
                        </Form.Select>
                    </Form.FloatingLabel>
                </Col>

                <Col md={4}>
                    <Form.FloatingLabel label="Nombres:">
                        <Form.Control
                            name="name"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formDataState.name}
                            type="text"
                            placeholder="Name"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={3}
                            maxLength={25}
                            autoFocus
                            required
                        />
                    </Form.FloatingLabel>
                </Col>

                <Col md={4}>
                    <Form.FloatingLabel label="Apellidos:">
                        <Form.Control
                            name="lastname"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formDataState.lastname}
                            type="text"
                            placeholder="Lastname"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={3}
                            maxLength={25}
                            required
                        />
                    </Form.FloatingLabel>
                </Col>

                <Col md={8}>
                    <Form.FloatingLabel label="Tipo de Documento:">
                        <Form.Select
                            name="docType"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formDataState.docType}
                            required
                        >
                            <option value="">No seleccionado</option>
                            {documentsState.map(({ id, description }) => (
                                <option key={v4()} value={id}>
                                    {description}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.FloatingLabel>
                </Col>

                <Col md={4}>
                    <Form.FloatingLabel label="Documento:">
                        <Form.Control
                            name="doc"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formDataState.doc}
                            type="number"
                            placeholder="Document"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={8}
                            maxLength={10}
                            required
                        />
                    </Form.FloatingLabel>
                </Col>

                <Col md={8}>
                    <Form.FloatingLabel label="Correo institucional:">
                        <Form.Control
                            name="email"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formDataState.email}
                            type="email"
                            placeholder="Email"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={10}
                            maxLength={30}
                            required
                        />
                    </Form.FloatingLabel>
                </Col>

                <Col md={4}>
                    <Form.FloatingLabel label="Celular:">
                        <Form.Control
                            name="tel"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formDataState.tel}
                            type="number"
                            placeholder="Phone"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={10}
                            maxLength={10}
                            required
                        />
                    </Form.FloatingLabel>
                </Col>

                <Col md={6}>
                    <Form.FloatingLabel label="Contraseña:">
                        <Form.Control
                            name="password"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formDataState.password}
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={8}
                            maxLength={30}
                            required
                        />
                    </Form.FloatingLabel>
                </Col>

                <Col md={6}>
                    <Form.FloatingLabel label="Confirmar contraseña:">
                        <Form.Control
                            name="passwordConfirmation"
                            className="border-0 bg-white"
                            onChange={handleChange}
                            value={formDataState.passwordConfirmation}
                            type="password"
                            placeholder="Confirm password"
                            autoComplete="off"
                            spellCheck={false}
                            minLength={8}
                            maxLength={30}
                            required
                        />
                    </Form.FloatingLabel>
                </Col>

                <Submitter loading={isLoading}>
                    {!isLoading ? (
                        <>
                            Registrar <FaUserPlus className="mb-1" />
                        </>
                    ) : (
                        <Spinner size="sm" />
                    )}
                </Submitter>
            </Row>
        </Form>
    );
}
