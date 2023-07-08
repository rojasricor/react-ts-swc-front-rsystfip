import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { api } from "../api/axios";
import {
    PeopleCancelled,
    setCancelledPeople,
} from "../features/cancelledPeople/cancelledPeopleSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import CancelledRow from "./CancelledRow";

export default function TableCancelled(): React.JSX.Element {
    const cancelledPeopleState: PeopleCancelled[] = useAppSelector(
        ({ cancelledPeople }) => cancelledPeople
    );

    const dispatch = useAppDispatch();

    const getCancelled = async (): Promise<void> => {
        try {
            const { data } = await api("/cancelled");

            dispatch(setCancelledPeople(data));
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getCancelled();
    }, []);

    return (
        <Table responsive hover borderless size="sm" className="text-center">
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
}
