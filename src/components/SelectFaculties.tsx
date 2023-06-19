import { useEffect } from "react";
import { RESOURCE_ROUTE } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { FloatingLabel, FormSelect } from "react-bootstrap";
import { setFaculties } from "../features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { FormDataState } from "../features/programming/programmingSlice";
import { IFacultie } from "../interfaces/IResources";
import { v4 } from "uuid";

interface IProps {
  action: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  facultieSelectRef: React.RefObject<HTMLSelectElement>;
}

const SelectFaculties = ({
  action,
  handleChange,
  facultieSelectRef,
}: IProps): React.JSX.Element => {
  const formDataState: FormDataState | undefined = useAppSelector(
    ({ programming: { formData } }) => formData[action]
  );
  const facultiesState: IFacultie[] = useAppSelector(
    ({ resources }) => resources.faculties
  );

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
        {facultiesState.map(({ id, facultie }) => (
          <option key={v4()} value={id}>
            {facultie}
          </option>
        ))}
      </FormSelect>
    </FloatingLabel>
  );
};

export default SelectFaculties;
