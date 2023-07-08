import { Button, Col } from "react-bootstrap";

interface IProps {
    children: React.JSX.Element;
    loading: boolean;
}

export default function Submitter({
    children,
    loading,
}: IProps): React.JSX.Element {
    return (
        <Col md={6}>
            <Button className="my-2" disabled={loading} type="submit">
                {children}
            </Button>
        </Col>
    );
}
