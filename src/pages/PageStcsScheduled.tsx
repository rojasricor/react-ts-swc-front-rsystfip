import { useEffect } from "react";
import Statistics from "../components/Statistics";
import { Row } from "react-bootstrap";
import Notify from "../components/Notify";

const PageStcsSchedule = (): React.JSX.Element => {
  useEffect(() => {
    document.title = "RSystfip | Statistics scheduled people";
  }, []);

  return (
    <Row className="g-3">
      <Statistics scheduling_type="scheduled" />
      <Notify />
    </Row>
  );
};

export default PageStcsSchedule;
