import { useEffect } from "react";
import { FloatingLabel, FormSelect } from "react-bootstrap";
import { toast } from "react-toastify";
import { setDocuments } from "../features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IDocument } from "../interfaces/IResources";
import { FormDataState } from "../features/programming/programmingSlice";
import { v4 } from "uuid";
import { api } from "../api/axios";

interface IProps {
  action: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectDocument = ({
  action,
  handleChange,
}: IProps): React.JSX.Element => {
  const documentsState: IDocument[] = useAppSelector(
    ({ resources }) => resources.documents
  );
  const formDataState: FormDataState | undefined = useAppSelector(
    ({ programming: { formData } }) => formData[action]
  );

  const dispatch = useAppDispatch();

  const getDocuments = async (): Promise<void> => {
    try {
      const { data } = await api("/resource", {
        params: { resource: "documents" },
      });

      dispatch(setDocuments(data));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <FloatingLabel label="Tipo de Documento:">
      <FormSelect
        name="doctype"
        className="border-0 bg-white"
        onChange={handleChange}
        value={formDataState?.doctype}
        disabled={
          formDataState?.disabledAll || formDataState?.disabledAfterAutocomplete
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
};

export default SelectDocument;
