import { Container, Image, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { srcUser } from "../App";
import NavMenu from "./NavMenu";

export default function NavBar({
  avatar,
  permissions,
}: srcUser): React.JSX.Element {
  return (
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
}
