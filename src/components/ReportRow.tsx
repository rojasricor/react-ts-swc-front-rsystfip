import { Reports } from "../features/reports/reportsSlice";

interface IProps {
  report: Reports;
}

const ReportRow = ({
  report: { name, date, time, scheduling_count, daily_count, category },
}: IProps): React.JSX.Element => (
  <tr>
    <td>{name}</td>
    <td>{date}</td>
    <td>{time}</td>
    <td>{scheduling_count}</td>
    <td>{daily_count}</td>
    <td>{category}</td>
  </tr>
);

export default ReportRow;
