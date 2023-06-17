import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import FormChangePsw from "./FormChangePsw";
import { API_ROUTE } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { IUserBase } from "../interfaces/IUserBase";

type Params = {
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

  const { role } = useParams<Params>();
  const [user, setUser] = useState<UserData>(initialState);

  const getDatauser = async (): Promise<void> => {
    try {
      const { data } = await axios(`${API_ROUTE}/user?role=${role}`);

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
