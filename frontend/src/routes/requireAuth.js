import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ roles }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (!user.token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (roles && !roles.some((r) => user.role?.includes(r))) {
    console.log("access denied");
  }

  return <Outlet />;
};

export default RequireAuth;
