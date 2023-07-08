import {
    ArcElement,
    BarController,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    ChartTypeRegistry,
    LineController,
    LineElement,
    LinearScale,
    PieController,
    PointElement,
    PolarAreaController,
    RadialLinearScale,
    Tooltip,
} from "chart.js";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import { api } from "../api/axios";
import {
    QueryData,
    setMostAgendatedAllTime,
    setMostAgendatedOnRange,
} from "../features/statistics/statisticsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { showAndUpdateToast } from "../libs/toast";
import Ctx from "./Ctx";
import DaterStatistics from "./DaterStatistics";
import ListerStatistics from "./ListerStatistics";

export interface IProps {
    scheduling_type: "daily" | "scheduled";
}

export default function Statistics({
    scheduling_type,
}: IProps): React.JSX.Element {
    const [chartJS, setChartJS] = useState<ChartJS<
        keyof ChartTypeRegistry,
        string[],
        string
    > | null>(null);

    const ctxRef = useRef<HTMLCanvasElement>(null);

    const dispatch = useAppDispatch();

    const queryDataState: QueryData = useAppSelector(
        ({ statistics }) => statistics[scheduling_type].queryData
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

    const labelText = scheduling_type === "daily" ? "diario" : "programado";

    const refreshChart = (labels: string[], data: string[]) => {
        if (chartJS) chartJS.destroy();

        const newChart: typeof chartJS = new ChartJS(
            ctxRef.current as HTMLCanvasElement,
            {
                type: queryDataState.chartType as keyof ChartTypeRegistry,
                data: {
                    labels,
                    datasets: [
                        {
                            label: `Agendamiento ${labelText} - Cantidad persona(s)`,
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
                    scales: {
                        x: { beginAtZero: true },
                        y: { beginAtZero: true },
                    },
                    plugins: {
                        datalabels: {
                            formatter: (
                                value: number,
                                ctx: Context
                            ): string => {
                                let sum = 0;
                                const data = ctx.dataset.data;
                                data.forEach((n) => (sum += Number(n)));
                                const percent = Math.round((value / sum) * 100);
                                return (isNaN(percent) ? 0 : percent)
                                    .toString()
                                    .concat("%");
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
            const { data } = await api(
                `/statistics/${scheduling_type}?start=${queryDataState.start}&end=${queryDataState.end}`
            );

            const labels: string[] = data.map(
                ({ category }: { category: string }) => category
            );
            const dataset: string[] = data.map(
                ({ scheduling_count }: { scheduling_count: string }) =>
                    scheduling_count
            );
            refreshChart(labels, dataset);
        } catch (error: any) {
            showAndUpdateToast(error.response.data.error, { type: "error" });
        }
    };

    const getMostAgendatedOnRange = async (): Promise<void> => {
        try {
            const { data } = await api(
                `/statistics/${scheduling_type}/onrange?start=${queryDataState.start}&end=${queryDataState.end}`
            );

            dispatch(setMostAgendatedOnRange([scheduling_type, data]));
        } catch (error: any) {
            showAndUpdateToast(error.response.data.error, { type: "error" });
        }
    };

    const getMostAgendatedAllTime = async (): Promise<void> => {
        try {
            const { data } = await api(
                `/statistics/${scheduling_type}/alltime`
            );

            dispatch(setMostAgendatedAllTime([scheduling_type, data]));
        } catch (error: any) {
            showAndUpdateToast(error.response.data.error, { type: "error" });
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
                <h1 className="h3">Estadísticas de agendamiento {labelText}</h1>
            </Col>

            <DaterStatistics scheduling_type={scheduling_type} />

            <Col md={12} className="my-5">
                <Ctx ctxRef={ctxRef} />
            </Col>

            <Col md={12}>
                <ListerStatistics scheduling_type={scheduling_type} />
            </Col>
        </>
    );
}
