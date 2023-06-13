import { useEffect } from "react";
import { Row } from "react-bootstrap";
import FetcherDataForChangePsw from "../components/FetcherDataForChangePsw";
import Notify from "../components/Notify";

const PageChangePassword = () => {
  useEffect(() => {
    document.title = "RSystfip | Change password users";
  }, []);

  return (
    <Row>
      <FetcherDataForChangePsw />
      <Notify />
    </Row>
  );
};

export default PageChangePassword;
