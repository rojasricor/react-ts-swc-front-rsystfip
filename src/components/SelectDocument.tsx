import { useEffect } from "react";
import { RESOURCE_ROUTE } from "../constants";
import { FloatingLabel, FormSelect } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { setDocuments } from "../features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IDocument } from "../interfaces/IResources";
import { FormDataState } from "../features/programming/programmingSlice";

interface IProps {
  action: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectDocument = ({
  action,
  handleChange,
}: IProps): React.JSX.Element => {
  const isEdit: boolean = action === "edit";
  const isSchedule: boolean = action === "schedule";
  const isAdd: boolean = action === "add";

  const documentsState: IDocument[] = useAppSelector(
    ({ resources }) => resources.documents
  );
  const formDataState: FormDataState | undefined = useAppSelector(
    ({ programming: { formData } }) => {
      if (isEdit) return formData.edit;
      if (isAdd) return formData.add;
      if (isSchedule) return formData.schedule;
    }
  );

  const dispatch = useAppDispatch();

  const getDocuments = async (): Promise<void> => {
    try {
      const { data } = await axios(`${RESOURCE_ROUTE}?resource=documents`);

      dispatch(setDocuments(data));
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <FloatingLabel label="Tipo de Documento:">
      <FormSelect
        name="doctype"
        onChange={handleChange}
        value={formDataState?.doctype}
        disabled={
          formDataState?.disabledAll || formDataState?.disabledAfterAutocomplete
        }
        required
      >
        <option value="">No seleccionado</option>
        {documentsState.map(({ id, description }, index) => (
          <option key={index} value={id}>
            {description}
          </option>
        ))}
      </FormSelect>
    </FloatingLabel>
  );
};

export default SelectDocument;
