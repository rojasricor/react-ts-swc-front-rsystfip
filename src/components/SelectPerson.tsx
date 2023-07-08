import { useEffect } from "react";
import { FloatingLabel, FormSelect } from "react-bootstrap";
import { v4 } from "uuid";
import { api } from "../api/axios";
import { UNSET_STATUS } from "../constants";
import {
    FormDataState,
    setDeans,
    setFormData,
} from "../features/programming/programmingSlice";
import { setCategories } from "../features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ICategory } from "../interfaces/IResources";
import { showAndUpdateToast } from "../libs";
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

    const getDeans = async (): Promise<void> => {
        try {
            const { data } = await api("/deans");

            dispatch(setDeans(data));
        } catch (error: any) {
            showAndUpdateToast(error.response.data.error, { type: "error" });
        }
    };

    useEffect(() => {
        if (formDataState?.person !== UNSET_STATUS) {
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

            if (facultieSelectRef.current) {
                facultieSelectRef.current.className =
                    "form-select border-0 bg-white";
                facultieSelectRef.current.disabled = false;
                if (formDataState?.person === "5")
                    facultieSelectRef.current.disabled = true;
            }

            formDataState?.person === "4" && getDeans();
        }
    }, [formDataState?.person]);

    const getCategories = async (): Promise<void> => {
        try {
            const { data } = await api("/resource", {
                params: { resource: "categories" },
            });

            dispatch(setCategories(data));
        } catch (error: any) {
            showAndUpdateToast(error.response.data.error, { type: "error" });
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <FloatingLabel label="Persona a registrar:">
            <FormSelect
                name="person"
                className="border-0 bg-white"
                onChange={handleChange}
                value={formDataState?.person}
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
