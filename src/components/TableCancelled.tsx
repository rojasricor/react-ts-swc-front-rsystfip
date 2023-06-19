import { useEffect } from "react";
import { Table } from "react-bootstrap";
import CancelledRow from "./CancelledRow";
import { API_ROUTE } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import {
  PeopleCancelled,
  setCancelledPeople,
} from "../features/cancelledPeople/cancelledPeopleSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { v4 } from "uuid";

const TableCancelled = (): React.JSX.Element => {
  const cancelledPeopleState: PeopleCancelled[] = useAppSelector(
    ({ cancelledPeople }) => cancelledPeople
  );

  const dispatch = useAppDispatch();

  const getCancelled = async (): Promise<void> => {
    try {
      const { data } = await axios(`${API_ROUTE}/cancelled`);

      dispatch(setCancelledPeople(data));
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  useEffect(() => {
    getCancelled();
  }, []);

  return (
    <Table responsive hover striped size="sm" className="text-center">
      <caption>Cancelled people history.</caption>
      <thead>
        <tr>
          <th>No.</th>
          <th>Nombres</th>
          <th>Identifación</th>
          <th>Categoría</th>
          <th>Facultad</th>
          <th>Motivo</th>
        </tr>
      </thead>
      <tbody>
        {cancelledPeopleState.map((person, index) => (
          <CancelledRow key={v4()} index={index} person={person} />
        ))}
      </tbody>
    </Table>
  );
};

export default TableCancelled;
