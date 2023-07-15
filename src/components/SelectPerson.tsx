import { useEffect } from "react";
import { FloatingLabel, FormSelect } from "react-bootstrap";
import { UseQueryResult, useQueries } from "react-query";
import { v4 } from "uuid";
import { UNSET_STATUS } from "../constants";
import {
    FormDataState,
    setDeans,
    setFormData,
} from "../features/programming/programmingSlice";
import { setCategories } from "../features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ICategory } from "../interfaces/IResources";
import { notify } from "../libs/toast";
import * as categoryService from "../services/category.service";
import * as deanService from "../services/dean.service";
import { actionFormSchedule } from "./FormSchedulePeople";

interface IProps {
    action: actionFormSchedule;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    facultieSelectRef: React.RefObject<HTMLSelectElement>;
}

export default function SelectPerson({
    action,
    handleChange,
    facultieSelectRef,
}: IProps): React.JSX.Element {
    const categoriesState: ICategory[] = useAppSelector(
        ({ resources }) => resources.categories
    );
    const formDataState: FormDataState | undefined = useAppSelector(
        ({ programming: { formData } }) => formData[action]
    );

    const dispatch = useAppDispatch();

    const queries = useQueries([
        { queryKey: "deans", queryFn: deanService.getDeans, enabled: false },
        { queryKey: "categories", queryFn: categoryService.getCategories },
    ]);

    useEffect(
        () => {
            for (let i = 0; i < queries.length; i++) {
                const { data, error } = queries[i] as UseQueryResult<any, any>;

                if (data) {
                    if (i === 0) {
                        dispatch(setDeans(data));
                    } else if (i === 1) {
                        dispatch(setCategories(data));
                    }
                }

                if (error) {
                    notify(error.response.data.error, { type: "error" });
                }
            }
        },
        queries.flatMap(({ data, error }) => [data, error])
    );

    const inputsInteraction = async () => {
        if (formDataState.person === UNSET_STATUS) return;

        dispatch(
            setFormData([
                action,
                {
                    ...formDataState,
                    disabledAll: false,
                    disabledAfterAutocomplete: false,
                },
            ])
        );

        if (formDataState.person === "4") {
            await queries[0].refetch();
        }

        if (facultieSelectRef.current) {
            facultieSelectRef.current.className =
                "form-select border-0 bg-white";
            facultieSelectRef.current.disabled = false;
            if (formDataState.person === "5")
                facultieSelectRef.current.disabled = true;
        }
    };

    useEffect(() => {
        inputsInteraction();
    }, [formDataState.person]);

    return (
        <FloatingLabel label="Persona a registrar:">
            <FormSelect
                name="person"
                className="border-0 bg-white"
                onChange={handleChange}
                value={formDataState.person}
                required
            >
                <option value="">No seleccionado</option>
                {categoriesState.map(({ id, category }) => (
                    <option key={v4()} value={id}>
                        {category}
                    </option>
                ))}
            </FormSelect>
        </FloatingLabel>
    );
}
