import { Col, Container, Image, Nav } from "react-bootstrap";
import { FaCodeBranch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer(): React.JSX.Element {
    return (
        <Container fluid className="py-4 my-4">
            <footer className="d-flex flex-wrap justify-content-between align-items-center">
                <Col md={4} className="mb-0 text-body-secondary">
                    © 2023 Tecnología en gestión informatica
                    <FaCodeBranch className="mb-1" />
                </Col>

                <Col md={4}>
                    <Link
                        to="/"
                        className="d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
                    >
                        <Image
                            src="/rsystfip.svg"
                            alt="Rsystfip"
                            width="40"
                            height="32"
                        />
                    </Link>
                </Col>

                <Col md={4}>
                    <Nav className="justify-content-end">
                        <Nav.Item>
                            <Link
                                to="/home/welcome"
                                className="nav-link px-2 text-body-secondary"
                            >
                                Inicio
                            </Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Link
                                to="/help/asks/frecuently"
                                className="nav-link px-2 text-body-secondary"
                            >
                                FAQs
                            </Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link
                                href="#"
                                className="px-2 text-body-secondary"
                            >
                                Acerca de
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Link
                                to="/forget/my/password"
                                className="nav-link px-2 text-body-secondary"
                            >
                                Olvidó su contraseña?
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </footer>
        </Container>
    );
}
