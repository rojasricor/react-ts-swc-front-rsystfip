import { useEffect } from "react";
import DaterReports from "./DaterReports";
import TableReports from "./TableReports";
import { UNSET_STATUS } from "../constants";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  QueryData,
  Reports,
  setReports,
  setReportsOrigen,
} from "../features/reports/reportsSlice";
import { api } from "../api/axios";

const ActionerReports = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const reportsOrigenState: Reports[] = useAppSelector(
    ({ reports }) => reports.reportsOrigen
  );
  const queryDataState: QueryData = useAppSelector(
    ({ reports }) => reports.queryData
  );

  const getReports = async (): Promise<void> => {
    try {
      const { data } = await api("/reports", {
        params: {
          start: queryDataState.startDate,
          end: queryDataState.endDate,
          category: queryDataState.category,
        },
      });

      filterReports(data);
      dispatch(setReportsOrigen(data));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filterReports = (dataToFilter = reportsOrigenState): void => {
    dispatch(
      setReports(
        queryDataState.category !== UNSET_STATUS
          ? dataToFilter.filter(
              ({ id_person }) =>
                id_person.toString() === queryDataState.category
            )
          : dataToFilter
      )
    );
  };

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    getReports();
  }, [queryDataState.startDate, queryDataState.endDate]);

  useEffect(() => {
    filterReports();
  }, [queryDataState.category]);

  return (
    <>
      <DaterReports />
      <TableReports />
    </>
  );
};

export default ActionerReports;
