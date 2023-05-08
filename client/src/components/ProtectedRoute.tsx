import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")!)?.user;

  let location = useLocation();

  if (!currentUser)
    return (
      <Navigate to={"/login"} replace state={{ from: location.pathname }} />
    );

  return <Outlet />;
};

export default ProtectedRoute;
