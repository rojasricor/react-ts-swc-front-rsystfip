import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import ProtectedElement from "./ProtectedElement";
import NavLogoutDropdown from "./NavLogoutDropdown";

const NavMenu = ({ permissions, avatar }) => (
  <Navbar.Collapse id="rs-nav">
    <Nav className="me-auto">
      <Nav.Item>
        <NavLink to="/home/welcome" className="nav-link">
          Inicio
        </NavLink>
      </Nav.Item>
      <ProtectedElement isAllowed={permissions.includes("admin")}>
        <Nav.Item>
          <NavLink
            to="/users/manage"
            className="nav-link"
            title="Pánel de administración de usuarios"
          >
            Usuarios
          </NavLink>
        </Nav.Item>
      </ProtectedElement>
      <NavDropdown title="Agendamiento">
        <ProtectedElement isAllowed={permissions.includes("add")}>
          <NavLink
            to="/people/add"
            className="dropdown-item"
            title="Agendar una persona inmediatamente"
          >
            Agendamiento diario
          </NavLink>
        </ProtectedElement>

        <ProtectedElement isAllowed={permissions.includes("schedule")}>
          <NavLink
            to="/people/schedule"
            className="dropdown-item"
            title="Agendar una persona en el calendario"
          >
            Agend. programado
          </NavLink>
        </ProtectedElement>
      </NavDropdown>
      <ProtectedElement isAllowed={permissions.includes("schedule")}>
        <Nav.Item>
          <NavLink
            to="/people/preview"
            className="nav-link"
            title="Ver agendamientos en el calendario"
          >
            Ver Eventos
          </NavLink>
        </Nav.Item>
      </ProtectedElement>
      <ProtectedElement isAllowed={permissions.includes("statistics")}>
        <NavDropdown title="Estadísticas">
          <NavLink
            to="/people/statistics/daily"
            className="dropdown-item"
            title="Generar estadísticas de agendamiento diario"
          >
            Agendamiento diario
          </NavLink>

          <NavLink
            to="/people/statistics/scheduled"
            className="dropdown-item"
            title="Generar estadísticas de agendamiento diario"
          >
            Agend. programado
          </NavLink>
        </NavDropdown>
      </ProtectedElement>
      <NavDropdown title="Reportes & Historial">
        <NavLink
          to="/people/view"
          className="dropdown-item"
          title="Listado de todas las personas agendadas"
        >
          Historial personas
        </NavLink>

        <ProtectedElement isAllowed={permissions.includes("reports")}>
          <NavLink
            to="/people/reports"
            className="dropdown-item"
            title="Generar reportes"
          >
            Generar reportes
          </NavLink>
        </ProtectedElement>

        <NavLink
          to="/people/cancelled"
          className="dropdown-item"
          title="Listado de todas las citas canceladas"
        >
          Citas canceladas
        </NavLink>
      </NavDropdown>

      <Nav.Item>
        <NavLink
          to="/help/asks/frecuently"
          className="nav-link"
          title="Preguntas y respuestas más frecuentes"
        >
          FAQs
        </NavLink>
      </Nav.Item>
    </Nav>
    <NavLogoutDropdown avatar={avatar} />
  </Navbar.Collapse>
);

export default NavMenu;
