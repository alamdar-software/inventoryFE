import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const OnlyOther = () => {
  const { currentUser } = useSelector((state) => state.persisted.user);

  return currentUser.roles[0] === "ROLE_PREPARER" ||
    currentUser.roles[0] === "ROLE_OTHER" ||
    currentUser.roles[0] === "ROLE_APPROVER" ||
    currentUser.roles[0] === "ROLE_VERIFIER" ||
    currentUser.roles[0] === "ROLE_SUPERADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default OnlyOther;
