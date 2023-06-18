import { Col, FloatingLabel, FormControl, FormSelect } from "react-bootstrap";
import {
  QueryData,
  setQueryData,
} from "../features/statistics/statisticsSlice";
import { PropsStatistics } from "./Statistics";
import { useAppDispatch, useAppSelector } from "../hooks";
import { THandleChangeITS } from "../types/THandleChanges";

const DaterStatistics = ({
  scheduling_type,
}: PropsStatistics): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const queryDataState: QueryData = useAppSelector(({ statistics }) =>
    scheduling_type === "daily"
      ? statistics.daily.queryData
      : statistics.scheduled.queryData
  );

  const handleChange = (e: THandleChangeITS) => {
    dispatch(
      setQueryData([
        scheduling_type,
        {
          ...queryDataState,
          [e.target.name]: e.target.value,
        },
      ])
    );
  };

  return (
    <>
      <Col md={2}>
        <FloatingLabel label="Desde:">
          <FormControl
            name="start"
            onChange={handleChange}
            type="date"
            value={queryDataState.start}
          />
        </FloatingLabel>
      </Col>

      <Col md={2}>
        <FloatingLabel label="Hasta:">
          <FormControl
            name="end"
            onChange={handleChange}
            type="date"
            value={queryDataState.end}
          />
        </FloatingLabel>
      </Col>

      <Col md={2}>
        <FloatingLabel label="Gráfica:">
          <FormSelect
            name="chartType"
            onChange={handleChange}
            value={queryDataState.chartType}
          >
            <option value="bar">Barra Vertical</option>
            <option value="polarArea">Polar Area</option>
            <option value="line">Línea</option>
            <option value="pie">Torta</option>
            <option value="doughnut">Doughnut</option>
          </FormSelect>
        </FloatingLabel>
      </Col>
    </>
  );
};

export default DaterStatistics;
