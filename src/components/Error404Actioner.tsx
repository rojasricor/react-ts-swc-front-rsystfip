import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Error404Actioner = () => {
  const navigate = useNavigate();

  return (
    <div className="d-grid d-sm-flex justify-content-sm-center">
      <Button
        variant="outline-secondary"
        onClick={() => navigate(-1)}
        className="px-4"
      >
        Regresar
      </Button>
    </div>
  );
};

export default Error404Actioner;
