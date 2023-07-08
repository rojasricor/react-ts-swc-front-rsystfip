import { useEffect } from "react";
import { Row } from "react-bootstrap";
import RecoveryPassword from "../components/RecoveryPassword";

export default function PageRecoveryPassword(): React.JSX.Element {
    useEffect(() => {
        document.title = "RSystfip | I forget my password";
    }, []);

    return (
        <Row>
            <RecoveryPassword />
        </Row>
    );
}
