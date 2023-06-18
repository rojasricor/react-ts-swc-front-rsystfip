import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getStartMonthDate, getEndMonthDate } from "../../libs/timeFormatter";
import { UNSET_STATUS } from "../../constants";
import { ICounts } from "../../interfaces/ICounts";

export interface Reports {
  name: string;
  date: string;
  time: string;
  scheduling_count: string;
  daily_count: string;
  category: string;
  id_person: number;
}

interface ReportsState {
  pngBase64: string;
  reports: Reports[];
  reportsOrigen: Reports[];
  reportsCountOnRange: ICounts[];
  reportsCountAllTime: ICounts[];
  queryData: any;
}

interface QueryData {
  startDate: string;
  endDate: string;
  category: string;
}

const queryDataInitialState: QueryData = {
  startDate: getStartMonthDate(),
  endDate: getEndMonthDate(),
  category: UNSET_STATUS,
};

const initialState: ReportsState = {
  pngBase64: "",
  reports: [],
  reportsOrigen: [],
  reportsCountOnRange: [],
  reportsCountAllTime: [],
  queryData: queryDataInitialState,
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
      queryData: queryDataInitialState,
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
