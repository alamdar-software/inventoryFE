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
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import inventoryBackground from "../../inventory.jpg";
import {
  signInFailure,
  signinStart,
  signInSuccess,
} from "../../redux/slice/UserSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser } = useSelector((state) => state.persisted.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, seterror] = useState(null);

  const [formData, setformData] = useState({});
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(signinStart());
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/dashboard");

        console.log(currentUser.accessToken, "mujhepatahai");
        /* window.location.reload(); */
        /*  console.log(currentUser, "currentlaga"); */
      } else {
        console.log("invaliddddmessage");
        seterror("invalid credentials");
      }
    } catch (error) {
      seterror(error.message);
      dispatch(signInFailure());
    }

    console.log(formData, "formmm");
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${inventoryBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            flex: 1,
          }}
        />
        <Container
          component="main"
          maxWidth="xs"
          style={{ backgroundColor: " rgb(241, 245, 241)" }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: " rgb(241, 245, 241)",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onSubmit={handleSubmit}
              >
                Sign In
              </Button>
              {error && (
                <div
                  style={{
                    fontSize: "15px",
                    marginRight: "8px",
                    backgroundColor: "#ffc6c4",
                    padding: "8px",
                    paddingTop: "10px",

                    fontWeight: "bold",
                    borderRadius: "10px",
                    textAlign: "center", // Align text center
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  {<p>{error}</p>}
                </div>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
