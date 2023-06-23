import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import FormSchedulePeople from "../components/FormSchedulePeople";

const PageAddPeople = (): React.JSX.Element => {
  useEffect(() => {
    document.title = "RSystfip | Daily Scheduling";
  }, []);

  return (
    <Row>
      <Col md={6} className="mx-auto">
        <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
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
