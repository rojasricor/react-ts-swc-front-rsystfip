import { Card, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FormLogin from "../components/FormLogin";
import HeaderLogin from "../components/HeaderLogin";

export default function PageAuth(): React.JSX.Element {
    return (
        <Row>
            <Helmet>
                <title>RSystfip | Authenticate</title>
            </Helmet>
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
