import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { v4 } from "uuid";
import {
    PeopleCancelled,
    setCancelledPeople,
} from "../features/cancelledPeople/cancelledPeopleSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { notify } from "../libs/toast";
import * as peopleService from "../services/people.service";
import CancelledRow from "./CancelledRow";

export default function TableCancelled(): React.JSX.Element {
    const dispatch = useAppDispatch();

    const cancelledPeopleState: PeopleCancelled[] = useAppSelector(
        ({ cancelledPeople }) => cancelledPeople
    );

    const { data, error } = useQuery<[], any>(
        "peopleCancelled",
        peopleService.getPeopleCancelled
    );

    useEffect(() => {
        if (data) dispatch(setCancelledPeople(data));
        if (error) notify(error.response.data.error, { type: "error" });
    }, [data, error]);

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
