import { useEffect } from "react";
import { FloatingLabel, FormSelect } from "react-bootstrap";
import { useQuery } from "react-query";
import { v4 } from "uuid";
import { FormDataState } from "../features/programming/programmingSlice";
import { setDocuments } from "../features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IDocument } from "../interfaces/IResources";
import { notify } from "../libs/toast";
import { actionFormSchedule } from "./FormSchedulePeople";
import * as documentService from "../services/document.service";

interface IProps {
    action: actionFormSchedule;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectDocument({
    action,
    handleChange,
}: IProps): React.JSX.Element {
    const documentsState: IDocument[] = useAppSelector(
        ({ resources }) => resources.documents
    );
    const formDataState: FormDataState | undefined = useAppSelector(
        ({ programming: { formData } }) => formData[action]
    );

    const dispatch = useAppDispatch();

    const { data, error } = useQuery<[], any>(
        "documents",
        documentService.getDocuments
    );

    useEffect(() => {
        if (data) dispatch(setDocuments(data));
        if (error) notify(error.response.data.error, { type: "error" });
    }, [data, error]);

    return (
        <FloatingLabel label="Tipo de Documento:">
            <FormSelect
                name="doctype"
                className="border-0 bg-white"
                onChange={handleChange}
                value={formDataState.doctype}
                disabled={
                    formDataState.disabledAll ||
                    formDataState.disabledAfterAutocomplete
                }
                required
            >
                <option value="">No seleccionado</option>
                {documentsState.map(({ id, description }) => (
                    <option key={v4()} value={id}>
                        {description}
                    </option>
                ))}
            </FormSelect>
        </FloatingLabel>
    );
}
