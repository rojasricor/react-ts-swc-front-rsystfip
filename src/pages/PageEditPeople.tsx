import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import FormSchedulePeople from "../components/FormSchedulePeople";

const PageEditPeople = (): React.JSX.Element => {
  useEffect(() => {
    document.title = "RSystfip | Edit people";
  }, []);

  return (
    <Row>
      <Col md={6} className="mx-auto">
        <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
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
