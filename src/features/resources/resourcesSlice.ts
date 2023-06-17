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
    setCategories: (state, { payload }: PayloadAction<ICategory[]>) => {
      return {
        ...state,
        categories: payload,
      };
    },
    setDocuments: (state, { payload }: PayloadAction<IDocument[]>) => {
      return {
        ...state,
        documents: payload,
      };
    },
    setFaculties: (state, { payload }: PayloadAction<IFacultie[]>) => {
      return {
        ...state,
        faculties: payload,
      };
    },
  },
});

export const { setCategories, setDocuments, setFaculties } =
  resourcesSlice.actions;

export default resourcesSlice.reducer;
