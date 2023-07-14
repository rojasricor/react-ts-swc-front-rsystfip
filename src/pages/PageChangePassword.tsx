import { Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import FetcherDataForChangePsw from "../components/FetcherDataForChangePsw";

export default function PageChangePassword(): React.JSX.Element {
    return (
        <Row>
            <Helmet>
                <title>RSystfip | Change password users</title>
            </Helmet>
            <FetcherDataForChangePsw />
        </Row>
    );
}
