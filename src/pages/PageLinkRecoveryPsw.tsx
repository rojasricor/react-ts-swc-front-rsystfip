import { useEffect } from "react";
import { Row } from "react-bootstrap";
import RecoveryLinkPassword from "../components/RecoveryLinkPassword";
import Notify from "../components/Notify";

const PageLinkRecoveryPsw = () => {
  useEffect(() => {
    document.title = "RSystfip | Recover my password";
  }, []);

  return (
    <Row>
      <RecoveryLinkPassword />
      <Notify />
    </Row>
  );
};

export default PageLinkRecoveryPsw;
