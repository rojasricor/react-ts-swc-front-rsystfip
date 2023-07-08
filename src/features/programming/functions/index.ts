import {
    FormDataState,
    ProgrammingState,
    formDataInitialState,
    validFormDataAction,
} from "../programmingSlice";

export const updateFormDataByAction = (
    state: ProgrammingState,
    action: string,
    formData?: FormDataState
): ProgrammingState => {
    if (!(action in validFormDataAction)) return state;

    return {
        ...state,
        formData: {
            ...state.formData,
            [action]: formData || formDataInitialState,
        },
    };
};
