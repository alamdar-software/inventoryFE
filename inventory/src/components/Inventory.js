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
import { toast } from "react-toastify";

const Inventory = () => {
  const [formData, setformData] = useState({
    description: "",
    locationName: "",
    address: "",
    quantity: "",
    consumedItem: "",
    scrappedItem: "",
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;
  const [subLocations, setSubLocations] = useState([]);

  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
  }, []);
  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setformData({
      ...formData,
      locationName: selectedLocation,
      address: [], // Reset sublocation when location changes
    });
    const selectedLocationObj = state.nonPersisted.location.data.find(
      (location) => location.locationName === selectedLocation
    );
    setSubLocations(selectedLocationObj ? selectedLocationObj.addresses : []);
  };
  console.log(formData, "hey");
  console.log(state, "state");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/inventory/add", {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      toast.success('🦄 Inventory Added Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
       
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
              /* onChange={(e) =>
                setformData({
                  ...formData,
                  locationName: e.target.value,
                })
              } */
              onChange={handleLocationChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120, // Adjust the height as needed
                  },
                },
              }}
              //onChange={handleChange}
            >
              {state.nonPersisted.location.data?.map((item, index) => (
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
              {subLocations.map((address, index) => (
                <MenuItem key={index} value={address?.address}>
                  {address?.address}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: "33px" }}>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">
              Item Description
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="description"
              //value={age}
              label="description"
              onChange={(e) =>
                setformData({
                  ...formData,
                  description: e.target.value,
                })
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120, // Adjust the height as needed
                  },
                },
              }}
            >
              {state.nonPersisted.item.data?.map((item, index) => (
                <MenuItem key={index} value={item?.description}>
                  {" "}
                  {item?.description}
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
