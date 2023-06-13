import { Col, FloatingLabel, FormControl, FormSelect } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setQueryData } from "../features/statistics/statisticsSlice";

const DaterStatistics = ({ schedulingType }) => {
  const dispatch = useDispatch();

  const queryDataState = useSelector(({ statistics }) =>
    schedulingType === "daily"
      ? statistics.daily.queryData
      : statistics.scheduled.queryData
  );

  const handleChange = (e) => {
    dispatch(
      setQueryData([
        schedulingType,
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
