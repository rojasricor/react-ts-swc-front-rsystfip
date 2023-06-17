export interface IBase {
  id: number;
}

export interface ICategory extends IBase {
  category: string;
}

export interface IFacultie extends IBase {
  facultie: string;
}

export interface IDocument extends IBase {
  description: string;
}
