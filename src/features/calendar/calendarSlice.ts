import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICalendarState {
    changes: boolean;
    calendarEvents: ICalendarEvents[];
}

export interface ICalendarEvents {
    id?: number;
    title?: string;
    start?: string;
    end?: string;
    color?: string;
}

const initialState: ICalendarState = {
    changes: false,
    calendarEvents: [],
};

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setCalendarEvents: (
            state,
            { payload }: PayloadAction<ICalendarEvents[]>
        ): ICalendarState => ({ ...state, calendarEvents: [...payload] }),
        registerAChange: (state): ICalendarState => ({
            ...state,
            changes: !state.changes,
        }),
    },
});

export const { setCalendarEvents, registerAChange } = calendarSlice.actions;

export default calendarSlice.reducer;
