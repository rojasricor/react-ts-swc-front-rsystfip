import { useEffect } from "react";
import {
    Col,
    FloatingLabel,
    FormControl,
    FormSelect,
    Row,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { v4 } from "uuid";
import { UNSET_STATUS } from "../constants";
import { QueryData, setQueryData } from "../features/reports/reportsSlice";
import { setCategories } from "../features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ICategory } from "../interfaces/IResources";
import { notify } from "../libs/toast";
import * as categoryService from "../services/category.service";
import { THandleChangeITS } from "../types/THandleChanges";
import FetcherReports from "./FetcherReports";

interface IProps {
    errorReports: boolean;
}

export default function DaterReports({
    errorReports,
}: IProps): React.JSX.Element {
    const dispatch = useAppDispatch();

    const categoriesState: ICategory[] = useAppSelector(
        ({ resources }) => resources.categories
    );
    const queryDataState: QueryData = useAppSelector(
        ({ reports }) => reports.queryData
    );

    const handleChange = (e: THandleChangeITS) => {
        dispatch(
            setQueryData({
                ...queryDataState,
                [e.target.name]: e.target.value,
            })
        );
    };

    const { data, error } = useQuery<[], any>(
        "categories",
        categoryService.getCategories
    );

    useEffect(() => {
        if (data) dispatch(setCategories(data));
        if (error) notify(error.response.data.error, { type: "error" });
    }, [data, error]);

    return (
        <Row className="g-3 mb-5">
            <Col md={2}>
                <FloatingLabel label="Desde:">
                    <FormControl
                        name="startDate"
                        className="border-0 bg-white"
                        onChange={handleChange}
                        value={queryDataState.startDate}
                        type="date"
                    />
                </FloatingLabel>
            </Col>

            <Col md={2}>
                <FloatingLabel label="Hasta:">
                    <FormControl
                        name="endDate"
                        className="border-0 bg-white"
                        onChange={handleChange}
                        value={queryDataState.endDate}
                        type="date"
                    />
                </FloatingLabel>
            </Col>

            <Col md={2}>
                <FloatingLabel label="Persona:">
                    <FormSelect
                        name="category"
                        className="border-0 bg-white"
                        onChange={handleChange}
                        value={queryDataState.category}
                    >
                        <option value={UNSET_STATUS}>Todos</option>
                        {categoriesState.map(({ id, category }) => (
                            <option key={v4()} value={id}>
                                {category}
                            </option>
                        ))}
                    </FormSelect>
                </FloatingLabel>
            </Col>

            <Col md={2}>
                <FetcherReports errorReports={errorReports} />
            </Col>
        </Row>
    );
}
