import { Col, Card } from "react-bootstrap";
import FormRecoveryPsw from "./FormRecoveryPsw";

const RecoveryPassword = () => (
  <Col md={4} className="mx-auto">
    <Card className="py-4">
      <h1 className="h3 text-center">Recuperacion de contraseña</h1>
      <Card.Body>
        <FormRecoveryPsw />
      </Card.Body>
    </Card>
  </Col>
);

export default RecoveryPassword;
