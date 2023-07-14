import { Helmet } from "react-helmet";
import FullCalendarScheduling from "../components/FullCalendarScheduling";

export default function PageProgramming(): React.JSX.Element {
    return (
        <>
            <Helmet>
                <title>RSystfip | Programming scheduling</title>
            </Helmet>
            <h1 className="h3">Agendamiento programado</h1>
            <FullCalendarScheduling
                right="timeGridDay,timeGridWeek"
                initialView="timeGridDay"
            />
        </>
    );
}
