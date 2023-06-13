import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import TableUsers from "../components/TableUsers";
import Notify from "../components/Notify";
import { FaUserPlus } from "react-icons/fa";

const PageManageUsers = () => {
  useEffect(() => {
    document.title = "RSystfip | Manage users";
  }, []);

  return (
    <Row>
      <Col md={6} className="mx-auto">
        <Card className="py-2">
          <h1 className="h3 text-center">Administrar usuarios</h1>
          <Card.Body>
            <Col md={12}>
              <Link to="add" className="btn btn-primary my-4">
                Registrar <FaUserPlus className="mb-1" />
              </Link>
            </Col>
            <TableUsers />
          </Card.Body>
        </Card>
      </Col>
      <Notify />
    </Row>
  );
};

export default PageManageUsers;
