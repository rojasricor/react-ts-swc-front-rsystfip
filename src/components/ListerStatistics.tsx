import Listgroup from "./Listgroup";
import { PropsStatistics } from "./Statistics";
import { useAppSelector } from "../hooks";

const ListerStatistics = ({
  scheduling_type,
}: PropsStatistics): React.JSX.Element => {
  const mostAgendatedOnRangeState = useAppSelector(({ statistics }) =>
    scheduling_type === "daily"
      ? statistics.daily.mostAgendatedOnRange
      : statistics.scheduled.mostAgendatedOnRange
  );
  const mostAgendatedAllTimeState = useAppSelector(({ statistics }) =>
    scheduling_type === "daily"
      ? statistics.daily.mostAgendatedAllTime
      : statistics.scheduled.mostAgendatedAllTime
  );
  const queryDataState = useAppSelector(({ statistics }) =>
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
