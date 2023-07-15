import esLocale from "@fullcalendar/core/locales/es";
import FullCalendar from "@fullcalendar/react";
import { format } from "date-fns";
import { EventSourceInput, globalPlugins } from "fullcalendar";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import {
    ICalendarState,
    setCalendarEvents,
} from "../features/calendar/calendarSlice";
import {
    FormDataState,
    setFormData,
} from "../features/programming/programmingSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { notify } from "../libs/toast";
import * as scheduleService from "../services/schedule.service";
import LoadCalendar from "./LoadCalendar";
import ModalCancellPersonConfirmation from "./ModalCancellPersonConfirmation";
import ModalSchedulePeopleForm from "./ModalSchedulePeopleForm";
import Responsive from "./Responsive";

interface IProps {
    right: string;
    initialView: string;
}

export default function FullCalendarScheduling({
    right,
    initialView,
}: IProps): React.JSX.Element {
    const action = "schedule";

    const formDataState: FormDataState = useAppSelector(
        ({ programming }) => programming.formData.schedule
    );
    const calendarEventsState: ICalendarState = useAppSelector(
        ({ calendar }) => calendar
    );

    const dispatch = useAppDispatch();

    // Modal states
    const [stateModalCancell, setStateModalCancell] = useState<boolean>(false);
    const [stateModalScheduling, setStateModalScheduling] =
        useState<boolean>(false);

    // Modal methods
    const closeModalCancell = (): void => setStateModalCancell(false);
    const showModalCancell = (): void => setStateModalCancell(true);
    const closeModalScheduling = (): void => setStateModalScheduling(false);
    const showModalScheduling = (): void => setStateModalScheduling(true);

    const loadEventsRef = useRef<HTMLDivElement>(null);

    const { data, error } = useQuery<[], any>(
        ["schedule", calendarEventsState.changes],
        scheduleService.getEvents
    );

    useEffect(() => {
        if (data) dispatch(setCalendarEvents(data));
        if (error) notify(error.response.data.error, { type: "error" });
    }, [data, error]);

    return (
        <Responsive>
            <LoadCalendar loadEventsRef={loadEventsRef} />
            <ModalSchedulePeopleForm
                stateModalScheduling={stateModalScheduling}
                closeModalScheduling={closeModalScheduling}
            />
            <ModalCancellPersonConfirmation
                stateModalCancell={stateModalCancell}
                closeModalCancell={closeModalCancell}
            />
            <Container fluid className="schg-sm lh-1">
                <FullCalendar
                    height="auto"
                    headerToolbar={{
                        left: "prevYear prev,next nextYear today",
                        center: "title",
                        right,
                    }}
                    locales={[esLocale]}
                    locale="es-us"
                    navLinks
                    nowIndicator
                    dayHeaders
                    weekends
                    dayHeaderFormat={{
                        weekday: "long",
                        day: "numeric",
                    }}
                    businessHours={{
                        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                        startTime: "06:00",
                        endTime: "22:00",
                    }}
                    weekNumbers
                    weekNumberCalculation="ISO"
                    selectable
                    selectMirror
                    select={({ view: { calendar, type }, start, end }) => {
                        if ("dayGridMonth" === type) return;

                        const now = new Date();
                        if (start < now) {
                            calendar.unselect();
                            return notify(
                                "No se puede agendar en una fecha que ya ha pasado.",
                                { type: "warning" }
                            );
                        }

                        if (
                            start.getHours() < 6 ||
                            end.getHours() > 21 ||
                            end.getHours() === 0
                        ) {
                            // The selection is out of allow range, cancel
                            calendar.unselect();
                            return notify(
                                "Agendamientos no disponible en ese horario.",
                                { type: "warning" }
                            );
                        }

                        showModalScheduling();

                        dispatch(
                            setFormData([
                                action,
                                {
                                    ...formDataState,
                                    date: format(start, "yyyy-MM-dd HH:mm:ss"),
                                    start: format(start, "yyyy-MM-dd HH:mm:ss"),
                                    end: format(end, "yyyy-MM-dd HH:mm:ss"),
                                    status: "scheduled",
                                },
                            ])
                        );
                    }}
                    eventClick={({ event: { id, start } }) => {
                        showModalCancell();

                        dispatch(
                            setFormData([
                                action,
                                {
                                    ...formDataState,
                                    eventId: id,
                                    date: format(
                                        start as Date,
                                        "yyyy-MM-dd HH:mm:ss"
                                    ),
                                },
                            ])
                        );
                    }}
                    editable
                    dayMaxEvents
                    events={
                        calendarEventsState.calendarEvents as EventSourceInput
                    }
                    eventOrder="-start"
                    eventTimeFormat={{
                        hour: "numeric",
                        minute: "2-digit",
                    }}
                    loading={(state: boolean) => {
                        if (loadEventsRef.current)
                            loadEventsRef.current.style.display = state
                                ? "block"
                                : "none";
                    }}
                    initialView={initialView}
                    plugins={globalPlugins}
                />
            </Container>
            <p className="text-center mt-2">
                Scheduled scheduling month to month.
            </p>
        </Responsive>
    );
}
