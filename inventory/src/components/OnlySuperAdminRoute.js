import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const OnlySuperAdmin = () => {
  const { currentUser } = useSelector((state) => state.persisted.user);
  const location = useLocation();
  useEffect(() => {
    if (!currentUser.roles[0] === "ROLE_SUPERADMIN") {
      alert("You Are Not Super Admin");
      window.location.reload();
    }
  }, [currentUser]);

  return currentUser.roles[0] === "ROLE_SUPERADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
  window.location.reload();
};

export default OnlySuperAdmin;
