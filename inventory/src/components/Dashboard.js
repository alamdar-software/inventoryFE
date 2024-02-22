import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import CountertopsIcon from "@mui/icons-material/Countertops";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DatasetIcon from "@mui/icons-material/Dataset";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from "@mui/icons-material/Description";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import inventory from "../assects/inventory.jpg";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchItem } from "../redux/slice/ItemSlice";
import { useEffect } from "react";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const theme = createTheme({
  palette: {
    yellow: {
      main: purple[500],
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const Dashboard = () => {
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;
  const roleSuperAdmin =
    currentUser && currentUser.roles[0] === "ROLE_SUPERADMIN";
  const rolePreparer = currentUser && currentUser.roles[0] === "ROLE_PREPARER";
  const roleVerifier = currentUser && currentUser.roles[0] === "ROLE_VERIFIER";
  const roleApprover = currentUser && currentUser.roles[0] === "ROLE_APPROVER";
  const roleOthers = currentUser && currentUser.roles[0] === "ROLE_OTHER";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItem(currentUser.accessToken));
  }, []);

  if (currentUser && currentUser.roles) {
    if (roleSuperAdmin) {
      return (
        // Render grid for ROLE_SUPERADMIN
        <Grid
          sx={{
            // backgroundImage: `url(${inventory})`, // Use the imported image as the background
            // backgroundSize: 'cover',
            margin: "-30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 5,
                width: "100px !important",

                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-inventoryMoc"}
                style={{ textDecoration: "none", position: "relative" }}
              >
                <CardContent>
                  {/* Your small box */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "white", // Set your desired color
                      color: "white", // Set your desired text color
                      padding: 2,
                    }}
                  >
                    {/* <CountertopsIcon
                  fontSize='large'
                  color='primary'
                  sx={{ fontSize: '70px' }}
                /> */}
                  </Box>

                  <CountertopsIcon
                    fontSize="large"
                    color="primary"
                    sx={{
                      fontSize: "50px",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: 'center',
                    }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    MOC
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>

            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 40,
                flex: 1,
                marginTop: 3,
                marginLeft: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/datacount"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DatasetIcon
                    fontSize="large"
                    color="secondary"
                    sx={{ fontSize: "50px" }}
                  />
                  <Typography
                    variant="h5"
                    color="#333"
                    component="div"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Daily Data Count
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 8,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Reports"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <AssessmentIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#ff0000" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Reports
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 8,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Items"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DescriptionIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Items
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/locationDashboard"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'start',
                // }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Location/Vessel
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-inventory"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#64dd17" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Inventory
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/transfer-item"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#9e9e9e", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Transfer Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Link
                to={"/view-consumeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#795548", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h6"
                    component="div"
                  >
                    Consumed Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,

                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-incoming"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#ff5722", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Incomming Stock
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,

                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-scrappeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#00bcd4", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Scrapped Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
        </Grid>
      );
    } else if (rolePreparer) {
      return (
        <Grid
          sx={{
            // backgroundImage: `url(${inventory})`, // Use the imported image as the background
            // backgroundSize: 'cover',
            margin: "-30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 5,
                width: "100px !important",

                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-inventoryMoc"}
                style={{ textDecoration: "none", position: "relative" }}
              >
                <CardContent>
                  {/* Your small box */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "white", // Set your desired color
                      color: "white", // Set your desired text color
                      padding: 2,
                    }}
                  >
                    {/* <CountertopsIcon
                  fontSize='large'
                  color='primary'
                  sx={{ fontSize: '70px' }}
                /> */}
                  </Box>

                  <CountertopsIcon
                    fontSize="large"
                    color="primary"
                    sx={{
                      fontSize: "50px",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: 'center',
                    }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    MOC
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>

            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 40,
                flex: 1,
                marginTop: 3,
                marginLeft: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/datacount"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DatasetIcon
                    fontSize="large"
                    color="secondary"
                    sx={{ fontSize: "50px" }}
                  />
                  <Typography
                    variant="h5"
                    color="#333"
                    component="div"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Daily Data Count
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 8,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Reports"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <AssessmentIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#ff0000" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Reports
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 8,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Items"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DescriptionIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Items
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/locationDashboard"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'start',
                // }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Location/Vessel
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-inventory"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#64dd17" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Inventory
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/transfer-item"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#9e9e9e", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Transfer Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Link
                to={"/view-consumeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#795548", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h6"
                    component="div"
                  >
                    Consumed Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,

                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-incoming"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#ff5722", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Incomming Stock
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,

                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-scrappeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#00bcd4", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Scrapped Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
        </Grid>
        // Render grid for ROLE_PREPARER
      );
    } else if (roleVerifier) {
      return (
        <Grid
          sx={{
            // backgroundImage: `url(${inventory})`, // Use the imported image as the background
            // backgroundSize: 'cover',
            margin: "-30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 40,
                flex: 1,
                marginTop: 3,
                marginLeft: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/datacount"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DatasetIcon
                    fontSize="large"
                    color="secondary"
                    sx={{ fontSize: "50px" }}
                  />
                  <Typography
                    variant="h5"
                    color="#333"
                    component="div"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Daily Data Count
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 8,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Reports"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <AssessmentIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#ff0000" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Reports
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-inventory"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#64dd17" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Inventory
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 5,
                width: "100px !important",

                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/need-verfication"}
                style={{ textDecoration: "none", position: "relative" }}
              >
                <CardContent>
                  {/* Your small box */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "white", // Set your desired color
                      color: "white", // Set your desired text color
                      padding: 2,
                    }}
                  >
                    {/* <CountertopsIcon
                fontSize='large'
                color='primary'
                sx={{ fontSize: '70px' }}
              /> */}
                  </Box>

                  <CountertopsIcon
                    fontSize="large"
                    color="primary"
                    sx={{
                      fontSize: "50px",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: 'center',
                    }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Need Verification
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/locationDashboard"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'start',
                // }}
                >
                  <CheckBoxIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Verified
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/locationDashboard"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'start',
                // }}
                >
                  <CancelIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "red" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Verifier Rejected
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>

            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/transfer-item"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <ThumbDownAltIcon
                    fontSize="large"
                    style={{ color: "red", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Approver Rejected
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Link
                to={"/view-consumeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <DownloadDoneIcon
                    fontSize="large"
                    style={{ color: "#795548", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h6"
                    component="div"
                  >
                    Bulk Verify/Reject Purchase
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
        </Grid>
        // Render grid for ROLE_VERIFIER
      );
    } else if (roleApprover) {
      return (
        <Grid
          sx={{
            // backgroundImage: `url(${inventory})`, // Use the imported image as the background
            // backgroundSize: 'cover',
            margin: "-30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 5,
                width: "100px !important",

                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-inventoryMoc"}
                style={{ textDecoration: "none", position: "relative" }}
              >
                <CardContent>
                  {/* Your small box */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "white", // Set your desired color
                      color: "white", // Set your desired text color
                      padding: 2,
                    }}
                  >
                    {/* <CountertopsIcon
                  fontSize='large'
                  color='primary'
                  sx={{ fontSize: '70px' }}
                /> */}
                  </Box>

                  <CountertopsIcon
                    fontSize="large"
                    color="primary"
                    sx={{
                      fontSize: "50px",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: 'center',
                    }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    MOC
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>

            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 40,
                flex: 1,
                marginTop: 3,
                marginLeft: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/datacount"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DatasetIcon
                    fontSize="large"
                    color="secondary"
                    sx={{ fontSize: "50px" }}
                  />
                  <Typography
                    variant="h5"
                    color="#333"
                    component="div"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Daily Data Count
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 8,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Reports"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <AssessmentIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#ff0000" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Reports
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 8,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Items"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DescriptionIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Items
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/locationDashboard"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'start',
                // }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Location/Vessel
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-inventory"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#64dd17" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Inventory
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/transfer-item"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#9e9e9e", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Transfer Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Link
                to={"/view-consumeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#795548", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h6"
                    component="div"
                  >
                    Consumed Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,

                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-incoming"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#ff5722", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Incomming Stock
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,

                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-scrappeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#00bcd4", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Scrapped Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
        </Grid>
        // Render grid for ROLE_APPROVER
      );
    } else if (roleOthers) {
      return (
        <Grid
          sx={{
            // backgroundImage: `url(${inventory})`, // Use the imported image as the background
            // backgroundSize: 'cover',
            margin: "-30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 5,
                width: "100px !important",

                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-inventoryMoc"}
                style={{ textDecoration: "none", position: "relative" }}
              >
                <CardContent>
                  {/* Your small box */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "white", // Set your desired color
                      color: "white", // Set your desired text color
                      padding: 2,
                    }}
                  >
                    {/* <CountertopsIcon
                  fontSize='large'
                  color='primary'
                  sx={{ fontSize: '70px' }}
                /> */}
                  </Box>

                  <CountertopsIcon
                    fontSize="large"
                    color="primary"
                    sx={{
                      fontSize: "50px",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: 'center',
                    }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    MOC
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>

            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 40,
                flex: 1,
                marginTop: 3,
                marginLeft: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/datacount"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DatasetIcon
                    fontSize="large"
                    color="secondary"
                    sx={{ fontSize: "50px" }}
                  />
                  <Typography
                    variant="h5"
                    color="#333"
                    component="div"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Daily Data Count
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 8,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Reports"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <AssessmentIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#ff0000" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Reports
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 8,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Items"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DescriptionIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Items
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/locationDashboard"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'start',
                // }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Location/Vessel
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-inventory"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#64dd17" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Inventory
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/transfer-item"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#9e9e9e", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Transfer Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Link
                to={"/view-consumeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#795548", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h6"
                    component="div"
                  >
                    Consumed Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,

                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-incoming"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#ff5722", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Incomming Stock
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                //border: '2px solid yellow',
                minWidth: 20,

                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 8,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-scrappeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#00bcd4", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Scrapped Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
        </Grid>
        // Render grid for ROLE_OTHER
      );
    }
  }
};

export default Dashboard;
