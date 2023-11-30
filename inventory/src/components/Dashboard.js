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
import DescriptionIcon from "@mui/icons-material/Description";
import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
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
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
        <Card
          sx={{
            border: "2px solid yellow",
            minWidth: 20,
            flex: 1,
            marginRight: 3,
            marginLeft: 3,
            marginTop: 3,
            borderRadius: 8,
          }}
        >
          <Link to={"/MOC"} style={{ textDecoration: "none" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "Start",
              }}
            >
              <CountertopsIcon
                fontSize="large"
                color="primary"
                sx={{ alignItems: "Center" }}
              />

              <Typography
                sx={{ mb: 1.5, textAlign: "right" }}
                color="text.secondary"
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
            border: "2px solid yellow",
            minWidth: 20,
            flex: 1,
            marginTop: 3,
            marginLeft: 3,
            borderRadius: 8,
          }}
        >
          <Link to={"/datacount"} style={{ textDecoration: "none" }}>
            <CardContent>
              <DatasetIcon fontSize="large" color="secondary" />
              <Typography variant="h5" color="text.secondary" component="div">
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
            border: "2px solid yellow",
            minWidth: 20,
            flex: 1,
            marginLeft: 3,
            borderRadius: 8,
            marginTop: 3,
          }}
        >
          <Link to={"/Reports"} style={{ textDecoration: "none" }}>
            <CardContent>
              <AssessmentIcon fontSize="large" style={{ color: "#ff0000" }} />
              <Typography variant="h5" component="div" color="text.secondary">
                Reports
              </Typography>
            </CardContent>
          </Link>
        </Card>
        <Card
          sx={{
            border: "2px solid yellow",
            minWidth: 20,
            flex: 1,
            marginLeft: 3,
            borderRadius: 8,
            marginTop: 3,
          }}
        >
          <Link to={"/Items"} style={{ textDecoration: "none" }}>
            <CardContent>
              <DescriptionIcon fontSize="large" style={{ color: "#c6ff00" }} />
              <Typography variant="h5" component="div" color="text.secondary">
                Items
              </Typography>
            </CardContent>
          </Link>
        </Card>
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
        <Card
          sx={{
            border: "2px solid yellow",
            minWidth: 20,
            flex: 1,
            marginRight: 3,
            marginLeft: 3,
            marginTop: 3,
            borderRadius: 8,
          }}
        >
          <Link to={"/Location-Vessel"} style={{ textDecoration: "none" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <CountertopsIcon fontSize="large" style={{ color: "#c6ff00" }} />

              <Typography
                sx={{ mb: 1.5, textAlign: "right" }}
                color="text.secondary"
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
            border: "2px solid yellow",
            minWidth: 20,
            flex: 1,
            marginRight: 3,
            marginLeft: 3,
            marginTop: 3,
            borderRadius: 8,
          }}
        >
          <Link to={"/Inventory"} style={{ textDecoration: "none" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <CountertopsIcon fontSize="large" style={{ color: "#64dd17" }} />

              <Typography
                sx={{ mb: 1.5, textAlign: "right" }}
                color="text.secondary"
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
            border: "2px solid yellow",
            minWidth: 20,
            flex: 1,
            marginRight: 3,
            marginLeft: 3,
            marginTop: 3,
            borderRadius: 8,
          }}
        >
          <Link to={"/Transfer-Items"} style={{ textDecoration: "none" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <CountertopsIcon fontSize="large" style={{ color: "#9e9e9e" }} />

              <Typography
                sx={{ mb: 1.5, textAlign: "right" }}
                color="text.secondary"
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
            border: "2px solid yellow",
            minWidth: 20,
            flex: 1,
            marginRight: 3,
            marginLeft: 3,
            marginTop: 3,
            borderRadius: 8,
          }}
        >
          <Link to={"/Consumed-Items"} style={{ textDecoration: "none" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <CountertopsIcon fontSize="large" style={{ color: "#795548" }} />

              <Typography
                sx={{ mb: 1, textAlign: "right" }}
                color="text.secondary"
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
            border: "2px solid yellow",
            minWidth: 20,

            marginRight: 3,
            marginLeft: 3,
            marginTop: 3,
            borderRadius: 8,
            width: "23%",
          }}
        >
          <Link to={"/Incoming-Stock"} style={{ textDecoration: "none" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <CountertopsIcon fontSize="large" style={{ color: "#ff5722" }} />

              <Typography
                sx={{ mb: 1.5, textAlign: "right" }}
                color="text.secondary"
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
            border: "2px solid yellow",
            minWidth: 20,

            marginRight: 3,
            marginLeft: 3,
            marginTop: 3,
            borderRadius: 8,
            width: "23%",
          }}
        >
          <Link to={"/Scrapped-Item"} style={{ textDecoration: "none" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <CountertopsIcon fontSize="large" style={{ color: "#00bcd4" }} />

              <Typography
                sx={{ mb: 1.5, textAlign: "right" }}
                color="text.secondary"
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
    </>
  );
};

export default Dashboard;
