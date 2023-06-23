import { useEffect } from "react";
import Statistics from "../components/Statistics";
import { Row } from "react-bootstrap";

const PageStcsSchedule = (): React.JSX.Element => {
  useEffect(() => {
    document.title = "RSystfip | Statistics scheduled people";
  }, []);

  return (
    <Row className="g-3">
      <Statistics scheduling_type="scheduled" />
    </Row>
  );
};

export default PageStcsSchedule;
