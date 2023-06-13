export interface Base {
  id: number;
}

export interface Category extends Base {
  category: string;
}

export interface Facultie extends Base {
  facultie: string;
}

export interface Document extends Base {
  description: string;
}
