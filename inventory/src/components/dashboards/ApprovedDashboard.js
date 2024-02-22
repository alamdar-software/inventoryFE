import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CountertopsIcon from "@mui/icons-material/Countertops";
import DatasetIcon from "@mui/icons-material/Dataset";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SummarizeIcon from "@mui/icons-material/Summarize";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";

import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchItem } from "../../redux/slice/ItemSlice";
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

const ApprovedDashboard = () => {
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;

  const roleApprover = currentUser && currentUser.roles[0] === "ROLE_APPROVER";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItem(currentUser.accessToken));
  }, []);
  if (currentUser && currentUser.roles) {
    if (roleApprover) {
      return (
        <>
          {/* <img src={inv}></img> */}
          <Grid
            sx={{
              // backgroundImage: `url(${inventory})`, // Use the imported image as the background
              // backgroundSize: 'cover',
              margin: "-30px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 15,
                marginRight: 25,
              }}
            >
              <Card
                sx={{
                  flex: 1,
                  marginRight: 3,
                  marginLeft: 3,
                  marginTop: 3,
                  borderRadius: 5,
                  width: "80px !important",

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

                    <SummarizeIcon
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
                      Approved Cipl
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
                    <ArticleIcon
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
                      Approved Mto
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
                    <SummarizeIcon
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
                      Approved It
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
                    <ArticleIcon
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
                      Approved Incoming Stock
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 5,
                paddingRight: 700,
              }}
            >
              <Card
                sx={{
                  //border: '2px solid yellow',
                  minWidth: 10,
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
                    <ArticleIcon
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
                      Approved Scrapped Stock
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
                  minWidth: 10,
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
                    <SummarizeIcon
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
                      Approved Consumed Stock
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Count:
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </Grid>
        </>
      );
    }
  }
};

export default ApprovedDashboard;
