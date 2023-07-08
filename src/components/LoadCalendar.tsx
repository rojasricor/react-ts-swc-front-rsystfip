import { Spinner } from "react-bootstrap";

interface IProps {
    loadEventsRef: React.RefObject<HTMLDivElement>;
}

export default function LoadCalendar({
    loadEventsRef,
}: IProps): React.JSX.Element {
    return (
        <div className="load-events" ref={loadEventsRef}>
            Cargando <Spinner size="sm" />
        </div>
    );
}
