import { Col, Button } from "react-bootstrap";

interface IProps {
  children: React.JSX.Element;
  loading: boolean;
}

const Submitter = ({ children, loading }: IProps): React.JSX.Element => (
  <Col md={6}>
    <Button className="my-2" disabled={loading} type="submit">
      {children}
    </Button>
  </Col>
);

export default Submitter;
