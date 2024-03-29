import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const { currentUser } = useSelector((state) => state.persisted.user);
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const [formData, setformData] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/addUser", {
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
        navigate("/login");
        window.location.reload();

        /* window.location.reload(); */
        /*  console.log(currentUser, "currentlaga"); */
      }
    } catch (error) {
      console.log(error.message);
    }

    console.log(formData, "formmm");
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    console.log("Selected ID:", id); // Check the selected ID
    console.log("Selected Value:", value); // Check the selected value
    const parsedValue = id === "contactNumber" ? parseInt(value) : value;
    setformData({
      ...formData,
      [id]: parsedValue,
    });
    setSelectedRole(value); // Update the selectedRole state with the selected value
    console.log("Form Data:", formData); // Log the updated form data
  };

  console.log(formData, "umersah");
  console.log(formData.role, "jdncjwncj");
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  id="contactNumber"
                  label="Contact  Number"
                  name="contactNumber"
                  autoComplete="contactNumber"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="role">Select Role</InputLabel>
                <Select
                  id="role"
                  fullWidth
                  label="Select Role"
                  placeholder="select Role"
                  value={selectedRole} // Set the value prop to the selected role state variable
                  onChange={(e) => {
                    setformData({ ...formData, role: e.target.value });
                  }}
                  /*  value={selectedOption} */ // Provide a state variable to hold the selected option
                  /* onChange={handleSelectChange} */ // Provide a function to handle changes in the select
                >
                  <MenuItem value="ROLE_SUPERADMIN">ROLE_SUPERADMIN</MenuItem>
                  <MenuItem value="ROLE_VERIFIER">ROLE_VERIFIER</MenuItem>
                  <MenuItem value="ROLE_PREPARER">ROLE_PREPARER</MenuItem>
                  <MenuItem value="ROLE_APPROVER">ROLE_APPROVER</MenuItem>
                  <MenuItem value="ROLE_OTHER">ROLE_OTHER</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
