import { useEffect } from "react";
import { Button, ButtonGroup, FormControl, Spinner } from "react-bootstrap";
import { FaSyncAlt, FaTimes } from "react-icons/fa";
import { ImUserPlus } from "react-icons/im";
import { IoCalendarNumber } from "react-icons/io5";
import { Link } from "react-router-dom";
import { api } from "../api/axios";
import {
    People,
    setFind,
    setIsLoading,
    setPeople,
    setPeopleOrigen,
} from "../features/people/peopleSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { notify } from "../libs/toast";
import { THandleChangeI } from "../types/THandleChanges";
import TablePeople from "./TablePeople";

export default function Searcher(): React.JSX.Element {
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
        } catch (error: any) {
            notify(error.response.data.error, { type: "error" });
            dispatch(setIsLoading(2));
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
}
