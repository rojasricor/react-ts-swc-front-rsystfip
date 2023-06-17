import { Col, Button } from "react-bootstrap";

interface Props {
  children: React.JSX.Element;
  loading: boolean;
}

const Submitter = ({ children, loading }: Props): React.JSX.Element => (
  <Col md={6}>
    <Button className="my-2" disabled={loading} type="submit">
      {children}
    </Button>
  </Col>
);

export default Submitter;
