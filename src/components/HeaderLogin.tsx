import { Card, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HeaderLogin(): React.JSX.Element {
  return (
    <Container className="text-center mt-2">
      <Link to="/">
        <Image src="/rsystfip.svg" width="72" height="57" alt="rsystfip" />
      </Link>
      <h1 className="h6 mt-3">RSYSTFIP</h1>
      <Card className="border-0 m-5">
        <Card.Body>
          <Card.Text>
            Sóftware para agendamiento de visitas Rectoría -{" "}
            <strong>ITFIP</strong>
          </Card.Text>
          <Link to="https://www.itfip.edu.co">
            <Image
              src="/img/admin/avatar.png"
              height="55"
              width="55"
              alt="itfip"
            />
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
