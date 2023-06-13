import { createSlice } from "@reduxjs/toolkit";
import { getStartMonthDate, getEndMonthDate } from "../../libs/todaylib";

const queryDataInitialState = {
  start: getStartMonthDate(),
  end: getEndMonthDate(),
  chartType: "bar",
};

const initialState = {
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
    setMostAgendatedOnRange: (state, { payload }) => {
      const [schedulingType, mostAgendatedOnRange] = payload;

      return schedulingType === "daily"
        ? {
            ...state,
            daily: {
              ...state.daily,
              mostAgendatedOnRange,
            },
          }
        : {
            ...state,
            scheduled: {
              ...state.scheduled,
              mostAgendatedOnRange,
            },
          };
    },
    setMostAgendatedAllTime: (state, { payload }) => {
      const [schedulingType, mostAgendatedAllTime] = payload;

      return schedulingType === "daily"
        ? {
            ...state,
            daily: {
              ...state.daily,
              mostAgendatedAllTime,
            },
          }
        : {
            ...state,
            scheduled: {
              ...state.scheduled,
              mostAgendatedAllTime,
            },
          };
    },
    setQueryData: (state, { payload }) => {
      const [schedulingType, queryData] = payload;

      return schedulingType === "daily"
        ? {
            ...state,
            daily: {
              ...state.daily,
              queryData,
            },
          }
        : {
            ...state,
            scheduled: {
              ...state.scheduled,
              queryData,
            },
          };
    },
    resetQueryDataStatistics: (state) => {
      return {
        ...state,
        daily: {
          ...state.daily,
          queryData: queryDataInitialState,
        },
        scheduled: {
          ...state.scheduled,
          queryData: queryDataInitialState,
        },
      };
    },
  },
});

export const {
  setMostAgendatedOnRange,
  setMostAgendatedAllTime,
  setQueryData,
  resetQueryDataStatistics,
} = statisticsSlice.actions;
export default statisticsSlice.reducer;
