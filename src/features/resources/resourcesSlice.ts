import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Document, Category, Facultie } from "../../interfaces/IResources";

interface ResourcesState {
  categories: Category[];
  documents: Document[];
  faculties: Facultie[];
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
    setCategories: (state, { payload }: PayloadAction<Category[]>) => {
      return {
        ...state,
        categories: payload,
      };
    },
    setDocuments: (state, { payload }: PayloadAction<Document[]>) => {
      return {
        ...state,
        documents: payload,
      };
    },
    setFaculties: (state, { payload }: PayloadAction<Facultie[]>) => {
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
