import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import { Link } from "react-router-dom";
const TransferItem = () => {
  return (
    <>
      <Card
        color="secondary"
        sx={{
          width: "100%",
          borderBottom: "2px solid #ab47bc",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            color="secondary"
            gutterBottom
            style={{ fontFamily: "'EB Garamond'" }}
          >
            Transfer Item Dashboard
          </Typography>
        </CardContent>
      </Card>
      <Grid sx={{ display: "flex", justifyContent: "center", mt: "23px" }}>
        <Link to="/cipl" sx={{ textDecoration: "none" }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent sx={{ justifyContent: "center", p: "90px" }}>
              <TransferWithinAStationIcon
                sx={{ fontSize: "60px", color: "#DD7071" }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bolder" }}
              >
                CIPL
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>
        <Link to="/mto">
          <Card sx={{ minWidth: 275, ml: "31px" }}>
            <CardContent sx={{ justifyContent: "center", p: "90px" }}>
              <EditNoteIcon sx={{ fontSize: "60px", color: "#15A4C3" }} />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bolder" }}
              >
                MTO
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>
        <Link to="/it">
          <Card sx={{ minWidth: 275, ml: "31px" }}>
            <CardContent sx={{ justifyContent: "center", p: "70px" }}>
              <FlipCameraIosIcon sx={{ fontSize: "60px", color: "#91E96B" }} />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bolder" }}
              >
                Internal <br /> Transfer
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>
      </Grid>
    </>
  );
};

export default TransferItem;
