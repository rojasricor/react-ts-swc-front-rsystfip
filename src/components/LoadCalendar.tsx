import { Spinner } from "react-bootstrap";

interface IProps {
  loadEventsRef: React.RefObject<HTMLDivElement>;
}

const LoadCalendar = ({ loadEventsRef }: IProps): React.JSX.Element => (
  <div className="load-events" ref={loadEventsRef}>
    Cargando <Spinner size="sm" />
  </div>
);

export default LoadCalendar;
