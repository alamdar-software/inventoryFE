import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const VerifierandApprover = () => {
  const { currentUser } = useSelector((state) => state.persisted.user);

  /* useEffect(() => {
    console.log(currentUser.roles[0], "jamamama");
    if (
      currentUser.roles[0] !== "ROLE_VERIFIER" ||
      currentUser.roles[0] !== "ROLE_APPROVER"
    ) {
      window.location.reload();
    }
  }, [currentUser.roles[0]]); */
  return currentUser.roles[0] === "ROLE_VERIFIER" ||
    currentUser.roles[0] === "ROLE_APPROVER" ||
    currentUser.roles[0] === "ROLE_OTHER" ||
    currentUser.roles[0] === "ROLE_SUPERADMIN" ||
    currentUser.roles[0] === "ROLE_PREPARER" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default VerifierandApprover;
