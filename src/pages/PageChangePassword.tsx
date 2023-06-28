import { useEffect } from "react";
import { Row } from "react-bootstrap";
import FetcherDataForChangePsw from "../components/FetcherDataForChangePsw";

export default function PageChangePassword(): React.JSX.Element {
  useEffect(() => {
    document.title = "RSystfip | Change password users";
  }, []);

  return (
    <Row>
      <FetcherDataForChangePsw />
    </Row>
  );
}
