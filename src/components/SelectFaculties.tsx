import { useEffect } from "react";
import { FloatingLabel, FormSelect } from "react-bootstrap";
import { useQuery } from "react-query";
import { v4 } from "uuid";
import { FormDataState } from "../features/programming/programmingSlice";
import { setFaculties } from "../features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IFacultie } from "../interfaces/IResources";
import { notify } from "../libs/toast";
import * as facultieService from "../services/facultie.service";
import { actionFormSchedule } from "./FormSchedulePeople";

interface IProps {
    action: actionFormSchedule;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    facultieSelectRef: React.RefObject<HTMLSelectElement>;
}

export default function SelectFaculties({
    action,
    handleChange,
    facultieSelectRef,
}: IProps): React.JSX.Element {
    const formDataState: FormDataState | undefined = useAppSelector(
        ({ programming: { formData } }) => formData[action]
    );
    const facultiesState: IFacultie[] = useAppSelector(
        ({ resources }) => resources.faculties
    );

    const dispatch = useAppDispatch();

    const { data, error } = useQuery<[], any>(
        "faculties",
        facultieService.getFaculties
    );

    useEffect(() => {
        if (data) dispatch(setFaculties(data));
        if (error) notify(error.response.data.error, { type: "error" });
    }, [data, error]);

    return (
        <FloatingLabel label="Facultad:">
            <FormSelect
                name="facultie"
                className="border-0 bg-white"
                onChange={handleChange}
                value={formDataState.facultie}
                ref={facultieSelectRef}
                disabled={
                    formDataState.disabledAll ||
                    formDataState.disabledAfterAutocomplete
                }
                required
            >
                <option value="">No seleccionado</option>
                {facultiesState.map(({ id, facultie }) => (
                    <option key={v4()} value={id}>
                        {facultie}
                    </option>
                ))}
            </FormSelect>
        </FloatingLabel>
    );
}
