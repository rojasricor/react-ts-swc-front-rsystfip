import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { v4 } from "uuid";
import { api } from "../api/axios";
import { User, setUsers } from "../features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { showAndUpdateToast } from "../libs";
import UserRow from "./UserRow";

export default function TableUsers(): React.JSX.Element {
    const dispatch = useAppDispatch();

    const usersState: User[] = useAppSelector(({ admin }) => admin.users);

    const getUsers = async (): Promise<void> => {
        try {
            const { data } = await api("/users");

            dispatch(setUsers(data));
        } catch (error: any) {
            showAndUpdateToast(error.response.data.error, { type: "error" });
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Table responsive hover borderless size="sm" className="text-center">
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
}
