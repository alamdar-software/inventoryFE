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
import AssessmentIcon from "@mui/icons-material/Assessment";
import SummarizeIcon from "@mui/icons-material/Summarize";
import SendIcon from "@mui/icons-material/Send";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ArchiveIcon from "@mui/icons-material/Archive";
import { Link } from "react-router-dom";
const StockReportDashboard = () => {
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
            Stock Report
          </Typography>
        </CardContent>
      </Card>
      <Grid sx={{ display: "flex", justifyContent: "center", mt: "23px" }}>
        <Link to="/searchInventory" style={{ textDecoration: "none" }}>
          <Card sx={{ minWidth: 300 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <AssessmentIcon sx={{ fontSize: "70px", color: "#DD7071" }} />
              <Typography
                component="div"
                sx={{ fontWeight: "bolder", fontSize: "20px" }}
              >
                Inventory Stock Report
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>
        <Link to="/searchIncoming" style={{ textDecoration: "none" }}>
          <Card sx={{ minWidth: 300, ml: "31px" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <SummarizeIcon sx={{ fontSize: "70px", color: "#15A4C3" }} />
              <Typography
                component="div"
                sx={{ fontWeight: "bolder", fontSize: "20px" }}
              >
                Incoming Stock Report
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>
        <Link to="/stockReport" style={{ textDecoration: "none" }}>
          <Card sx={{ minWidth: 300, ml: "31px" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <SendIcon sx={{ fontSize: "70px", color: "#91E96B" }} />
              <Typography
                component="div"
                sx={{ fontWeight: "bolder", fontSize: "20px" }}
              >
                Stock Movement
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "center", mt: "23px" }}>
        <Link to="/cipl" style={{ textDecoration: "none" }}>
          <Card sx={{ minWidth: 300 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <AccountBalanceWalletIcon
                sx={{ fontSize: "70px", color: "#91E96B" }}
              />
              <Typography
                component="div"
                sx={{ fontWeight: "bolder", fontSize: "20px" }}
              >
                Inventory Report By Item
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>
        <Link to="/mto" style={{ textDecoration: "none" }}>
          <Card sx={{ minWidth: 300, ml: "31px" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <AnalyticsIcon sx={{ fontSize: "70px", color: "#DD7071" }} />
              <Typography
                component="div"
                sx={{ fontWeight: "bolder", fontSize: "20px" }}
              >
                Location/Vessel Report
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>
      </Grid>
    </>
  );
};

export default StockReportDashboard;
