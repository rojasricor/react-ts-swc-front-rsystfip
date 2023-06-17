import { useState, useEffect, useRef } from "react";
import { API_ROUTE } from "../constants";
import {
  Chart as ChartJS,
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadialLinearScale,
  Tooltip,
  ChartTypeRegistry,
} from "chart.js";
import { ChartDataset } from "chart.js";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import DaterStatistics from "./DaterStatistics";
import Ctx from "./Ctx";
import ListerStatistics from "./ListerStatistics";
import axios from "axios";
import { toast } from "react-toastify";
import { Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setMostAgendatedOnRange,
  setMostAgendatedAllTime,
} from "../features/statistics/statisticsSlice";

export interface PropsStatistics {
  scheduling_type: string;
}

const Statistics = ({
  scheduling_type,
}: PropsStatistics): React.JSX.Element => {
  const [chartJS, setChartJS] = useState<ChartJS<
    keyof ChartTypeRegistry,
    string[],
    string
  > | null>(null);

  const ctxRef = useRef<HTMLCanvasElement>(null);

  const dispatch = useAppDispatch();

  const queryDataState = useAppSelector(({ statistics }) =>
    scheduling_type === "daily"
      ? statistics.daily.queryData
      : statistics.scheduled.queryData
  );

  ChartJS.register(
    ArcElement,
    BarController,
    BarElement,
    CategoryScale,
    ChartDataLabels,
    LinearScale,
    LineController,
    LineElement,
    PieController,
    PointElement,
    PolarAreaController,
    RadialLinearScale,
    Tooltip
  );

  const refreshChart: (labels: string[], data: string[]) => void = (
    labels: string[],
    data: string[]
  ): void => {
    if (chartJS) chartJS.destroy();

    const label: string = `Agendamiento ${
      scheduling_type === "daily" ? "diario" : "programado"
    } - Cantidad persona(s)`;

    const newChart: typeof chartJS = new ChartJS(
      ctxRef.current as HTMLCanvasElement,
      {
        type: queryDataState.chartType as keyof ChartTypeRegistry,
        data: {
          labels,
          datasets: [
            {
              label,
              data,
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(54, 162, 235)",
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
              hoverOffset: 4,
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animations: {
            tension: {
              duration: 1000,
              easing: "linear",
              from: 1,
              to: 0,
              loop: true,
            },
          },
          scales: { x: { beginAtZero: true }, y: { beginAtZero: true } },
          plugins: {
            datalabels: {
              formatter: (value: number, ctx: Context): string => {
                const dataset: ChartDataset = ctx.dataset;
                const data: typeof dataset.data = dataset.data;
                const sum: any = data.reduce(
                  (a, b): number => Number(a) + Number(b)
                );
                const percent: number = Math.round((value / sum) * 100);

                return (isNaN(percent) ? 0 : percent) + "%";
              },
              labels: { title: { font: { size: 20 } } },
              align: "end",
            },
          },
        },
      }
    );

    setChartJS(newChart);
  };

  const getStatistics = async (): Promise<void> => {
    try {
      const { data } = await axios(
        `${API_ROUTE}/statistics/${scheduling_type}?start=${queryDataState.start}&end=${queryDataState.end}`
      );

      const labels: string[] = data.map(
        ({ category }: { category: string }) => category
      );
      const dataset: string[] = data.map(
        ({ scheduling_count }: { scheduling_count: string }) => scheduling_count
      );
      refreshChart(labels, dataset);
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  const getMostAgendatedOnRange = async (): Promise<void> => {
    try {
      const { data } = await axios(
        `${API_ROUTE}/statistics/${scheduling_type}/onrange?start=${queryDataState.start}&end=${queryDataState.end}`
      );

      dispatch(setMostAgendatedOnRange([scheduling_type, data]));
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  const getMostAgendatedAllTime = async (): Promise<void> => {
    try {
      const { data } = await axios(
        `${API_ROUTE}/statistics/${scheduling_type}/alltime`
      );

      dispatch(setMostAgendatedAllTime([scheduling_type, data]));
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  useEffect(() => {
    getStatistics();
    getMostAgendatedOnRange();
    getMostAgendatedAllTime();
  }, [queryDataState.start, queryDataState.end, queryDataState.chartType]);

  return (
    <>
      <Col md={12}>
        <h1 className="h3">
          {`Estadísticas de agendamiento ${
            scheduling_type === "daily" ? "diario" : "programado"
          }`}
        </h1>
      </Col>

      <DaterStatistics scheduling_type={scheduling_type} />

      <Col md={12} className="my-5">
        <Ctx ctxRef={ctxRef} />
      </Col>

      <Col md={12}>
        <ListerStatistics
          scheduling_type={
            scheduling_type === "daily" ? "diario" : "programado"
          }
        />
      </Col>
    </>
  );
};

export default Statistics;
