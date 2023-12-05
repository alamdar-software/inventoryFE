import {
  Button,
  Card,
  CardContent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

const Consignee = () => {
  const [formData, setformData] = useState({
    name: "",
    address: "",
    pincode: "",
    email: "",
    phoneNumber: "",
    notifyParty: "",
    deliveryAddress: "",
    location: "null",
  });
  // console.log(formData, 'hey');
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/consignee/add", {
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
  const handleInputChange = async (e) => {
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
              id="outlined-basic"
              label="Consignee Name"
              variant="outlined"
              onChange={(e) =>
                setformData({
                  ...formData,
                  name: e.target.value,
                })
              }
              //   value={location}
              //   onChange={(e) => setLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="address"
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
              id="outlined-basic"
              label="Postal Code"
              variant="outlined"
              onChange={(e) =>
                setformData({
                  ...formData,
                  pincode: e.target.value,
                })
              }
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="deliveryAddress"
              label="deliveryAddress"
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
              id="outlined-basic"
              label="Contact Number"
              variant="outlined"
              onChange={(e) =>
                setformData({
                  ...formData,
                  phoneNumber: e.target.value,
                })
              }
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
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
        </Grid>

        <Grid container spacing={2} sx={{ mt: "21px", ml: "13px" }}></Grid>
        <Grid container spacing={2} sx={{ mt: "21px", ml: "13px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="notifyParty"
              label="notifyParty"
              variant="outlined"
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={10} sm={6}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"age"}
              label="Age"
              fullWidth
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
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
