import { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Error404Actioner from "./Error404Actioner";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "RSystfip | Not found";
  }, []);

  return (
    <Container className="px-4 py-5 my-5 text-center">
      <Row className="justify-content-center">
        <Col md={6}>
          <Image
            src="/rsystfip.svg"
            alt="Rsystfip"
            width={72}
            height={57}
            className="mb-4"
          />
          <h1 className="display-5 fw-bold">Link inválido</h1>
          <p className="lead mb-4">
            El link para cambio de contraseña ha expirado o es inválido.
          </p>
          <Error404Actioner />
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
