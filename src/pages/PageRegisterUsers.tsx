import { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import FormUserAdd from "../components/FormUserAdd";
import Notify from "../components/Notify";

const PageRegisterUsers = (): React.JSX.Element => {
  useEffect(() => {
    document.title = "RSystfip | Register user";
  }, []);

  return (
    <Row>
      <Col md={6} className="mx-auto">
        <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
          <h1 className="h3 text-center">Registrar usuario nuevo</h1>
          <Card.Body>
            <FormUserAdd />
          </Card.Body>
        </Card>
      </Col>
      <Notify />
    </Row>
  );
};

export default PageRegisterUsers;
