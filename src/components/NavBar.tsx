import { Navbar, Container, Image } from "react-bootstrap";

import NavMenu from "./NavMenu";

const NavBar = ({ avatar, permissions }) => (
  <Navbar expand="lg" bg="light" fixed="top">
    <Container fluid>
      <Navbar.Brand className="px-lg-3">
        <Image src="/rsystfip.svg" alt="Rsystfip" width="40" height="32" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <NavMenu permissions={permissions} avatar={avatar} />
    </Container>
  </Navbar>
);

export default NavBar;
