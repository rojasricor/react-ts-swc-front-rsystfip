import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import FormChangePsw from "./FormChangePsw";
import { toast } from "react-toastify";
import { IUserBase } from "../interfaces/IUserBase";
import { api } from "../api/axios";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setTempDataForChangePsw } from "../features/temp/tempSlice";

type TParams = {
  role: string;
};

const FetcherDataForChangePsw = (): React.JSX.Element => {
  const { role } = useParams<TParams>();

  const dispatch = useAppDispatch();

  const tempDataStateForChangePsw: IUserBase = useAppSelector(
    ({ temp }) => temp.tempDataForChangePsw
  );

  const getDatauser = async (): Promise<void> => {
    try {
      const { data } = await api(`/user?role=${role}`);

      dispatch(setTempDataForChangePsw(data));
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  useEffect(() => {
    getDatauser();
  }, [role]);

  return (
    <Col md={4} className="mx-auto">
      <Card className="border-0 shadow-sm rounded-3 bg-white px-3 py-5 mt-3 mb-3">
        <h1 className="h3 text-center">{tempDataStateForChangePsw.email}</h1>
        <Card.Body className="my-4">
          <FormChangePsw userId={tempDataStateForChangePsw.id} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FetcherDataForChangePsw;
