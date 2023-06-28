import { useEffect } from "react";
import { Row } from "react-bootstrap";
import Statistics from "../components/Statistics";

export default function PageStcsSchedule(): React.JSX.Element {
  useEffect(() => {
    document.title = "RSystfip | Statistics scheduled people";
  }, []);

  return (
    <Row className="g-3">
      <Statistics scheduling_type="scheduled" />
    </Row>
  );
}
