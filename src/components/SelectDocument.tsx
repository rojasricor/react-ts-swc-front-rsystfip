import { useEffect } from "react";
import { RESOURCE_ROUTE } from "../constants";
import { FloatingLabel, FormSelect } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setDocuments } from "../features/resources/resourcesSlice";

const SelectDocument = ({ action, handleChange }) => {
  const isEdit = action === "edit";
  const isSchedule = action === "schedule";
  const isAdd = action === "add";

  const documentsState = useSelector(({ resources }) => resources.documents);
  const formDataState = useSelector(({ programming: { formData } }) => {
    if (isEdit) return formData.edit;
    if (isAdd) return formData.add;
    if (isSchedule) return formData.schedule;
  });

  const dispatch = useDispatch();

  const getDocuments = async () => {
    try {
      const { data } = await axios(`${RESOURCE_ROUTE}?resource=documents`);

      dispatch(setDocuments(data));
    } catch ({ message }) {
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
        value={formDataState.doctype}
        disabled={
          formDataState.disabledAll || formDataState.disabledAfterAutocomplete
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
