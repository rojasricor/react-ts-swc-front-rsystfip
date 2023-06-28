import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Searcher from "../components/Searcher";

export default function PageAgendatedPeople(): React.JSX.Element {
  useEffect(() => {
    document.title = "RSystfip | Agendated People";
  }, []);

  return (
    <Row>
      <Col md={12}>
        <h1 className="h3">Personas agendadas</h1>
        <Searcher />
      </Col>
    </Row>
  );
}
