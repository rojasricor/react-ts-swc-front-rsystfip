import { Navbar, Container, Image } from "react-bootstrap";
import NavMenu from "./NavMenu";
import { srcUser } from "../App";

interface IProps extends srcUser {}

const NavBar = ({ avatar, permissions }: IProps): React.JSX.Element => (
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
