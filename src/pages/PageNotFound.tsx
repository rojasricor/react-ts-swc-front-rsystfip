import { Col, Container, Image, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Error404Actioner from "../components/Error404Actioner";

export default function PageNotFound(): React.JSX.Element {
    return (
        <Container className="px-4 py-5 my-5 text-center">
            <Helmet>
                <title>RSystfip | Not found</title>
            </Helmet>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Image
                        src="/rsystfip.svg"
                        alt="Rsystfip"
                        width={72}
                        height={57}
                        className="mb-4"
                    />
                    <h1 className="display-5 fw-bold">Error 404</h1>
                    <p className="lead mb-4">Not Found.</p>
                    <Error404Actioner />
                </Col>
            </Row>
        </Container>
    );
}
