import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const OnlySuperAdmin = () => {
  const { currentUser } = useSelector((state) => state.persisted.user);

  useEffect(() => {
    if (currentUser.roles[0] !== "ROLE_SUPERADMIN") {
      window.location.reload();
    }
  }, [currentUser.roles]);
  return currentUser.roles[0] === "ROLE_SUPERADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default OnlySuperAdmin;
