import { useEffect } from "react";
import { Row } from "react-bootstrap";
import RecoveryLinkPassword from "../components/RecoveryLinkPassword";

export default function PageLinkRecoveryPsw(): React.JSX.Element {
    useEffect(() => {
        document.title = "RSystfip | Recover my password";
    }, []);

    return (
        <Row>
            <RecoveryLinkPassword />
        </Row>
    );
}
