import { Navigate, Outlet } from "react-router-dom";
import { IPropsProtected } from "../interfaces/IPropsProtected";

interface Props extends IPropsProtected {
  navigateTo?: string;
}

const ProtectedRoute = ({
  children,
  isAllowed,
  navigateTo = "/auth/login",
}: Props): React.JSX.Element => {
  if (!isAllowed) return <Navigate to={navigateTo} />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
