import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import FormSchedulePeople from "../components/FormSchedulePeople";

const PageEditPeople = () => {
  useEffect(() => {
    document.title = "RSystfip | Edit people";
  }, []);

  return (
    <Row>
      <Col md={6} className="mx-auto">
        <Card className="py-2">
          <h1 className="h3 text-center">Actualizar Datos</h1>
          <Card.Body>
            <FormSchedulePeople action="edit" />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default PageEditPeople;
