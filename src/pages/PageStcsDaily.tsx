import { useEffect } from "react";
import Statistics from "../components/Statistics";
import { Row } from "react-bootstrap";

const PageStcsDaily = (): React.JSX.Element => {
  useEffect(() => {
    document.title = "RSystfip | Statistics daily people";
  }, []);

  return (
    <Row className="g-3">
      <Statistics scheduling_type="daily" />
    </Row>
  );
};

export default PageStcsDaily;
