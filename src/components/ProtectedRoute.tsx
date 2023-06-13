import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  children,
  isAllowed,
  navigateTo = "/auth/login",
}) => {
  if (!isAllowed) return <Navigate to={navigateTo} />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
