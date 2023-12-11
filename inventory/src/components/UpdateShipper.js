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

export const UpdateShipper = () => {
  const [shipperList, setShipperList] = useState();
  const [name, setShipperName] = useState();
  const [address, setAddressName] = useState();
  const [postalCode, setPostalCode] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [email, setEmail] = useState();

  let navigate = useNavigate();

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:8080/shipper/get/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setShipperList(result);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const update = {
      shipperList,
    };
    console.log(update);

    fetch(`http://localhost:8080/shipper/edit/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(shipperList),
    })
      .then(() => {
        console.log("Class Updated");
        navigate("/shipper");
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
              Update Shipper
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
              label="Name"
              variant="outlined"
              value={shipperList ? shipperList.name : ""}
              //   onChange={(e) => setPickupAddress(e.target.value)}
              onChange={(e) => {
                setShipperList({
                  ...shipperList,
                  name: e.target.value,
                });
                setShipperName(e.target.value);
              }}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              value={shipperList ? shipperList.address : ""}
              onChange={(e) => {
                setShipperList({
                  ...shipperList,
                  address: e.target.value,
                });
                setAddressName(e.target.value);
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
              label="Postal Code"
              variant="outlined"
              value={shipperList ? shipperList.postalCode : ""}
              onChange={(e) => {
                setShipperList({
                  ...shipperList,
                  postalCode: e.target.value,
                });
                setPostalCode(e.target.value);
              }}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Contact Number"
              type="number"
              variant="outlined"
              value={shipperList ? shipperList.contactNumber : ""}
              onChange={(e) => {
                setShipperList({
                  ...shipperList,
                  contactNumber: e.target.value,
                });
                setContactNumber(e.target.value);
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
              label="Email"
              variant="outlined"
              value={shipperList ? shipperList.email : ""}
              onChange={(e) => {
                setShipperList({
                  ...shipperList,
                  emil: e.target.value,
                });
                setEmail(e.target.value);
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

export default UpdateShipper;
