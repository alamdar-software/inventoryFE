import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UpdatePickup = () => {
  const [pickupLists, setPickupLists] = useState();
  const [pickupAddress, setPickupAddress] = useState();
  const [pic, setPic] = useState();
  const [companyName, setCompanyName] = useState();
  const [countryCode, setCountryCode] = useState();
  const [contactNumber, setContactNumber] = useState();

  let navigate = useNavigate();

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:8080/pickup/get/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPickupLists(result);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const update = {
      pickupLists,
    };
    console.log(update);

    fetch(`http://localhost:8080/pickup/edit/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(pickupLists),
    })
      .then(() => {
        console.log("Class Updated");
        // navigate('/location-Vessel');
      })
      .catch((error) => {
        console.error("Error updating class:", error);
      });
  };

  return (
    <>
      <Grid>
        <Card
          color="secondary"
          sx={{
            width: "100%",
            // background:
            //   'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)',

            borderBottom: "2px solid #ab47bc",
          }}
        >
          <CardContent>
            <Typography variant="h4" color="secondary" gutterBottom>
              Update Pickup
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Card
        sx={{
          width: "100%",
          mt: "33px",
          pt: "33px",
          borderBottom: "2px solid #ab47bc",
          borderRadius: "33px",
        }}
      >
        <Grid container spacing={2} sx={{ ml: "13px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Pickup Address"
              variant="outlined"
              value={pickupLists ? pickupLists.pickupAddress : ""}
              //   onChange={(e) => setPickupAddress(e.target.value)}
              onChange={(e) => {
                setPickupLists({
                  ...pickupLists,
                  pickupAddress: e.target.value,
                });
                setPickupAddress(e.target.value);
              }}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="PIC"
              variant="outlined"
              value={pickupLists ? pickupLists.pic : ""}
              onChange={(e) => {
                setPickupLists({
                  ...pickupLists,
                  pic: e.target.value,
                });
                setPic(e.target.value);
              }}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ ml: "13px", mt: "21px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Company Name"
              variant="outlined"
              value={pickupLists ? pickupLists.companyName : ""}
              onChange={(e) => {
                setPickupLists({
                  ...pickupLists,
                  companyName: e.target.value,
                });
                setCompanyName(e.target.value);
              }}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Country Code"
              type="number"
              variant="outlined"
              value={pickupLists ? pickupLists.countryCode : ""}
              onChange={(e) => {
                setPickupLists({
                  ...pickupLists,
                  countryCode: e.target.value,
                });
                setCountryCode(e.target.value);
              }}
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
              type="number"
              variant="outlined"
              value={pickupLists ? pickupLists.contactNumber : ""}
              onChange={(e) => {
                setPickupLists({
                  ...pickupLists,
                  contactNumber: e.target.value,
                });
                setContactNumber(e.target.value);
              }}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
        </Grid>{" "}
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleClick}
          sx={{
            mt: "33px",
            mb: "17px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
        >
          Update
        </Button>
      </Card>
    </>
  );
};

export default UpdatePickup;
