import {
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
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchItem } from "../redux/slice/ItemSlice";
import { fetchlocation } from "../redux/slice/location";

const Inventory = () => {
  const [formData, setformData] = useState({
    itemName: "",
    locationName: "",
    address: "",
    quantity: "",
    consumedItem: "",
    scrappedItem: "",
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchItem());
  }, []);
  console.log(formData, "hey");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/inventory/add", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("something happens while adding inventory");
    }
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
            <Typography
              variant="h4"
              color="secondary"
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              Inventory
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid container spacing={2} sx={{ mt: "33px" }}>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="location"
              onChange={(e) =>
                setformData({
                  ...formData,
                  locationName: e.target.value,
                })
              }
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
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">Sub Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="sublocation"
              onChange={(e) =>
                setformData({
                  ...formData,
                  address: e.target.value,
                })
              }
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

      <Grid container spacing={2} sx={{ mt: "33px" }}>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">Item Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="itemName"
              //value={age}
              label="itemName"
              onChange={(e) =>
                setformData({
                  ...formData,
                  itemName: e.target.value,
                })
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120, // Adjust the height as needed
                  },
                },
              }}
              //onChange={handleChange}
            >
              {state.item.data?.map((item, index) => (
                <MenuItem key={index} value={item?.itemName}>
                  {" "}
                  {item?.itemName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="quantity"
            label="Quantity"
            variant="outlined"
            type="number"
            //   onChange={(e) =>
            //     setformData({
            //       ...formData,
            //       name: e.target.value,
            //     })
            //   }
            onChange={(e) =>
              setformData({
                ...formData,
                quantity: e.target.value,
              })
            }
            fullWidth
            sx={{ width: "90%" }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "33px" }}>
        <Grid item xs={21} sm={6}>
          <TextField
            id="consumedItem"
            label="Consumed Quantity"
            variant="outlined"
            type="number"
            //   onChange={(e) =>
            //     setformData({
            //       ...formData,
            //       consumedItem: e.target.value,
            //     })
            //   }
            onChange={(e) =>
              setformData({
                ...formData,
                consumedItem: e.target.value,
              })
            }
            fullWidth
            sx={{ width: "90%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="scrappedItem"
            label="Scrapped Quantity"
            variant="outlined"
            type="number"
            //   onChange={(e) =>
            //     setformData({
            //       ...formData,
            //       name: e.target.value,
            //     })
            //   }
            onChange={(e) =>
              setformData({
                ...formData,
                scrappedItem: e.target.value,
              })
            }
            fullWidth
            sx={{ width: "90%" }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleClick}
        //onClick={handleClick}

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
    </>
  );
};

export default Inventory;
