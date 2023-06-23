import { Table } from "react-bootstrap";
import PersonRow from "./PersonRow";
import { useAppSelector } from "../hooks";
import { People } from "../features/people/peopleSlice";
import { v4 } from "uuid";

const TablePeople = (): React.JSX.Element => {
  const peopleState: People[] = useAppSelector(({ people }) => people.people);

  return (
    <Table responsive hover borderless size="sm" className="text-center">
      <caption>Scheduled people history.</caption>
      <thead>
        <tr>
          <th>No.</th>
          <th>Nombres</th>
          <th>Identifación</th>
          <th>Categoría</th>
          <th>Facultad</th>
          <th>Asunto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {peopleState.map((person) => (
          <PersonRow key={v4()} person={person} />
        ))}
      </tbody>
    </Table>
  );
};

export default TablePeople;
