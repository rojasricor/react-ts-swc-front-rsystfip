import { Spinner } from "react-bootstrap";

const LoadCalendar = ({ loadEventsRef }) => (
  <div className="load-events" ref={loadEventsRef}>
    Cargando <Spinner size="sm" />
  </div>
);

export default LoadCalendar;
