import { QueryData } from "../features/statistics/statisticsSlice";
import { useAppSelector } from "../hooks";
import { ICounts } from "../interfaces/ICounts";
import Listgroup from "./Listgroup";
import { IProps } from "./Statistics";

export default function ListerStatistics({
    scheduling_type,
}: IProps): React.JSX.Element {
    const mostAgendatedOnRangeState: ICounts[] = useAppSelector(
        ({ statistics }) => statistics[scheduling_type].mostAgendatedOnRange
    );
    const mostAgendatedAllTimeState: ICounts[] = useAppSelector(
        ({ statistics }) => statistics[scheduling_type].mostAgendatedAllTime
    );
    const queryDataState: QueryData = useAppSelector(
        ({ statistics }) => statistics[scheduling_type].queryData
    );

    const titleText: string =
        scheduling_type === "daily" ? "diario" : "programado";

    return (
        <>
            <Listgroup
                title={`Agendamiento ${titleText} en el rango de fecha`}
                data={mostAgendatedOnRangeState}
                end={queryDataState.end}
            />

            <Listgroup
                title={`Agendamiento ${titleText} en todas las fechas`}
                data={mostAgendatedAllTimeState}
                end={queryDataState.end}
            />
        </>
    );
}
