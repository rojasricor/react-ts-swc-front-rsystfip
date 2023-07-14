import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import TableCancelled from "../components/TableCancelled";

export default function PageCancelledPeople(): React.JSX.Element {
    return (
        <Row>
            <Helmet>
                <title>RSystfip | Cancelled people</title>
            </Helmet>
            <Col md={12}>
                <h1 className="h3">Citas canceladas</h1>
                <TableCancelled />
            </Col>
        </Row>
    );
}
