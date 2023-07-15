import api from "./api.service";
import { QueryData } from "../features/reports/reportsSlice";

export const getReports = async (queryDataState: QueryData) => {
    const { data } = await api("/reports", {
        params: {
            start: queryDataState.startDate,
            end: queryDataState.endDate,
        },
    });
    return data;
};

export const getReportsCountAlltime = async () => {
    const { data } = await api("/reports/counts");
    return data;
};

export const getReportsCountOnRange = async ({
    startDate,
    endDate,
}: QueryData) => {
    const { data } = await api("/reports/count", {
        params: { start: startDate, end: endDate },
    });
    return data;
};
