import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UNSET_STATUS } from "../../constants";
import { ICounts } from "../../interfaces/ICounts";
import { endOfMonth, format } from "date-fns";

export interface Reports {
    name: string;
    date: string;
    time: string;
    scheduling_count: string;
    daily_count: string;
    category: string;
    id_person: number;
}

export interface QueryData {
    startDate: string;
    endDate: string;
    category: string;
}

interface ReportsState {
    pngBase64: string;
    reports: Reports[];
    reportsOrigen: Reports[];
    reportsCountOnRange: ICounts[];
    reportsCountAllTime: ICounts[];
    queryData: QueryData;
}

const initialState: ReportsState = {
    pngBase64: "",
    reports: [],
    reportsOrigen: [],
    reportsCountOnRange: [],
    reportsCountAllTime: [],
    queryData: {
        startDate: format(new Date(), "yyyy-MM-01"),
        endDate: format(endOfMonth(new Date()), "yyyy-MM-dd"),
        category: UNSET_STATUS,
    },
};

const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        setPngBase64: (
            state,
            { payload }: PayloadAction<ReportsState["pngBase64"]>
        ): ReportsState => ({ ...state, pngBase64: payload }),
        setReports: (
            state,
            { payload }: PayloadAction<Reports[]>
        ): ReportsState => ({ ...state, reports: payload }),
        setReportsOrigen: (
            state,
            { payload }: PayloadAction<Reports[]>
        ): ReportsState => ({ ...state, reportsOrigen: payload }),
        setReportsCountOnRange: (
            state,
            { payload }: PayloadAction<ICounts[]>
        ): ReportsState => ({ ...state, reportsCountOnRange: payload }),
        setReportsCountAllTime: (
            state,
            { payload }: PayloadAction<ICounts[]>
        ): ReportsState => ({ ...state, reportsCountAllTime: payload }),
        setQueryData: (
            state,
            { payload }: PayloadAction<QueryData>
        ): ReportsState => ({ ...state, queryData: payload }),
        resetQueryDataReports: (state): ReportsState => ({
            ...state,
            queryData: initialState.queryData,
        }),
    },
});

export const {
    setPngBase64,
    setReports,
    setReportsOrigen,
    setReportsCountOnRange,
    setReportsCountAllTime,
    setQueryData,
    resetQueryDataReports,
} = reportsSlice.actions;

export default reportsSlice.reducer;
