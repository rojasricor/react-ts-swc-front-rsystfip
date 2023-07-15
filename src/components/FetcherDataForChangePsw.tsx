import { useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { setTempDataForChangePsw } from "../features/temp/tempSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IUserBase } from "../interfaces/IUserBase";
import { notify } from "../libs/toast";
import * as userService from "../services/user.service";
import FormChangePsw from "./FormChangePsw";

export default function FetcherDataForChangePsw(): React.JSX.Element {
    const { role } = useParams<{ role: string }>();

    const dispatch = useAppDispatch();

    const tempDataStateForChangePsw: IUserBase = useAppSelector(
        ({ temp }) => temp.tempDataForChangePsw
    );

    const { data, error } = useQuery<any, any>(["userData", role], () =>
        userService.getData(role as string)
    );

    useEffect(() => {
        if (data) dispatch(setTempDataForChangePsw(data));
        if (error) notify(error.response.data.error, { type: "error" });
    }, [data, error]);

    return (
        <Col md={4} className="mx-auto">
            <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
                <h1 className="h3 text-center">
                    {tempDataStateForChangePsw.email}
                </h1>
                <Card.Body className="my-4">
                    <FormChangePsw userId={tempDataStateForChangePsw.id} />
                </Card.Body>
            </Card>
        </Col>
    );
}
