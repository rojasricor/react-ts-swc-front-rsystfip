import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Searcher from "../components/Searcher";
import Notify from "../components/Notify";

const PageAgendatedPeople = () => {
  useEffect(() => {
    document.title = "RSystfip | Agendated People";
  }, []);

  return (
    <Row>
      <Col md={12}>
        <h1 className="h3">Personas agendadas</h1>
        <Searcher />
        <Notify />
      </Col>
    </Row>
  );
};

export default PageAgendatedPeople;
