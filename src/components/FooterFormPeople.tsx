import { Button, Col, Spinner } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { THandleClick } from "../types/THandleClicks";
import ProtectedElement from "./ProtectedElement";

interface IProps {
    isAllowed: boolean;
    isLoading: boolean;
}

export default function FooterFormPeople({
    isAllowed,
    isLoading,
}: IProps): React.JSX.Element {
    const navigate: NavigateFunction = useNavigate();

    const handleClick = (e: THandleClick) => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <Col md={12}>
            <Button className="m-1" disabled={isLoading} type="submit">
                {!isLoading ? (
                    <>
                        Registrar <FaUserPlus className="mb-1" />
                    </>
                ) : (
                    <Spinner size="sm" />
                )}
            </Button>
            <ProtectedElement isAllowed={isAllowed}>
                <Button
                    variant="light"
                    onClick={handleClick}
                    className="m-1"
                    type="submit"
                >
                    Volver <GiReturnArrow />
                </Button>
            </ProtectedElement>
        </Col>
    );
}
