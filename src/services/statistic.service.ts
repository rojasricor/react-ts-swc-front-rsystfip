import api from "./api.service";
import { QueryData } from "../features/statistics/statisticsSlice";

export const getStatistics = async (
    scheduling_type: string,
    { start, end }: QueryData
) => {
    const { data } = await api(`/statistics/${scheduling_type}`, {
        params: { start, end },
    });
    return data;
};

export const getMostAgendatedOnRange = async (
    scheduling_type: string,
    { start, end }: QueryData
) => {
    const { data } = await api(`/statistics/onrange/${scheduling_type}`, {
        params: { start, end },
    });
    return data;
};

export const getMostAgendatedAllTime = async (scheduling_type: string) => {
    const { data } = await api(`/statistics/alltime/${scheduling_type}`);
    return data;
};
