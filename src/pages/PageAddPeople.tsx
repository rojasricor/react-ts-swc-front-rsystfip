import { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import FormSchedulePeople from "../components/FormSchedulePeople";

const PageAddPeople = () => {
  useEffect(() => {
    document.title = "RSystfip | Daily Scheduling";
  }, []);

  return (
    <Row>
      <Col md={6} className="mx-auto">
        <Card className="py-2">
          <h1 className="h3 text-center">Agendamiento diario</h1>
          <Card.Body>
            <FormSchedulePeople action="add" />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default PageAddPeople;
