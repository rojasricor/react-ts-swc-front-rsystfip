import { PeopleCancelled } from "../features/cancelledPeople/cancelledPeopleSlice";

interface Props {
  index: number;
  person: PeopleCancelled;
}

const CancelledRow = ({
  index,
  person: {
    name,
    description,
    ty_doc,
    document_number,
    category,
    facultie,
    cancelled_asunt,
  },
}: Props): React.JSX.Element => (
  <tr>
    <td>{index + 1}</td>
    <td>{name}</td>
    <td title={description}>
      {ty_doc} {document_number}
    </td>
    <td>{category}</td>
    <td>{facultie}</td>
    <td>{cancelled_asunt}</td>
  </tr>
);

export default CancelledRow;
