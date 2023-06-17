import { Spinner } from "react-bootstrap";

interface Props {
  loadEventsRef: React.RefObject<HTMLDivElement>;
}

const LoadCalendar = ({ loadEventsRef }: Props): React.JSX.Element => (
  <div className="load-events" ref={loadEventsRef}>
    Cargando <Spinner size="sm" />
  </div>
);

export default LoadCalendar;
