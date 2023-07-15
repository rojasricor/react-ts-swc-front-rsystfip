import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IKeyBool } from "../../interfaces/IKeyBool";
import { updateFormDataByAction } from "./functions";

export interface FormDataState {
    eventId?: string;
    person?: string;
    doc?: string;
    doctype?: string;
    name?: string;
    telContact?: string;
    emailContact?: string;
    facultie?: string;
    asunt?: string;
    color?: string;
    date?: string;
    start?: string;
    end?: string;
    status?: "daily" | "scheduled" | "cancelled";
    disabledAll?: boolean;
    disabledAfterAutocomplete?: boolean;
}

interface FormData {
    add: FormDataState;
    edit: FormDataState;
    schedule: FormDataState;
    [action: string]: FormDataState;
}

export const formDataInitialState: FormDataState = {
    eventId: "",
    person: "",
    doc: "",
    doctype: "",
    name: "",
    telContact: "",
    emailContact: "",
    facultie: "",
    asunt: "",
    color: "#388cdc",
    date: "",
    start: "",
    end: "",
    status: "daily",
    disabledAll: true,
    disabledAfterAutocomplete: false,
};

export interface Deans {
    _id: string;
    dean: string;
    facultie_id: string;
}

export interface ProgrammingState {
    formData: FormData;
    deans: Deans[];
}

export const validFormDataAction: IKeyBool = {
    add: true,
    edit: true,
    schedule: true,
};

const initialState: ProgrammingState = {
    formData: {
        add: formDataInitialState,
        edit: formDataInitialState,
        schedule: formDataInitialState,
    },
    deans: [],
};

const programmingSlice = createSlice({
    name: "programming",
    initialState,
    reducers: {
        setFormData: (
            state,
            {
                payload: [action, formData],
            }: PayloadAction<[string, FormDataState?]>
        ): ProgrammingState => updateFormDataByAction(state, action, formData),
        setDeans: (
            state,
            { payload }: PayloadAction<Deans[]>
        ): ProgrammingState => ({ ...state, deans: payload }),
        resetAllFormDataProgramming: (state): ProgrammingState => ({
            ...state,
            formData: { ...initialState.formData },
        }),
    },
});

export const { setFormData, setDeans, resetAllFormDataProgramming } =
    programmingSlice.actions;

export default programmingSlice.reducer;
