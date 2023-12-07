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

const InternalTransfer = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchlocation());
  }, []);
  console.log(state);
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
            <Typography variant="h4" color="secondary" gutterBottom>
              Internal Transfer
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "23px" }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="location"
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
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ width: "90%" }}
            id="outlined-basic"
            label="Transfer Date"
            variant="outlined"
            // value={locationName}
            // onChange={(e) => setLocation(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "33px" }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">
              Destination/SubLocation
            </InputLabel>
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
                <MenuItem key={index} value={item?.address}>
                  {" "}
                  {item?.address}
                </MenuItem>
              ))}
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

export default InternalTransfer;
