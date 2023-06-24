import { Navbar, Container, Image } from "react-bootstrap";
import NavMenu from "./NavMenu";
import { srcUser } from "../App";
import { Link } from "react-router-dom";

const NavBar = ({ avatar, permissions }: srcUser): React.JSX.Element => (
  <Navbar expand="lg" bg="light" fixed="top">
    <Container fluid>
      <Navbar.Brand className="px-lg-3">
        <Link to="/">
          <Image src="/rsystfip.svg" alt="Rsystfip" width="40" height="32" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <NavMenu permissions={permissions} avatar={avatar} />
    </Container>
  </Navbar>
);

export default NavBar;
