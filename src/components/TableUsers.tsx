import { useEffect } from "react";
import { Table } from "react-bootstrap";
import UserRow from "./UserRow";
import { User, setUsers } from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { v4 } from "uuid";
import { api } from "../api/axios";

const TableUsers = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const usersState: User[] = useAppSelector(({ admin }) => admin.users);

  const getUsers = async (): Promise<void> => {
    try {
      const { data } = await api("/users");

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
        {usersState.map((user) => (
          <UserRow key={v4()} user={user} />
        ))}
      </tbody>
    </Table>
  );
};

export default TableUsers;
