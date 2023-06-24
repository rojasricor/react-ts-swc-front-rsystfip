import { useEffect } from "react";
import PdfCreator from "./PdfCreator";
import { toast } from "react-toastify";
import { setPeople, setPeopleOrigen } from "../features/people/peopleSlice";
import {
  setPngBase64,
  setReportsCountOnRange,
  setReportsCountAllTime,
  QueryData,
} from "../features/reports/reportsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { api } from "../api/axios";

const FetcherReports = (): React.JSX.Element => {
  const queryDataState: QueryData = useAppSelector(
    ({ reports }) => reports.queryData
  );

  const dispatch = useAppDispatch();

  const getPeople = async (): Promise<void> => {
    try {
      const { data } = await api("/people");

      dispatch(setPeople(data));
      dispatch(setPeopleOrigen(data));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getReportsCountOnRange = async (): Promise<void> => {
    try {
      const { data } = await api(
        `/reports/count?start=${queryDataState.startDate}&end=${queryDataState.endDate}`
      );

      dispatch(setReportsCountOnRange(data));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getReportsCountAlltime = async (): Promise<void> => {
    try {
      const { data } = await api("/reports/counts");

      dispatch(setReportsCountAllTime(data));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getPngbase64 = async (): Promise<void> => {
    try {
      const { data } = await api("/img/admin/avatar.png", {
        responseType: "blob",
      });

      const reader: FileReader = new FileReader();
      reader.readAsDataURL(data);
      reader.addEventListener("load", (): void => {
        if (reader.result) dispatch(setPngBase64(reader.result as string));
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getPeople();
    getReportsCountAlltime();
    getPngbase64();
  }, []);

  useEffect(() => {
    getReportsCountOnRange();
  }, [queryDataState.startDate, queryDataState.endDate]);

  return <PdfCreator />;
};

export default FetcherReports;
