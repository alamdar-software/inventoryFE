import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchlocation } from "../redux/slice/location";
import { fetchShipper } from "../redux/slice/ShipperSlice";
import { fetchConsignee } from "../redux/slice/ConsigneeSlice";
import { fetchPickup } from "../redux/slice/PickUpSlice";
import { fetchCurrency } from "../redux/slice/CurrencySlice";

const Cipl = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchShipper());
    dispatch(fetchConsignee());
    dispatch(fetchPickup());
    dispatch(fetchCurrency());
  }, []);
  console.log(state, "cipl");

  return (
    <>
      <Grid>
        <Card
          color="secondary"
          sx={{
            width: "100%",
            backgroundColor: "secondary",
            borderBottom: "2px solid yellow",
            mb: "33px",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              color="secondary"
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              CIPL Transfer
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="location"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120, // Adjust the height as needed
                  },
                },
              }}
              //onChange={handleChange}
            >
              {state.location.data?.map((item, index) => (
                <MenuItem key={index} value={item?.locationName}>
                  {" "}
                  {item?.locationName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">Shipper</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="shipper"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120, // Adjust the height as needed
                  },
                },
              }}
              //onChange={handleChange}
            >
              {state.shipper.data?.map((item, index) => (
                <MenuItem key={index} value={item?.name}>
                  {" "}
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "23px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ width: "90%" }}
            id="outlined-basic"
            label="Transfer Item"
            variant="outlined"
            // value={locationName}
            // onChange={(e) => setLocation(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">Consignee</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="consignee"
              //onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // Adjust the height as needed
                  },
                },
              }}
            >
              {state.consignee.data?.map((item, index) => (
                <MenuItem key={index} value={item?.name}>
                  {" "}
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "23px" }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">
              Pickup Address
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="pickupAddress"
              //onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 150, // Adjust the height as needed
                  },
                },
              }}
            >
              {state.pickup.data?.map((item, index) => (
                <MenuItem key={index} value={item?.pickupAddress}>
                  {" "}
                  {item?.pickupAddress}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">
              Select Currency
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="selectCurrency"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120, // Adjust the height as needed
                  },
                },
              }}
              //onChange={handleChange}
            >
              {state.currency.data?.currencyList.map((item, index) => (
                <MenuItem key={index} value={item?.currencyName}>
                  {" "}
                  {item?.currencyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "23px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ width: "90%" }}
            id="outlined-basic"
            label="Currency Rate"
            variant="outlined"
            // value={locationName}
            // onChange={(e) => setLocation(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">
              Repair/Service
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="Repair/service"
              //onChange={handleChange}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "33px" }}>
        {" "}
        <Button variant="contained" size="large" color="secondary">
          Add
        </Button>
      </Box>
    </>
  );
};

export default Cipl;
