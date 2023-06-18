import { useNavigate } from "react-router-dom";
import ProtectedElement from "./ProtectedElement";
import { Button, Spinner, Col } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { useAppSelector } from "../hooks";
import { THandleClick } from "../types/THandleClicks";
import React from "react";

interface IProps {
  isAllowed: boolean;
}

const FooterFormPeople = ({ isAllowed }: IProps): React.JSX.Element => {
  const isLoadingState = useAppSelector(
    ({ programming }) => programming.isLoading
  );

  const navigate = useNavigate();

  const handleClick = (e: THandleClick) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <Col md={12}>
      <Button className="m-1" disabled={isLoadingState} type="submit">
        {!isLoadingState ? (
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
};

export default FooterFormPeople;
