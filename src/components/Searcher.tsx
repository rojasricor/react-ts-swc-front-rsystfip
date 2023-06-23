import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner, FormControl, Button, ButtonGroup } from "react-bootstrap";
import TablePeople from "./TablePeople";
import {
  setPeople,
  setPeopleOrigen,
  setIsLoading,
  People,
  setFind,
} from "../features/people/peopleSlice";
import { FaSyncAlt, FaTimes } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { ImUserPlus } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../hooks";
import { THandleChangeI } from "../types/THandleChanges";
import { api } from "../api/axios";

const Searcher = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const peopleOrigenState: People[] = useAppSelector(
    ({ people }) => people.peopleOrigen
  );
  const isLoadingState: number = useAppSelector(
    ({ people }) => people.isLoading
  );
  const findState: string = useAppSelector(({ people }) => people.find);

  const getPeople = async (): Promise<void> => {
    try {
      const { data } = await api("/people");

      dispatch(setPeopleOrigen(data));
      findState !== "" ? filterPeople() : dispatch(setPeople(data));
    } catch ({ message }: any) {
      dispatch(setIsLoading(2));
      toast.error(message);
    } finally {
      dispatch(setIsLoading(1));
    }
  };

  const filterPeople = (): void => {
    dispatch(
      setPeople(
        peopleOrigenState.filter(
          ({ name, document_number }) =>
            name.toLowerCase().startsWith(findState) ||
            document_number.startsWith(findState)
        )
      )
    );
  };

  useEffect(() => {
    getPeople();
  }, []);

  const handleChange = (e: THandleChangeI) =>
    dispatch(setFind(e.target.value.toLocaleLowerCase()));

  useEffect(() => {
    filterPeople();
  }, [findState]);

  return (
    <>
      <ButtonGroup className="position-fixed bottom-px">
        <FormControl
          name="find"
          className="bg-white"
          onChange={handleChange}
          value={findState}
          type="search"
          size="sm"
          placeholder="Buscar"
          spellCheck={false}
          autoComplete="off"
          autoFocus
        />
        <Button
          variant="dark"
          onClick={() => getPeople()}
          title="Refrescar datos"
        >
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
          className="btn btn-dark"
          title="Agendamiento por día"
        >
          <ImUserPlus className="mb-1" />
        </Link>
        <Link
          to="/people/schedule"
          className="btn btn-dark"
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
