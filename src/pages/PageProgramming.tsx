import { useEffect } from "react";
import FullCalendarScheduling from "../components/FullCalendarScheduling";

export default function PageProgramming(): React.JSX.Element {
    useEffect(() => {
        document.title = "RSystfip | Programming scheduling";
    }, []);

    return (
        <>
            <h1 className="h3">Agendamiento programado</h1>
            <FullCalendarScheduling
                right="timeGridDay,timeGridWeek"
                initialView="timeGridDay"
            />
        </>
    );
}
