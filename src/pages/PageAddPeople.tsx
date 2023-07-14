import { Card, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FormSchedulePeople from "../components/FormSchedulePeople";

export default function PageAddPeople(): React.JSX.Element {
    return (
        <Row>
            <Helmet>
                <title>RSystfip | Daily Scheduling</title>
            </Helmet>
            <Col md={6} className="mx-auto">
                <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
                    <h1 className="h3 text-center">Agendamiento diario</h1>
                    <Card.Body className="my-4">
                        <FormSchedulePeople action="add" />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
