import { useEffect } from "react";
import HeaderLogin from "../components/HeaderLogin";
import FormLogin from "../components/FormLogin";
import { Col, Row, Card, Container } from "react-bootstrap";
import Notify from "../components/Notify";

const PageAuth = () => {
  useEffect(() => {
    document.title = "RSystfip | Authenticate";
  }, []);

  return (
    <Row>
      <Col md={4} className="mx-auto">
        <Card className="py-2">
          <HeaderLogin />
          <Card.Body>
            <Container>
              <FormLogin />
            </Container>
          </Card.Body>
        </Card>
        <Notify />
      </Col>
    </Row>
  );
};

export default PageAuth;
