import { createSlice } from "@reduxjs/toolkit";
import { getStartMonthDate, getEndMonthDate } from "../../libs/todaylib";
import { UNSET_STATUS } from "../../constants";

const queryDataInitialState = {
  startDate: getStartMonthDate(),
  endDate: getEndMonthDate(),
  category: UNSET_STATUS,
};

const initialState = {
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
    setPngBase64: (state, { payload }) => {
      return {
        ...state,
        pngBase64: payload,
      };
    },
    setReports: (state, { payload }) => {
      return {
        ...state,
        reports: payload,
      };
    },
    setReportsOrigen: (state, { payload }) => {
      return {
        ...state,
        reportsOrigen: payload,
      };
    },
    setReportsCountOnRange: (state, { payload }) => {
      return {
        ...state,
        reportsCountOnRange: payload,
      };
    },
    setReportsCountAllTime: (state, { payload }) => {
      return {
        ...state,
        reportsCountAllTime: payload,
      };
    },
    setQueryData: (state, { payload }) => {
      return {
        ...state,
        queryData: payload,
      };
    },
    resetQueryDataReports: (state) => {
      return {
        ...state,
        queryData: queryDataInitialState,
      };
    },
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
