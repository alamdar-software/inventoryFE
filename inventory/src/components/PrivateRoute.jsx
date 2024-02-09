import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.persisted.user);
  const location = useLocation();
  useEffect(() => {
    if (!currentUser) {
      window.location.reload();
    }
  }, [currentUser]);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
  window.location.reload();
};

export default PrivateRoute;
