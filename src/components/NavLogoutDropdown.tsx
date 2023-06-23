import { NavLink, NavigateFunction, useNavigate } from "react-router-dom";
import { Dropdown, Image, Button } from "react-bootstrap";
import { BiLogOutCircle } from "react-icons/bi";
import { AuthState, resetUserAuthenticated } from "../features/auth/authSlice";
import { resetQueryDataReports } from "../features/reports/reportsSlice";
import { resetQueryDataStatistics } from "../features/statistics/statisticsSlice";
import { resetFormDataAdmin } from "../features/admin/adminSlice";
import { resetAllFormDataProgramming } from "../features/programming/programmingSlice";
import { srcUser } from "../App";
import { useAppDispatch, useAppSelector } from "../hooks";
import { destroyTemporals } from "../features/temp/tempSlice";

interface IProps {
  avatar: srcUser["avatar"];
}

const NavLogoutDropdown = ({ avatar }: IProps): React.JSX.Element => {
  const authState: AuthState = useAppSelector(({ auth }) => auth);

  const dispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();

  const logout = (): void => {
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
        <Button onClick={logout} className="dropdown-item">
          Cerrar sesión <BiLogOutCircle />
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavLogoutDropdown;
