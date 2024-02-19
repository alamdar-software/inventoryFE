import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const OnlyApprover = () => {
  const { currentUser } = useSelector((state) => state.persisted.user);

  return currentUser.roles[0] === "ROLE_APPROVER" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default OnlyApprover;
