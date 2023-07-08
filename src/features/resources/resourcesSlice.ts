import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDocument, ICategory, IFacultie } from "../../interfaces/IResources";

interface ResourcesState {
    categories: ICategory[];
    documents: IDocument[];
    faculties: IFacultie[];
}

const initialState: ResourcesState = {
    categories: [],
    documents: [],
    faculties: [],
};

const resourcesSlice = createSlice({
    name: "resources",
    initialState,
    reducers: {
        setCategories: (
            state,
            { payload }: PayloadAction<ICategory[]>
        ): ResourcesState => ({ ...state, categories: payload }),
        setDocuments: (
            state,
            { payload }: PayloadAction<IDocument[]>
        ): ResourcesState => ({ ...state, documents: payload }),
        setFaculties: (
            state,
            { payload }: PayloadAction<IFacultie[]>
        ): ResourcesState => ({ ...state, faculties: payload }),
    },
});

export const { setCategories, setDocuments, setFaculties } =
    resourcesSlice.actions;

export default resourcesSlice.reducer;
