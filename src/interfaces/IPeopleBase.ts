import { Base } from "./IResources";

interface PeopleBase extends Base {
  name: string;
  ty_doc: string;
  category: string;
  facultie_id: number;
  description: string;
  document_number: string;
  facultie: string;
}

export default PeopleBase;
