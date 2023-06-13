import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Base } from "../../interfaces/IResources";

interface User extends Base {
  email: string;
}

interface FormData {
  role: string;
  name: string;
  lastname: string;
  docType: string;
  doc: string;
  email: string;
  tel: string;
  password: string;
  passwordConfirmation: string;
}

interface AdminState {
  users: User[];
  formData: FormData;
  isLoading: boolean;
}

const formDataInitialState: FormData = {
  role: "",
  name: "",
  lastname: "",
  docType: "",
  doc: "",
  email: "",
  tel: "",
  password: "",
  passwordConfirmation: "",
};

const initialState: AdminState = {
  users: [],
  formData: formDataInitialState,
  isLoading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<User[]>) => {
      return {
        ...state,
        users: payload,
      };
    },
    setFormData: (state, { payload }: PayloadAction<FormData>) => {
      return {
        ...state,
        formData: payload,
      };
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: payload,
      };
    },
    resetFormDataAdmin: (state) => {
      return {
        ...state,
        formData: formDataInitialState,
      };
    },
  },
});

export const { setUsers, setFormData, setIsLoading, resetFormDataAdmin } =
  adminSlice.actions;

export default adminSlice.reducer;
