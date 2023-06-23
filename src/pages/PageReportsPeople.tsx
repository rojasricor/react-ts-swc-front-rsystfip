import { useEffect } from "react";
import ActionerReports from "../components/ActionerReports";
import { Col, Row } from "react-bootstrap";

const PageReportsPeople = (): React.JSX.Element => {
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
};

export default PageReportsPeople;
