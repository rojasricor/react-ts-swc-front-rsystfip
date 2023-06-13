import { Col, Button } from "react-bootstrap";

const Submitter = ({ children, loading }) => (
  <Col md={6}>
    <Button className="my-2" disabled={loading} type="submit">
      {children}
    </Button>
  </Col>
);

export default Submitter;
