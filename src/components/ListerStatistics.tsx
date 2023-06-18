import Listgroup from "./Listgroup";
import { IProps } from "./Statistics";
import { useAppSelector } from "../hooks";
import { ICounts } from "../interfaces/ICounts";
import { QueryData } from "../features/statistics/statisticsSlice";

const ListerStatistics = ({ scheduling_type }: IProps): React.JSX.Element => {
  const mostAgendatedOnRangeState: ICounts[] = useAppSelector(
    ({ statistics }) =>
      scheduling_type === "daily"
        ? statistics.daily.mostAgendatedOnRange
        : statistics.scheduled.mostAgendatedOnRange
  );
  const mostAgendatedAllTimeState: ICounts[] = useAppSelector(
    ({ statistics }) =>
      scheduling_type === "daily"
        ? statistics.daily.mostAgendatedAllTime
        : statistics.scheduled.mostAgendatedAllTime
  );
  const queryDataState: QueryData = useAppSelector(({ statistics }) =>
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
