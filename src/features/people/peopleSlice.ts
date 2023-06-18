import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPeopleBase } from "../../interfaces/IPeopleBase";

export interface People extends IPeopleBase {
  come_asunt: string;
}

interface PeopleState {
  isLoading: number;
  people: People[];
  peopleOrigen: People[];
}

const initialState: PeopleState = {
  isLoading: 0,
  people: [],
  peopleOrigen: [],
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPeople: (state, { payload }: PayloadAction<People[]>): PeopleState => ({
      ...state,
      people: payload,
    }),
    setPeopleOrigen: (
      state,
      { payload }: PayloadAction<People[]>
    ): PeopleState => ({ ...state, peopleOrigen: payload }),
    setIsLoading: (state, { payload }: PayloadAction<number>): PeopleState => ({
      ...state,
      isLoading: payload,
    }),
  },
});

export const { setPeople, setPeopleOrigen, setIsLoading } = peopleSlice.actions;

export default peopleSlice.reducer;
