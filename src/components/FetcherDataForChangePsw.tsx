import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import FormChangePsw from "./FormChangePsw";
import { toast } from "react-toastify";
import { IUserBase } from "../interfaces/IUserBase";
import { api } from "../api/axios";

type TParams = {
  role: string;
};

interface UserData extends IUserBase {
  password: string;
}

const FetcherDataForChangePsw = (): React.JSX.Element => {
  const initialState: UserData = {
    id: 0,
    email: "",
    password: "",
  };

  const { role } = useParams<TParams>();
  const [user, setUser] = useState<UserData>(initialState);

  const getDatauser = async (): Promise<void> => {
    try {
      const { data } = await api(`/user?role=${role}`);

      setUser(data);
    } catch ({ message }: any) {
      toast.error(message);
    }
  };

  useEffect(() => {
    getDatauser();
  }, [role]);

  return (
    <Col md={4} className="mx-auto">
      <Card className="py-4">
        <h1 className="h3 text-center">{user.email}</h1>
        <Card.Body>
          <FormChangePsw userId={user.id} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FetcherDataForChangePsw;
