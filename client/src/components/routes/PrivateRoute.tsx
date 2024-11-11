import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
function PrivateRoute() {
  const { currentUser } = useSelector((state: any) => state.user);
  return currentUser.email !== "" ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;
