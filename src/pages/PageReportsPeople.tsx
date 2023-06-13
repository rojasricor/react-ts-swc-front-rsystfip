import { useEffect } from "react";
import ActionerReports from "../components/ActionerReports";
import { Col, Row } from "react-bootstrap";
import Notify from "../components/Notify";

const PageReportsPeople = () => {
  useEffect(() => {
    document.title = "RSystfip | Generate reports";
  }, []);

  return (
    <Row>
      <Col md={12}>
        <h1 className="h3">Reportes por mes</h1>
        <ActionerReports />
        <Notify />
      </Col>
    </Row>
  );
};

export default PageReportsPeople;
