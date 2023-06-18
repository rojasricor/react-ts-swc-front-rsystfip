import { useEffect } from "react";
import { API_ROUTE, RESOURCE_ROUTE, UNSET_STATUS } from "../constants";
import { FloatingLabel, FormSelect } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { setCategories } from "../features/resources/resourcesSlice";
import {
  FormDataState,
  setDeans,
  setFormData,
} from "../features/programming/programmingSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ICategory } from "../interfaces/IResources";

interface IProps {
  action: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  facultieSelectRef: React.RefObject<HTMLSelectElement>;
}

const SelectPerson = ({
  action,
  handleChange,
  facultieSelectRef,
}: IProps): React.JSX.Element => {
  const isEdit: boolean = action === "edit";
  const isSchedule: boolean = action === "schedule";
  const isAdd: boolean = action === "add";

  const categoriesState: ICategory[] = useAppSelector(
    ({ resources }) => resources.categories
  );
  const formDataState: FormDataState | undefined = useAppSelector(
    ({ programming: { formData } }) => {
      if (isEdit) return formData.edit;
      if (isAdd) return formData.add;
      if (isSchedule) return formData.schedule;
    }
  );

  const dispatch = useAppDispatch();

  const getDeans = async (): Promise<void> => {
    try {
      const { data } = await axios(`${API_ROUTE}/deans`);

      dispatch(setDeans(data));
    } catch ({ message }: any) {
      toast.error(message);
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
        facultieSelectRef.current.className = "form-select";
        facultieSelectRef.current.disabled = false;
        if (formDataState?.person === "5")
          facultieSelectRef.current.disabled = true;
      }

      formDataState?.person === "4" && getDeans();
    }
  }, [formDataState?.person]);

  const getCategories = async (): Promise<void> => {
    try {
      const { data } = await axios(`${RESOURCE_ROUTE}?resource=categories`);

      dispatch(setCategories(data));
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <FloatingLabel label="Persona a registrar:">
      <FormSelect
        name="person"
        onChange={handleChange}
        value={formDataState?.person}
        required
      >
        <option value="">No seleccionado</option>
        {categoriesState.map(({ id, category }, index) => (
          <option key={index} value={id}>
            {category}
          </option>
        ))}
      </FormSelect>
    </FloatingLabel>
  );
};

export default SelectPerson;
