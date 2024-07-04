import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router";
import { useUser } from "./context/userContext";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/",
}) => {
  const { user } = useUser();
  const location = useLocation();

  const isUserComplete = Boolean(user.name && user.phone && user.email);

  if (!isUserComplete) {
    return (
      <Navigate
        to={redirectPath}
        state={{
          from: location.pathname,
          message:
            "Please enter your details before accessing the second page.",
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
