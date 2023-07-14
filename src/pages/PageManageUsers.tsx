import { Card, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import TableUsers from "../components/TableUsers";

export default function PageManageUsers(): React.JSX.Element {
    return (
        <Row>
            <Helmet>
                <title>RSystfip | Manage users</title>
            </Helmet>
            <Col md={6} className="mx-auto">
                <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
                    <h1 className="h3 text-center">Administrar usuarios</h1>
                    <Card.Body className="my-4">
                        <Col md={12} className="my-5">
                            <Link to="add" className="btn btn-primary">
                                Registrar <FaUserPlus className="mb-1" />
                            </Link>
                        </Col>
                        <TableUsers />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
