import { Col, Card } from "react-bootstrap";
import FormRecoveryPsw from "./FormRecoveryPsw";

const RecoveryPassword = (): React.JSX.Element => (
  <Col md={4} className="mx-auto">
    <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
      <h1 className="h3 text-center">Recuperacion de contraseña</h1>
      <Card.Body>
        <FormRecoveryPsw />
      </Card.Body>
    </Card>
  </Col>
);

export default RecoveryPassword;
