import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserBase } from "../../interfaces/IUserBase";

export interface TempState {
    tempDataForChangePsw: IUserBase;
}

const initialState: TempState = {
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
        ): TempState => ({ ...state, tempDataForChangePsw: payload }),
        destroyTemporals: (): TempState => initialState,
    },
});

export const { setTempDataForChangePsw, destroyTemporals } = tempSlice.actions;

export default tempSlice.reducer;
