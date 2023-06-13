import { useEffect } from "react";
import Statistics from "../components/Statistics";
import { Row } from "react-bootstrap";
import Notify from "../components/Notify";

const PageStcsDaily = () => {
  useEffect(() => {
    document.title = "RSystfip | Statistics daily people";
  }, []);

  return (
    <Row className="g-3">
      <Statistics scheduling_type="daily" />
      <Notify />
    </Row>
  );
};

export default PageStcsDaily;
