import { useEffect } from "react";
import { API_ROUTE } from "../constants";
import { Table } from "react-bootstrap";
import UserRow from "./UserRow";
import axios from "axios";
import { User, setUsers } from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";

const TableUsers = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const usersState: User[] = useAppSelector(({ admin }) => admin.users);

  const getUsers = async (): Promise<void> => {
    try {
      const { data } = await axios(`${API_ROUTE}/users`);

      dispatch(setUsers(data));
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Table responsive hover striped size="sm" className="text-center">
      <caption>Access users.</caption>
      <thead>
        <tr>
          <th>Correo institucional</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usersState.map((user, index) => (
          <UserRow key={index} user={user} />
        ))}
      </tbody>
    </Table>
  );
};

export default TableUsers;
