import { useEffect } from "react";
import FullCalendarScheduling from "../components/FullCalendarScheduling";

export default function PageCalendar(): React.JSX.Element {
    useEffect(() => {
        document.title = "RSystfip | People in calendar";
    }, []);

    return (
        <>
            <h1 className="h3">Ver agendamientos programados</h1>
            <FullCalendarScheduling
                right="listMonth,dayGridMonth"
                initialView="listMonth"
            />
        </>
    );
}
