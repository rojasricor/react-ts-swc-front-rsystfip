import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICounts } from "../../interfaces/ICounts";
import { IKeyBool } from "../../interfaces/IKeyBool";
import { updateDataBySchedulingType } from "./functions";
import { endOfMonth, format } from "date-fns";

export interface QueryData {
    start: string;
    end: string;
    chartType: string;
}

export interface Data {
    mostAgendatedOnRange: ICounts[];
    mostAgendatedAllTime: ICounts[];
    queryData: QueryData;
}

export interface StatisticsState {
    daily: Data;
    scheduled: Data;
    [shcheduling_type: string]: Data;
}

export const validSchedulingTypes: IKeyBool = {
    daily: true,
    scheduled: true,
};

const queryDataInitialState: QueryData = {
    start: format(new Date(), "yyyy-MM-01"),
    end: format(endOfMonth(new Date()), "yyyy-MM-dd"),
    chartType: "bar",
};

const initialState: StatisticsState = {
    daily: {
        mostAgendatedOnRange: [],
        mostAgendatedAllTime: [],
        queryData: queryDataInitialState,
    },
    scheduled: {
        mostAgendatedOnRange: [],
        mostAgendatedAllTime: [],
        queryData: queryDataInitialState,
    },
};

const statisticsSlice = createSlice({
    name: "statistics",
    initialState,
    reducers: {
        setMostAgendatedOnRange: (
            state,
            {
                payload: [schedulingType, mostAgendatedOnRange],
            }: PayloadAction<[string, ICounts[]]>
        ): StatisticsState =>
            updateDataBySchedulingType(state, schedulingType, {
                mostAgendatedOnRange,
            }),
        setMostAgendatedAllTime: (
            state,
            {
                payload: [schedulingType, mostAgendatedAllTime],
            }: PayloadAction<[string, ICounts[]]>
        ): StatisticsState =>
            updateDataBySchedulingType(state, schedulingType, {
                mostAgendatedAllTime,
            }),
        setQueryData: (
            state,
            {
                payload: [schedulingType, queryData],
            }: PayloadAction<[string, QueryData]>
        ): StatisticsState =>
            updateDataBySchedulingType(state, schedulingType, { queryData }),
        resetQueryDataStatistics: (state): StatisticsState => ({
            ...state,
            daily: { ...state.daily, queryData: queryDataInitialState },
            scheduled: { ...state.scheduled, queryData: queryDataInitialState },
        }),
    },
});

export const {
    setMostAgendatedOnRange,
    setMostAgendatedAllTime,
    setQueryData,
    resetQueryDataStatistics,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
