import { useEffect } from "react";
import { Button, ButtonGroup, FormControl, Spinner } from "react-bootstrap";
import { FaSyncAlt } from "react-icons/fa";
import { ImUserPlus } from "react-icons/im";
import { IoCalendarNumber } from "react-icons/io5";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
    People,
    setFind,
    setPeople,
    setPeopleOrigen,
} from "../features/people/peopleSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { notify } from "../libs/toast";
import * as peopleService from "../services/people.service";
import { THandleChangeI } from "../types/THandleChanges";
import TablePeople from "./TablePeople";

export default function Searcher(): React.JSX.Element {
    const dispatch = useAppDispatch();

    const peopleOrigenState: People[] = useAppSelector(
        ({ people }) => people.peopleOrigen
    );
    const findState: string = useAppSelector(({ people }) => people.find);

    const { data, error, isLoading, refetch } = useQuery<[], any>(
        "people",
        peopleService.getPeople
    );

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
        if (data) {
            dispatch(setPeopleOrigen(data));
            if (findState === "") dispatch(setPeople(data));
            else filterPeople();
        }
        if (error) notify(error.response.data.error, { type: "error" });
    }, [data, error]);

    const handleChange = (e: THandleChangeI) =>
        dispatch(setFind(e.target.value.toLocaleLowerCase()));

    const handleClick = () => {
        dispatch(setFind(""));
        refetch();
    };

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
                    onClick={handleClick}
                    title="Refrescar datos"
                >
                    {isLoading ? (
                        <Spinner size="sm" />
                    ) : (
                        <FaSyncAlt className="mb-1" />
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
}
