import { useEffect } from "react";
import { RESOURCE_ROUTE } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { FloatingLabel, FormSelect } from "react-bootstrap";
import { setFaculties } from "../features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

interface Props {
  action: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  facultieSelectRef: React.RefObject<HTMLSelectElement>;
}

const SelectFaculties = ({
  action,
  handleChange,
  facultieSelectRef,
}: Props): React.JSX.Element => {
  const isEdit: boolean = action === "edit";
  const isSchedule: boolean = action === "schedule";
  const isAdd: boolean = action === "add";

  const formDataState = useAppSelector(({ programming: { formData } }) => {
    if (isEdit) return formData.edit;
    if (isAdd) return formData.add;
    if (isSchedule) return formData.schedule;
  });
  const facultiesState = useAppSelector(({ resources }) => resources.faculties);

  const dispatch = useAppDispatch();

  const getFaculties = async (): Promise<void> => {
    try {
      const { data } = await axios(`${RESOURCE_ROUTE}?resource=faculties`);

      dispatch(setFaculties(data));
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  useEffect(() => {
    getFaculties();
  }, []);

  return (
    <FloatingLabel label="Facultad:">
      <FormSelect
        name="facultie"
        onChange={handleChange}
        value={formDataState?.facultie}
        ref={facultieSelectRef}
        disabled={
          formDataState?.disabledAll || formDataState?.disabledAfterAutocomplete
        }
        required
      >
        <option value="">No seleccionado</option>
        {facultiesState.map(({ id, facultie }, index) => (
          <option key={index} value={id}>
            {facultie}
          </option>
        ))}
      </FormSelect>
    </FloatingLabel>
  );
};

export default SelectFaculties;
