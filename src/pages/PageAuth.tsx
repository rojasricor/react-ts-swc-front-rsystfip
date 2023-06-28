import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import FormLogin from "../components/FormLogin";
import HeaderLogin from "../components/HeaderLogin";

export default function PageAuth(): React.JSX.Element {
  useEffect(() => {
    document.title = "RSystfip | Authenticate";
  }, []);

  return (
    <Row>
      <Col md={4} className="mx-auto">
        <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
          <HeaderLogin />
          <Card.Body>
            <Container>
              <FormLogin />
            </Container>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
