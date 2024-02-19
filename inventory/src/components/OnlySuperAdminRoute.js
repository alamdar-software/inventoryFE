import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const OnlySuperAdmin = () => {
  const { currentUser } = useSelector((state) => state.persisted.user);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Adjust the time in milliseconds (e.g., 3000 for 3 seconds)

    // Clear the timeout when the component unmounts or when showAlert becomes false
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {showAlert && (
        <Alert severity="warning">
          You are not able to see the user details.
        </Alert>
      )}
      {currentUser.roles[0] === "ROLE_SUPERADMIN" ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default OnlySuperAdmin;
