import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ROUTE } from "../constants";
import { Spinner, FormControl, Button, ButtonGroup } from "react-bootstrap";
import TablePeople from "./TablePeople";
import {
  setPeople,
  setPeopleOrigen,
  setIsLoading,
} from "../features/people/peopleSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaSyncAlt, FaTimes } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { ImUserPlus } from "react-icons/im";

const Searcher = () => {
  const dispatch = useDispatch();

  const peopleOrigenState = useSelector(({ people }) => people.peopleOrigen);
  const isLoadingState = useSelector(({ people }) => people.isLoading);

  const getPeople = async () => {
    try {
      const { data } = await axios(`${API_ROUTE}/people`);

      dispatch(setPeople(data));
      dispatch(setPeopleOrigen(data));
    } catch ({ message }) {
      dispatch(setIsLoading(2));
      toast.error(message);
    } finally {
      dispatch(setIsLoading(1));
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  const filterPeople = (e) => {
    const query = e.target.value.toLowerCase();

    dispatch(
      setPeople(
        peopleOrigenState.filter(
          ({ name, document_number }) =>
            name.toLowerCase().startsWith(query) ||
            document_number.startsWith(query)
        )
      )
    );
  };

  return (
    <>
      <ButtonGroup className="position-fixed bottom-px">
        <FormControl
          onChange={filterPeople}
          type="search"
          size="sm"
          placeholder="Buscar"
          autoFocus
        />
        <Button onClick={() => getPeople()} title="Refrescar datos">
          {isLoadingState === 0 ? (
            <Spinner size="sm" />
          ) : isLoadingState === 1 ? (
            <FaSyncAlt className="mb-1" />
          ) : (
            <FaTimes className="text-danger mb-1" />
          )}
        </Button>
        <Link
          to="/people/add"
          className="btn btn-primary"
          title="Agendamiento por día"
        >
          <ImUserPlus className="mb-1" />
        </Link>
        <Link
          to="/people/schedule"
          className="btn btn-primary"
          title="Agendamiento programado"
        >
          <IoCalendarNumber className="mb-1" />
        </Link>
      </ButtonGroup>
      <TablePeople />
    </>
  );
};

export default Searcher;
