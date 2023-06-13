import { useEffect } from "react";
import { API_ROUTE } from "../constants";
import { Table } from "react-bootstrap";
import UserRow from "./UserRow";
import axios from "axios";
import { setUsers } from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const TableUsers = () => {
  const dispatch = useDispatch();

  const adminState = useSelector(({ admin }) => admin.users);

  const getUsers = async () => {
    try {
      const { data } = await axios(`${API_ROUTE}/users`);

      dispatch(setUsers(data));
    } catch ({ message }) {
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
        {adminState.map((user, index) => (
          <UserRow key={index} user={user} />
        ))}
      </tbody>
    </Table>
  );
};

export default TableUsers;
