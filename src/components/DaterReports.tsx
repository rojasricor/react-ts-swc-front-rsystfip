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
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../features/resources/resourcesSlice";
import { setQueryData } from "../features/reports/reportsSlice";

const DaterReports = () => {
  const dispatch = useDispatch();

  const categoriesState = useSelector(({ resources }) => resources.categories);
  const queryDataState = useSelector(({ reports }) => reports.queryData);

  const handleChange = (e) => {
    dispatch(
      setQueryData({
        ...queryDataState,
        [e.target.name]: e.target.value,
      })
    );
  };

  const getCategories = async () => {
    try {
      const { data } = await axios(`${RESOURCE_ROUTE}?resource=categories`);

      dispatch(setCategories(data));
    } catch ({ message }) {
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
