import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

const Consignee = () => {
  const [formData, setformData] = useState({
    name: "",
    adress: "",
    pincode: "",
    email: "",
    phoneNumber: "",
    NotifyParty: "",
    deliveryAdress: "",
  });
  console.log(formData, "hey");
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://192.168.1.10:8080/consignee/add", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, "resdata");
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  const handleInputChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <>
      <Grid>
        <Card
          color="secondary"
          sx={{
            width: "100%",
            backgroundColor: "secondary",
            borderBottom: "2px solid yellow",
          }}
        >
          <CardContent>
            <Typography variant="h4" color="secondary" gutterBottom>
              Create Consignee
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Card
        sx={{
          width: "100%",
          mt: "33px",
          pt: "33px",
          borderBottom: "2px solid yellow",
          borderRadius: "33px",
        }}
      >
        <Grid container spacing={2} sx={{ ml: "13px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="name"
              label="Consignee Name"
              variant="outlined"
              onChange={handleInputChange}
              //   value={location}
              //   onChange={(e) => setLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="adress"
              label="Address "
              variant="outlined"
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ ml: "13px", mt: "21px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="pincode"
              label="Postal Code"
              variant="outlined"
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="deliveryAdress"
              label="Delivery Address"
              variant="outlined"
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: "21px", ml: "13px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phoneNumber"
              label="Contact Number"
              variant="outlined"
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: "21px", ml: "13px" }}></Grid>
        <Grid container spacing={2} sx={{ mt: "21px", ml: "13px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="NotifyParty"
              label="Notify Party"
              variant="outlined"
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          //onClick={handleClick}
          onClick={handleClick}
          sx={{
            mt: "33px",
            mb: "17px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
        >
          Add
        </Button>
      </Card>
    </>
  );
};

export default Consignee;
