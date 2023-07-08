import { Table } from "react-bootstrap";
import { v4 } from "uuid";
import { QueryData, Reports } from "../features/reports/reportsSlice";
import { useAppSelector } from "../hooks";
import ReportRow from "./ReportRow";

export default function TableReports(): React.JSX.Element {
    const reportsState: Reports[] = useAppSelector(
        ({ reports }) => reports.reports
    );
    const queryDataState: QueryData = useAppSelector(
        ({ reports }) => reports.queryData
    );

    return (
        <Table responsive hover borderless size="sm" className="text-center">
            <caption>
                Data about people schedule between {queryDataState.startDate}{" "}
                and {queryDataState.endDate}.
            </caption>
            <thead>
                <tr>
                    <th>Nombres</th>
                    <th>Fecha</th>
                    <th>Últ. Modificación</th>
                    <th>Agendamiento Programado</th>
                    <th>Agendamiento Diario</th>
                    <th>Tipo Persona</th>
                </tr>
            </thead>
            <tbody>
                {reportsState.map((person) => (
                    <ReportRow key={v4()} report={person} />
                ))}
            </tbody>
        </Table>
    );
}
