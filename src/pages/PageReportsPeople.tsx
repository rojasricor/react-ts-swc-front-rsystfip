import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ActionerReports from "../components/ActionerReports";

export default function PageReportsPeople(): React.JSX.Element {
    useEffect(() => {
        document.title = "RSystfip | Generate reports";
    }, []);

    return (
        <Row>
            <Col md={12}>
                <h1 className="h3">Reportes por mes</h1>
                <ActionerReports />
            </Col>
        </Row>
    );
}
