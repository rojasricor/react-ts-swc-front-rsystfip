import { useState, useRef } from "react";
import Responsive from "./Responsive";
import LoadCalendar from "./LoadCalendar";
import ModalSchedulePeopleForm from "./ModalSchedulePeopleForm";
import ModalCancellPersonConfirmation from "./ModalCancellPersonConfirmation";
import Notify from "./Notify";
import FullCalendar from "@fullcalendar/react";
import esLocale from "@fullcalendar/core/locales/es";
import { formatTodaysDate, formatTodaysDateTime } from "../libs/timeFormatter";
import { API_ROUTE } from "../constants";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import {
  FormDataState,
  setFormData,
} from "../features/programming/programmingSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { globalPlugins } from "fullcalendar";

interface IProps {
  right: string;
  initialView: string;
}

const FullCalendarScheduling = ({
  right,
  initialView,
}: IProps): React.JSX.Element => {
  const action: string = "schedule";

  const formDataState: FormDataState = useAppSelector(
    ({ programming }) => programming.formData.schedule
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
          select={({ view: { calendar, type }, start, end }): void => {
            if ("dayGridMonth" === type) return;

            const now = new Date();
            if (start < now) {
              calendar.unselect();
              toast.warn("No se puede agendar en una fecha que ya ha pasado.");
              return;
            }

            if (
              start.getHours() < 6 ||
              end.getHours() > 21 ||
              end.getHours() === 0
            ) {
              // The selection is out of allow range, cancel
              calendar.unselect();
              toast.warn("Agendamientos no disponible en ese horario.");
              return;
            }

            showModalScheduling();

            dispatch(
              setFormData([
                action,
                {
                  ...formDataState,
                  date: formatTodaysDate(start),
                  start: formatTodaysDateTime(start),
                  end: formatTodaysDateTime(end),
                  status: "scheduled",
                },
              ])
            );
          }}
          eventClick={({ event: { id, start } }): void => {
            showModalCancell();

            dispatch(
              setFormData([
                action,
                {
                  ...formDataState,
                  eventId: id,
                  date: formatTodaysDateTime(start as Date),
                },
              ])
            );
          }}
          editable
          dayMaxEvents
          events={{
            url: `${API_ROUTE}/scheduling`,
            failure: (): void => {
              toast.error("Error al obtener los agendamientos");
            },
          }}
          eventOrder="-start"
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
          }}
          loading={(state: boolean): void => {
            if (loadEventsRef.current)
              loadEventsRef.current.style.display = state ? "block" : "none";
          }}
          initialView={initialView}
          plugins={globalPlugins}
        />
      </Container>
      <p className="text-center mt-2">Scheduled scheduling month to month.</p>
      <Notify />
    </Responsive>
  );
};

export default FullCalendarScheduling;
