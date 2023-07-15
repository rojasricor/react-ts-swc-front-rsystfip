import { useEffect } from "react";
import { UseQueryResult, useQueries } from "react-query";
import { setPeople, setPeopleOrigen } from "../features/people/peopleSlice";
import {
    QueryData,
    setPngBase64,
    setReportsCountAllTime,
    setReportsCountOnRange,
} from "../features/reports/reportsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { notify } from "../libs/toast";
import * as peopleService from "../services/people.service";
import * as reportService from "../services/report.service";
import * as resService from "../services/res.service";
import PdfCreator from "./PdfCreator";

interface IProps {
    errorReports: boolean;
}

export default function FetcherReports({
    errorReports,
}: IProps): React.JSX.Element {
    const dispatch = useAppDispatch();

    const queryDataState: QueryData = useAppSelector(
        ({ reports }) => reports.queryData
    );

    const queries = useQueries([
        {
            queryKey: "people",
            queryFn: peopleService.getPeople,
            refetchOnWindowFocus: false,
        },
        {
            queryKey: "reportsAllTime",
            queryFn: reportService.getReportsCountAlltime,
            refetchOnWindowFocus: false,
        },
        {
            queryKey: [
                "reportsOnRange",
                queryDataState.startDate,
                queryDataState.endDate,
            ],
            queryFn: () => reportService.getReportsCountOnRange(queryDataState),
            refetchOnWindowFocus: false,
        },
        {
            queryKey: "pngBase64",
            queryFn: resService.getPngbase64,
            refetchOnWindowFocus: false,
        },
    ]);

    useEffect(
        () => {
            for (let i = 0; i < queries.length; i++) {
                const { data, error } = queries[i] as UseQueryResult<any, any>;

                if (data) {
                    if (i === 0) {
                        dispatch(setPeople(data));
                        dispatch(setPeopleOrigen(data));
                    } else if (i === 1) {
                        dispatch(setReportsCountAllTime(data));
                    } else if (i === 2) {
                        dispatch(setReportsCountOnRange(data));
                    } else if (i === 3) {
                        const reader = new FileReader();
                        reader.readAsDataURL(data);
                        reader.addEventListener("load", () => {
                            if (reader.result) {
                                dispatch(setPngBase64(reader.result as string));
                            }
                        });
                    }
                }

                if (error) {
                    notify(error.response.data.error, { type: "error" });
                }
            }
        },
        queries.flatMap(({ data, error }) => [data, error])
    );

    return <PdfCreator errorReports={errorReports} />;
}
