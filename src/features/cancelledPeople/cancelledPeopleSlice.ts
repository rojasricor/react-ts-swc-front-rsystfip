import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PeopleBase from "../../interfaces/IPeopleBase";

interface People extends PeopleBase {
  cancelled_asunt: string;
}

const initialState: People[] = [];

const cancelledPeopleSlice = createSlice({
  name: "cancelledPeople",
  initialState,
  reducers: {
    setCancelledPeople: (_state, { payload }: PayloadAction<People[]>) =>
      payload,
  },
});

export const { setCancelledPeople } = cancelledPeopleSlice.actions;

export default cancelledPeopleSlice.reducer;
