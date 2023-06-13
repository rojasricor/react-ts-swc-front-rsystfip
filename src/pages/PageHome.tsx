import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import UserLoggedInfo from "../components/UserLoggedInfo";
import ProtectedElement from "../components/ProtectedElement";
import { FaUserPlus } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";

const PageHome = ({ permissions }) => {
  useEffect(() => {
    document.title = "RSystfip | Home";
  }, []);

  return (
    <Row>
      <Col md={12}>
        <UserLoggedInfo />
        <ProtectedElement isAllowed={permissions.includes("add")}>
          <Link
            to="/people/add"
            className="btn btn-primary m-1"
            title="Agendamiento por día"
          >
            Diario <FaUserPlus className="mb-1" />
          </Link>
        </ProtectedElement>
        <Link
          to="/people/schedule"
          className="btn btn-primary m-1"
          title="Agendamiento programado"
        >
          Programar <IoCalendarNumber className="mb-1" />
        </Link>
      </Col>
    </Row>
  );
};

export default PageHome;
