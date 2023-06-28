import { Button } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Error404Actioner(): React.JSX.Element {
  const navigate: NavigateFunction = useNavigate();

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
}
