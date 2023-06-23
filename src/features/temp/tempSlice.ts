import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserBase } from "../../interfaces/IUserBase";

export interface TempSlice {
  tempDataForChangePsw: IUserBase;
}

const initialState: TempSlice = {
  tempDataForChangePsw: {
    id: 0,
    email: "",
  },
};

const tempSlice = createSlice({
  name: "extras",
  initialState,
  reducers: {
    setTempDataForChangePsw: (
      state,
      { payload }: PayloadAction<IUserBase>
    ): TempSlice => ({ ...state, tempDataForChangePsw: payload }),
    destroyTemporals: (): TempSlice => initialState,
  },
});

export const { setTempDataForChangePsw, destroyTemporals } = tempSlice.actions;

export default tempSlice.reducer;
