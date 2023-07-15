import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserBase } from "../../interfaces/IUserBase";

export interface User extends IUserBase {
    name: string;
    lastname: string;
    tel: string;
    role: string;
}

export interface FormData {
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
}

const initialState: AdminState = {
    users: [],
    formData: {
        role: "",
        name: "",
        lastname: "",
        docType: "",
        doc: "",
        email: "",
        tel: "",
        password: "",
        passwordConfirmation: "",
    },
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setUsers: (state, { payload }: PayloadAction<User[]>): AdminState => ({
            ...state,
            users: payload,
        }),
        setFormData: (
            state,
            { payload }: PayloadAction<FormData>
        ): AdminState => ({
            ...state,
            formData: payload,
        }),
        resetFormDataAdmin: (state) => ({
            ...state,
            formData: initialState.formData,
        }),
    },
});

export const { setUsers, setFormData, resetFormDataAdmin } = adminSlice.actions;

export default adminSlice.reducer;
