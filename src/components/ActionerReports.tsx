import { useEffect } from "react";
import { UNSET_STATUS } from "../constants";
import {
    QueryData,
    Reports,
    setReports,
    setReportsOrigen,
} from "../features/reports/reportsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { notify } from "../libs/toast";
import DaterReports from "./DaterReports";
import TableReports from "./TableReports";
import { useQuery } from "react-query";
import * as reportService from "../services/report.service";

export default function ActionerReports(): React.JSX.Element {
    const dispatch = useAppDispatch();

    const reportsOrigenState: Reports[] = useAppSelector(
        ({ reports }) => reports.reportsOrigen
    );
    const queryDataState: QueryData = useAppSelector(
        ({ reports }) => reports.queryData
    );

    const { data, error, isError } = useQuery<[], any>(
        ["reports", queryDataState.startDate, queryDataState.endDate],
        () => reportService.getReports(queryDataState)
    );

    const filterReports = (dataToFilter = reportsOrigenState) => {
        dispatch(
            setReports(
                queryDataState.category !== UNSET_STATUS
                    ? dataToFilter.filter(
                          ({ id_person }) =>
                              id_person.toString() === queryDataState.category
                      )
                    : dataToFilter
            )
        );
    };

    useEffect(() => {
        if (data) {
            filterReports(data);
            dispatch(setReportsOrigen(data));
        }
        if (error) notify(error.response.data.error, { type: "error" });
    }, [data, error]);

    useEffect(() => {
        filterReports();
    }, [queryDataState.category]);

    return (
        <>
            <DaterReports errorReports={isError} />
            <TableReports />
        </>
    );
}
