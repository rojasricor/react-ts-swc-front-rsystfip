import { useState, useRef } from "react";
import Responsive from "./Responsive";
import LoadCalendar from "./LoadCalendar";
import ModalSchedulePeopleForm from "./ModalSchedulePeopleForm";
import ModalCancellPersonConfirmation from "./ModalCancellPersonConfirmation";
import Notify from "./Notify";
import FullCalendar from "@fullcalendar/react";
import daygrid from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import { formatTodaysDate, formatTodaysDateTime } from "../libs/todaylib";
import { globalLocales } from "fullcalendar";
import { API_ROUTE } from "../constants";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../features/programming/programmingSlice";

const FullCalendarScheduling = ({ right, initialView }) => {
  const action = "schedule";

  const formDataState = useSelector(
    ({ programming }) => programming.formData.schedule
  );

  const dispatch = useDispatch();

  // Modal states
  const [stateModalCancell, setStateModalCancell] = useState(false);
  const [stateModalScheduling, setStateModalScheduling] = useState(false);

  // Modal methods
  const closeModalCancell = () => setStateModalCancell(false);
  const showModalCancell = () => setStateModalCancell(true);
  const closeModalScheduling = () => setStateModalScheduling(false);
  const showModalScheduling = () => setStateModalScheduling(true);

  const loadEventsRef = useRef(null);

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
            left: "prevYear,prev,next,nextYear today",
            center: "title",
            right,
          }}
          locales={[esLocale, globalLocales]}
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
              return toast.warn(
                "No se puede agendar en una fecha que ya ha pasado."
              );
            }

            if (
              start.getHours() < 6 ||
              end.getHours() > 21 ||
              end.getHours() === 0
            ) {
              // The selection is out of allow range, cancel
              calendar.unselect();
              return toast.warn("Agendamientos no disponible en ese horario.");
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
          eventClick={({ event: { id, start } }) => {
            showModalCancell();

            dispatch(
              setFormData([
                action,
                {
                  ...formDataState,
                  eventId: id,
                  date: formatTodaysDateTime(start),
                },
              ])
            );
          }}
          editable
          dayMaxEvents
          events={{
            url: `${API_ROUTE}/scheduling`,
            failure: () => toast.error("Error al obtener los agendamientos"),
          }}
          eventOrder="-start"
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
          }}
          loading={(state) =>
            (loadEventsRef.current.style.display = state ? "block" : "none")
          }
          plugins={[daygrid]}
          initialView={initialView}
        />
      </Container>
      <p className="text-center mt-2">Scheduled scheduling month to month.</p>
      <Notify />
    </Responsive>
  );
};

export default FullCalendarScheduling;
