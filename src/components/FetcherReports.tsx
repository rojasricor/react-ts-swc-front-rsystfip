import { useEffect } from "react";
import { API_ROUTE } from "../constants";
import PdfCreator from "./PdfCreator";
import axios from "axios";
import { toast } from "react-toastify";
import { setPeople, setPeopleOrigen } from "../features/people/peopleSlice";
import {
  setPngBase64,
  setReportsCountOnRange,
  setReportsCountAllTime,
} from "../features/reports/reportsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const FetcherReports = (): React.JSX.Element => {
  const queryDataState = useAppSelector(({ reports }) => reports.queryData);

  const dispatch = useAppDispatch();

  const getPeople = async (): Promise<void> => {
    try {
      const { data } = await axios(`${API_ROUTE}/people`);

      dispatch(setPeople(data));
      dispatch(setPeopleOrigen(data));
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  const getReportsCountOnRange = async (): Promise<void> => {
    try {
      const { data } = await axios(
        `${API_ROUTE}/reports/count?start=${queryDataState.startDate}&end=${queryDataState.endDate}`
      );

      dispatch(setReportsCountOnRange(data));
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  const getReportsCountAlltime = async (): Promise<void> => {
    try {
      const { data } = await axios(`${API_ROUTE}/reports/counts`);

      dispatch(setReportsCountAllTime(data));
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  const getPngbase64 = async (): Promise<void> => {
    try {
      const { data } = await axios("/img/admin/avatar.png", {
        responseType: "blob",
      });

      const reader: FileReader = new FileReader();
      reader.readAsDataURL(data);
      reader.addEventListener("load", () => {
        if (reader.result) dispatch(setPngBase64(reader.result as string));
      });
    } catch ({ message }: any) {
      toast.error(message);
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
