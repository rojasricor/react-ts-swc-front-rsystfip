import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getStartMonthDate, getEndMonthDate } from "../../libs/timeFormatter";
import { ICounts } from "../../interfaces/ICounts";

interface QueryData {
  start: string;
  end: string;
  chartType: string;
}

interface Data {
  mostAgendatedOnRange: ICounts[];
  mostAgendatedAllTime: ICounts[];
  queryData: QueryData;
}

interface StatisticsState {
  daily: Data;
  scheduled: Data;
}

const queryDataInitialState: QueryData = {
  start: getStartMonthDate(),
  end: getEndMonthDate(),
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
      { payload }: PayloadAction<[string, ICounts[]]>
    ) => {
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
    setMostAgendatedAllTime: (
      state,
      { payload }: PayloadAction<[string, ICounts[]]>
    ) => {
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
    setQueryData: (state, { payload }: PayloadAction<[string, QueryData]>) => {
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
