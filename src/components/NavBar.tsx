import { Container, Image, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";

export interface srcUser {
    avatar: string;
    permissions: string[];
}

export default function NavBar({
    avatar,
    permissions,
}: srcUser): React.JSX.Element {
    return (
        <Navbar expand="lg" bg="light" fixed="top">
            <Container fluid>
                <Navbar.Brand className="px-lg-3">
                    <Link to="/">
                        <Image
                            src="/rsystfip.svg"
                            alt="Rsystfip"
                            width="40"
                            height="32"
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <NavMenu permissions={permissions} avatar={avatar} />
            </Container>
        </Navbar>
    );
}
