import { Card, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FormUserAdd from "../components/FormUserAdd";

export default function PageRegisterUsers(): React.JSX.Element {
    return (
        <Row>
            <Helmet>
                <title>RSystfip | Register user</title>
            </Helmet>
            <Col md={6} className="mx-auto">
                <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
                    <h1 className="h3 text-center">Registrar usuario nuevo</h1>
                    <Card.Body className="my-4">
                        <FormUserAdd />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
