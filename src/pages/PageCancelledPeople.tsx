import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import TableCancelled from "../components/TableCancelled";

export default function PageCancelledPeople(): React.JSX.Element {
  useEffect(() => {
    document.title = "RSystfip | Cancelled people";
  });

  return (
    <Row>
      <Col md={12}>
        <h1 className="h3">Citas canceladas</h1>
        <TableCancelled />
      </Col>
    </Row>
  );
}
