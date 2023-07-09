import { Button, Dropdown, Image } from "react-bootstrap";
import { BiLogOutCircle } from "react-icons/bi";
import { NavLink, NavigateFunction, useNavigate } from "react-router-dom";
import { resetFormDataAdmin } from "../features/admin/adminSlice";
import { AuthState, resetUserAuthenticated } from "../features/auth/authSlice";
import { resetAllFormDataProgramming } from "../features/programming/programmingSlice";
import { resetQueryDataReports } from "../features/reports/reportsSlice";
import { resetQueryDataStatistics } from "../features/statistics/statisticsSlice";
import { destroyTemporals } from "../features/temp/tempSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

interface IProps {
    avatar: string;
}

export default function NavLogoutDropdown({
    avatar,
}: IProps): React.JSX.Element {
    const authState: AuthState = useAppSelector(({ auth }) => auth);

    const dispatch = useAppDispatch();

    const navigate: NavigateFunction = useNavigate();

    const logout = () => {
        if (
            !confirm(
                `${authState.user.name} estás seguro(a)que deseas cerrar sesión?`
            )
        )
            return;

        dispatch(resetUserAuthenticated());
        dispatch(resetFormDataAdmin());
        dispatch(resetQueryDataReports());
        dispatch(resetQueryDataStatistics());
        dispatch(resetAllFormDataProgramming());
        dispatch(destroyTemporals());
        navigate("/auth/login");
    };

    return (
        <Dropdown>
            <Dropdown.Toggle
                as="a"
                className="d-flex align-items-center mt-3 mt-lg-0 mb-2 mb-lg-0 link-dark text-decoration-none me-3"
            >
                <Image roundedCircle src={avatar} width="40" alt="Account" />
            </Dropdown.Toggle>

            <Dropdown.Menu
                align={{ lg: "end" }}
                className="border-0 shadow-sm rounded-3 bg-white"
            >
                <NavLink to="/help/asks/frecuently" className="dropdown-item">
                    FAQs
                </NavLink>
                <NavLink
                    to={`/users/manage/password/${authState.user.id}/change`}
                    className="dropdown-item"
                >
                    Cambiar contraseña
                </NavLink>
                <Dropdown.Divider />
                <Button
                    onClick={logout}
                    className="dropdown-item text-bg-light"
                >
                    Cerrar sesión <BiLogOutCircle />
                </Button>
            </Dropdown.Menu>
        </Dropdown>
    );
}
