import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Searcher from "../components/Searcher";

export default function PageAgendatedPeople(): React.JSX.Element {
    return (
        <Row>
            <Helmet>
                <title>RSystfip | Agendated People</title>
            </Helmet>
            <Col md={12}>
                <h1 className="h3">Personas agendadas</h1>
                <Searcher />
            </Col>
        </Row>
    );
}
