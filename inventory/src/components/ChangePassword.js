import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.persisted.user);
  const [formData, setformData] = useState({});
  const [open, setOpen] = React.useState(true); // Open the modal by default

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/updatePassword", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        navigate("/");
        window.location.reload();

        /* window.location.reload(); */
        /*  console.log(currentUser, "currentlaga"); */
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formData, "formm");

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={open}
      onClose={handleClose}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      BackdropProps={{
        sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" }, // Greyed-out background
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 400,
          bgcolor: "white",
          border: "2px solid #000",
          boxShadow: (theme) => theme.shadows[5],
          p: 4,
        }}
      >
        <Typography id="server-modal-title" variant="h6" component="h2">
          Change Password
        </Typography>
        <TextField
          id="oldPassword"
          label="Old Password"
          type="password"
          fullWidth
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          id="newPassword"
          label="New Password"
          type="password"
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ChangePassword;
