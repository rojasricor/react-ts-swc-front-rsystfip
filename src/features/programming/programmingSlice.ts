import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  formatTodaysDate,
  formatTodaysDateTime,
} from "../../libs/timeFormatter";

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
  status?: string;
  disabledAll?: boolean;
  disabledAfterAutocomplete?: boolean;
}

interface FormData {
  add: FormDataState;
  edit: FormDataState;
  schedule: FormDataState;
}

const formDataInitialState: FormDataState = {
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
  date: formatTodaysDate(),
  start: formatTodaysDateTime(),
  end: formatTodaysDateTime(),
  status: "daily",
  disabledAll: true,
  disabledAfterAutocomplete: false,
};

export interface Deans {
  _id: string;
  dean: string;
  facultie_id: string;
}

interface ProgrammingState {
  formData: FormData;
  isLoading: boolean;
  deans: Deans[];
}

const initialState: ProgrammingState = {
  formData: {
    add: formDataInitialState,
    edit: formDataInitialState,
    schedule: formDataInitialState,
  },
  isLoading: false,
  deans: [],
};

const programmingSlice = createSlice({
  name: "programming",
  initialState,
  reducers: {
    setFormData: (
      state,
      { payload }: PayloadAction<[string, FormDataState?]>
    ): ProgrammingState => {
      const [action, formData] = payload;

      switch (action) {
        case "add":
          return {
            ...state,
            formData: {
              ...state.formData,
              add: formData ?? formDataInitialState,
            },
          };

        case "edit":
          return {
            ...state,
            formData: {
              ...state.formData,
              edit: formData ?? formDataInitialState,
            },
          };

        case "schedule":
          return {
            ...state,
            formData: {
              ...state.formData,
              schedule: formData ?? formDataInitialState,
            },
          };

        default:
          return state;
      }
    },
    setIsLoading: (
      state,
      { payload }: PayloadAction<boolean>
    ): ProgrammingState => ({ ...state, isLoading: payload }),
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

export const {
  setFormData,
  setIsLoading,
  setDeans,
  resetAllFormDataProgramming,
} = programmingSlice.actions;

export default programmingSlice.reducer;
