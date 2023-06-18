import { Navigate, Outlet } from "react-router-dom";
import { IPropsProtected } from "../interfaces/IPropsProtected";

interface IProps extends IPropsProtected {
  navigateTo?: string;
}

const ProtectedRoute = ({
  children,
  isAllowed,
  navigateTo = "/auth/login",
}: IProps): React.JSX.Element => {
  if (!isAllowed) return <Navigate to={navigateTo} />;

  return children ?? <Outlet />;
};

export default ProtectedRoute;
