import { IBase } from "./IResources";

export interface IPeopleBase extends IBase {
    name: string;
    ty_doc: string;
    category: string;
    facultie_id: number;
    description: string;
    document_number: string;
    facultie: string;
}
