import { useSelector } from "react-redux";
import Listgroup from "./Listgroup";

const ListerStatistics = ({ scheduling_type }) => {
  const mostAgendatedOnRangeState = useSelector(({ statistics }) =>
    scheduling_type === "daily"
      ? statistics.daily.mostAgendatedOnRange
      : statistics.scheduled.mostAgendatedOnRange
  );
  const mostAgendatedAllTimeState = useSelector(({ statistics }) =>
    scheduling_type === "daily"
      ? statistics.daily.mostAgendatedAllTime
      : statistics.scheduled.mostAgendatedAllTime
  );
  const queryDataState = useSelector(({ statistics }) =>
    scheduling_type === "daily"
      ? statistics.daily.queryData
      : statistics.scheduled.queryData
  );

  return (
    <>
      <Listgroup
        title={`Agendamiento ${scheduling_type} en el rango de fecha`}
        data={mostAgendatedOnRangeState}
        end={queryDataState.end}
      />

      <Listgroup
        title={`Agendamiento ${scheduling_type} en todas las fechas`}
        data={mostAgendatedAllTimeState}
        end={queryDataState.end}
      />
    </>
  );
};

export default ListerStatistics;
