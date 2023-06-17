import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PeopleBase from "../../interfaces/IPeopleBase";

export interface PeopleCancelled extends PeopleBase {
  cancelled_asunt: string;
}

const initialState: PeopleCancelled[] = [];

const cancelledPeopleSlice = createSlice({
  name: "cancelledPeople",
  initialState,
  reducers: {
    setCancelledPeople: (
      _state,
      { payload }: PayloadAction<PeopleCancelled[]>
    ) => payload,
  },
});

export const { setCancelledPeople } = cancelledPeopleSlice.actions;

export default cancelledPeopleSlice.reducer;
