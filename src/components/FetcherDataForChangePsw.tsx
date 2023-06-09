import { useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../api";
import { setTempDataForChangePsw } from "../features/temp/tempSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IUserBase } from "../interfaces/IUserBase";
import { notify } from "../libs/toast";
import FormChangePsw from "./FormChangePsw";

type TParams = { role: string };

export default function FetcherDataForChangePsw(): React.JSX.Element {
    const { role } = useParams<TParams>();

    const dispatch = useAppDispatch();

    const tempDataStateForChangePsw: IUserBase = useAppSelector(
        ({ temp }) => temp.tempDataForChangePsw
    );

    const getDatauser = async (): Promise<void> => {
        try {
            const { data } = await api(`/users/${role}`);

            dispatch(setTempDataForChangePsw(data));
        } catch (error: any) {
            notify(error.response.data.error, { type: "error" });
        }
    };

    useEffect(() => {
        getDatauser();
    }, [role]);

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
