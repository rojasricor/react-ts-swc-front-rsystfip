import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  formatTodaysDate,
  formatTodaysDateTime,
} from "../../libs/timeFormatter";

interface FormDataState {
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

interface Deans {
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
    ) => {
      const [action, formData] = payload;

      if (action === "add") {
        return {
          ...state,
          formData: {
            ...state.formData,
            add: formData ? formData : formDataInitialState,
          },
        };
      }

      if (action === "edit") {
        return {
          ...state,
          formData: {
            ...state.formData,
            edit: formData ? formData : formDataInitialState,
          },
        };
      }

      if (action === "schedule") {
        return {
          ...state,
          formData: {
            ...state.formData,
            schedule: formData ? formData : formDataInitialState,
          },
        };
      }
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: payload,
      };
    },
    setDisabledAll: (state, { payload }: PayloadAction<boolean>) => {
      return {
        ...state,
        disabledAll: payload,
      };
    },
    setDisabledAfterAutocomplete: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      return {
        ...state,
        disabledAfterAutocomplete: payload,
      };
    },
    setDeans: (state, { payload }: PayloadAction<Deans[]>) => {
      return { ...state, deans: payload };
    },
    resetAllFormDataProgramming: (state) => {
      return {
        ...state,
        formData: {
          ...initialState.formData,
        },
      };
    },
  },
});

export const {
  setFormData,
  setIsLoading,
  setDisabledAll,
  setDisabledAfterAutocomplete,
  setDeans,
  resetAllFormDataProgramming,
} = programmingSlice.actions;

export default programmingSlice.reducer;
