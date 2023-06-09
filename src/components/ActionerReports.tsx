import { useEffect, useState } from "react";
import api from "../api";
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

export default function ActionerReports(): React.JSX.Element {
    const dispatch = useAppDispatch();

    const reportsOrigenState: Reports[] = useAppSelector(
        ({ reports }) => reports.reportsOrigen
    );
    const queryDataState: QueryData = useAppSelector(
        ({ reports }) => reports.queryData
    );
    const [errorReports, setErrorReports] = useState<boolean>(false);

    const getReports = async (): Promise<void> => {
        try {
            const { data } = await api("/reports", {
                params: {
                    start: queryDataState.startDate,
                    end: queryDataState.endDate,
                },
            });

            filterReports(data);
            dispatch(setReportsOrigen(data));
        } catch (error: any) {
            notify(error.response.data.error, { type: "error" });
            setErrorReports(true);
        }
    };

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
        getReports();
    }, []);

    useEffect(() => {
        getReports();
    }, [queryDataState.startDate, queryDataState.endDate]);

    useEffect(() => {
        filterReports();
    }, [queryDataState.category]);

    return (
        <>
            <DaterReports errorReports={errorReports} />
            <TableReports />
        </>
    );
}
