import { useEffect } from "react";
import { UNSET_STATUS, RESOURCE_ROUTE } from "../constants";
import FetcherReports from "./FetcherReports";
import {
  Col,
  Row,
  FloatingLabel,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCategories } from "../features/resources/resourcesSlice";
import { QueryData, setQueryData } from "../features/reports/reportsSlice";
import { THandleChangeITS } from "../types/THandleChanges";
import { ICategory } from "../interfaces/IResources";

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
    <Row className="g-3 mb-5">
      <Col md={2}>
        <FloatingLabel label="Desde:">
          <FormControl
            name="startDate"
            onChange={handleChange}
            type="date"
            value={queryDataState.startDate}
          />
        </FloatingLabel>
      </Col>

      <Col md={2}>
        <FloatingLabel label="Hasta:">
          <FormControl
            name="endDate"
            onChange={handleChange}
            type="date"
            value={queryDataState.endDate}
          />
        </FloatingLabel>
      </Col>

      <Col md={2}>
        <FloatingLabel label="Persona:">
          <FormSelect
            name="category"
            onChange={handleChange}
            value={queryDataState.category}
          >
            <option value={UNSET_STATUS}>Todos</option>
            {categoriesState.map(({ id, category }, index) => (
              <option key={index} value={id}>
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
