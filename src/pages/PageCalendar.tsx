import { Helmet } from "react-helmet";
import FullCalendarScheduling from "../components/FullCalendarScheduling";

export default function PageCalendar(): React.JSX.Element {
    return (
        <>
            <Helmet>
                <title>RSystfip | People in calendar</title>
            </Helmet>
            <h1 className="h3">Ver agendamientos programados</h1>
            <FullCalendarScheduling
                right="listMonth,dayGridMonth"
                initialView="listMonth"
            />
        </>
    );
}
