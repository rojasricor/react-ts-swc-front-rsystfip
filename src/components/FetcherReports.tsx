import { useEffect } from "react";
import { API_ROUTE } from "../constants";
import PdfCreator from "./PdfCreator";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setPeople, setPeopleOrigen } from "../features/people/peopleSlice";
import {
  setPngBase64,
  setReportsCountOnRange,
  setReportsCountAllTime,
} from "../features/reports/reportsSlice";

const FetcherReports = () => {
  const queryDataState = useSelector(({ reports }) => reports.queryData);

  const dispatch = useDispatch();

  const getPeople = async () => {
    try {
      const { data } = await axios(`${API_ROUTE}/people`);

      dispatch(setPeople(data));
      dispatch(setPeopleOrigen(data));
    } catch ({ message }) {
      toast.error(message);
    }
  };

  const getReportsCountOnRange = async () => {
    try {
      const { data } = await axios(
        `${API_ROUTE}/reports/count?start=${queryDataState.startDate}&end=${queryDataState.endDate}`
      );

      dispatch(setReportsCountOnRange(data));
    } catch ({ message }) {
      toast.error(message);
    }
  };

  const getReportsCountAlltime = async () => {
    try {
      const { data } = await axios(`${API_ROUTE}/reports/counts`);

      dispatch(setReportsCountAllTime(data));
    } catch ({ message }) {
      toast.error(message);
    }
  };

  const getPngbase64 = async () => {
    try {
      const { data } = await axios("/img/admin/avatar.png", {
        responseType: "blob",
      });

      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.addEventListener("load", () =>
        dispatch(setPngBase64(reader.result))
      );
    } catch ({ message }) {
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
