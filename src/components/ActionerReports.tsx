import { useEffect } from "react";
import DaterReports from "./DaterReports";
import TableReports from "./TableReports";
import { API_ROUTE, UNSET_STATUS } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setReports, setReportsOrigen } from "../features/reports/reportsSlice";

const ActionerReports = () => {
  const dispatch = useDispatch();

  const reportsOrigenState = useSelector(
    ({ reports }) => reports.reportsOrigen
  );
  const queryDataState = useSelector(({ reports }) => reports.queryData);

  const getReports = async () => {
    try {
      const { data } = await axios(
        `${API_ROUTE}/reports?start=${queryDataState.startDate}&end=${queryDataState.endDate}&category=${queryDataState.category}`
      );

      filterReports(data);
      dispatch(setReportsOrigen(data));
    } catch ({ message }) {
      toast.error(message);
    }
  };

  const filterReports = (dataToFilter = reportsOrigenState) => {
    dispatch(
      setReports(
        queryDataState.category !== UNSET_STATUS
          ? dataToFilter.filter(
              ({ id_person }) => id_person == queryDataState.category
            )
          : dataToFilter
      )
    );
  };

  useEffect(() => {
    getReports();
    filterReports();
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
