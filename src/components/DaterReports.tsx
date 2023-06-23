import { useEffect } from "react";
import { UNSET_STATUS } from "../constants";
import FetcherReports from "./FetcherReports";
import {
  Col,
  Row,
  FloatingLabel,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCategories } from "../features/resources/resourcesSlice";
import { QueryData, setQueryData } from "../features/reports/reportsSlice";
import { THandleChangeITS } from "../types/THandleChanges";
import { ICategory } from "../interfaces/IResources";
import { v4 } from "uuid";
import { api } from "../api/axios";

const DaterReports = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const categoriesState: ICategory[] = useAppSelector(
    ({ resources }) => resources.categories
  );
  const queryDataState: QueryData = useAppSelector(
    ({ reports }) => reports.queryData
  );

  const handleChange = (e: THandleChangeITS) => {
    dispatch(
      setQueryData({
        ...queryDataState,
        [e.target.name]: e.target.value,
      })
    );
  };

  const getCategories = async (): Promise<void> => {
    try {
      const { data } = await api("/resource?resource=categories");

      dispatch(setCategories(data));
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Row className="g-3 mb-5">
      <Col md={2}>
        <FloatingLabel label="Desde:">
          <FormControl
            name="startDate"
            className="border-0 bg-white"
            onChange={handleChange}
            value={queryDataState.startDate}
            type="date"
          />
        </FloatingLabel>
      </Col>

      <Col md={2}>
        <FloatingLabel label="Hasta:">
          <FormControl
            name="endDate"
            className="border-0 bg-white"
            onChange={handleChange}
            value={queryDataState.endDate}
            type="date"
          />
        </FloatingLabel>
      </Col>

      <Col md={2}>
        <FloatingLabel label="Persona:">
          <FormSelect
            name="category"
            className="border-0 bg-white"
            onChange={handleChange}
            value={queryDataState.category}
          >
            <option value={UNSET_STATUS}>Todos</option>
            {categoriesState.map(({ id, category }) => (
              <option key={v4()} value={id}>
                {category}
              </option>
            ))}
          </FormSelect>
        </FloatingLabel>
      </Col>

      <Col md={2}>
        <FetcherReports />
      </Col>
    </Row>
  );
};

export default DaterReports;
