import { Navigate, Outlet } from "react-router-dom";
import { PropsProtected } from "../interfaces/PropsProtected";

interface Props extends PropsProtected {
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
