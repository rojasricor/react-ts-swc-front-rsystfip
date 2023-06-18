import { Table } from "react-bootstrap";
import ReportRow from "./ReportRow";
import { useAppSelector } from "../hooks";
import { QueryData, Reports } from "../features/reports/reportsSlice";

const TableReports = (): React.JSX.Element => {
  const reportsState: Reports[] = useAppSelector(
    ({ reports }) => reports.reports
  );
  const queryDataState: QueryData = useAppSelector(
    ({ reports }) => reports.queryData
  );

  return (
    <Table hover striped size="sm" borderless className="text-center">
      <caption>
        Data about people schedule between {queryDataState.startDate} and{" "}
        {queryDataState.endDate}.
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
        {reportsState.map((person, index) => (
          <ReportRow key={index} report={person} />
        ))}
      </tbody>
    </Table>
  );
};

export default TableReports;
