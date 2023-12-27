import React from "react";

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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchlocation } from "../redux/slice/location";
import { fetchItem } from "../redux/slice/ItemSlice";
import { useEffect } from "react";
import { fetchBrand } from "../redux/slice/BrandSlice";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { fetchCurrency } from "../redux/slice/CurrencySlice";
import { fetchentity } from "../redux/slice/entitySlice";
const SingleIncome = () => {
  const [formData, setformData] = useState({
    locationName: "",
    address: "",
    description: "",
    name: "",
    unitName: "",
    extendedValue: 0,
    quantity: 0,
    unitCost: 0,
    price: 0,
    standardPrice: 0,
    date: "",
    purchaseOrder: "",
    pn: "",
    sn: "",
    brandName: "",
    currencyName: "",
    entityName: "",
    impaCode: "",
    storeNo: "",
    remarks: "",
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [subLocations, setSubLocations] = useState([]);
  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchItem());
    dispatch(fetchBrand());
    dispatch(fetchItem());
    dispatch(fetchCurrency());
    dispatch(fetchentity());
  }, []);
  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setformData({
      ...formData,
      locationName: selectedLocation,
      address: [], // Reset sublocation when location changes
    });
    const selectedLocationObj = state.location.data.find(
      (location) => location.locationName === selectedLocation
    );
    setSubLocations(selectedLocationObj ? selectedLocationObj.addresses : []);
  };
  const handleQuantityChange = (e) => {
    const quantity = parseFloat(e.target.value);
    const unitCost = formData.unitCost;
    const price = calculateprice(quantity, unitCost);

    setformData({
      ...formData,
      quantity,
      price,
    });
  };
  const handleUnitCostChange = (e) => {
    const unitCost = parseFloat(e.target.value);
    const quantity = formData.quantity;
    const price = calculateprice(quantity, unitCost);

    setformData({
      ...formData,
      unitCost,
      price,
    });
  };

  const calculateprice = (quantity, unitCost) => {
    const parsedQuantity = parseFloat(quantity);
    const parsedUnitCost = parseFloat(unitCost);

    if (!isNaN(parsedQuantity) && !isNaN(parsedUnitCost)) {
      return parsedQuantity * parsedUnitCost;
    } else {
      return "";
    }
  };
  const handleDateChange = (date) => {
    setformData({
      ...formData,
      date: date.format("YYYY-MM-DD"),
    });
  };
  const handleItemChange = (e) => {
    const selectedItem = state.item.data.find(
      (item) => item.description === e.target.value
    );

    if (selectedItem) {
      console.log(selectedItem.category, "select");
      setformData({
        ...formData,
        description: e.target.value,
        name: selectedItem.name,
        unitName: selectedItem.unitName,
      });
    } else {
      setformData({
        ...formData,
        description: e.target.value,
        name: "",
        unitName: "",
      });
    }
  };
  console.log(state, "heystate");
  console.log(formData, "formmmm");
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/incomingstock/add", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, "came from backend");
      alert("income added successfully");
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
              Single Incoming Stock
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
              onChange={handleLocationChange}

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
              id="demo-simple-select"
              //value={age}
              label="Description"
              //onChange={handleChange}
              onChange={handleItemChange}
            >
              {state.item.data?.map((item, index) => (
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
            id="outlined-basic"
            label="Catagory"
            variant="outlined"
            fullWidth
            sx={{ width: "90%" }}
            InputProps={{
              readOnly: true,
            }}
            value={formData.name}
            onChange={(e) =>
              setformData({
                ...formData,
                name: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "33px" }}>
        <Grid item xs={21} sm={6}>
          <TextField
            id="outlined-basic"
            label="Unit of Measure"
            variant="outlined"
            fullWidth
            sx={{ width: "90%" }}
            InputProps={{
              readOnly: true,
            }}
            value={formData.unitName}
            onChange={(e) =>
              setformData({
                ...formData,
                unitName: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-basic"
            label="Extended Value"
            type="number"
            variant="outlined"
            fullWidth
            sx={{ width: "90%" }}
            onChange={(e) =>
              setformData({
                ...formData,
                extendedValue: parseFloat(e.target.value) || 0,
              })
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: "33px" }}>
        <Grid item xs={21} sm={6}>
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            type="number"
            fullWidth
            sx={{ width: "90%" }}
            /*  onChange={(e) =>
              setformData({
                ...formData,
                quantity: e.target.value,
              })
            } */
            onChange={handleQuantityChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-basic"
            label="Unit Cost"
            variant="outlined"
            fullWidth
            sx={{ width: "90%" }}
            type="number"
            /*   onChange={(e) =>
              setformData({
                ...formData,
                unitCost: e.target.value,
              })
            } */
            onChange={handleUnitCostChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "33px" }}>
        <Grid item xs={21} sm={6}>
          <TextField
            id="outlined-basic"
            label="Total Price"
            variant="outlined"
            type="number"
            fullWidth
            sx={{ width: "90%" }}
            InputProps={{
              readOnly: true,
            }}
            /*   onChange={(e) =>
              setformData({
                ...formData,
                price: e.target.value,
              })
            } */
            onChange={(e) =>
              setformData({
                ...formData,
                price: e.target.value,
              })
            }
            value={formData.price}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-basic"
            label="Standard Price"
            variant="outlined"
            fullWidth
            sx={{ width: "90%" }}
            type="number"
            onChange={(e) =>
              setformData({
                ...formData,
                standardPrice: parseFloat(e.target.value),
              })
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "33px" }}>
        <Grid item xs={21} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              /* value={
                formData.purchaseDate ? dayjs(formData.purchaseDate) : null
              } */
              onChange={(newDate) => handleDateChange(newDate)}
              fullWidth
              sx={{ width: "90%" }}
              /* format="yyyy-MM-dd" */
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-basic"
            label="Purchase Order"
            variant="outlined"
            fullWidth
            sx={{ width: "90%" }}
            onChange={(e) =>
              setformData({
                ...formData,
                purchaseOrder: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "33px" }}>
        <Grid item xs={21} sm={6}>
          <TextField
            id="outlined-basic"
            label="P/N"
            variant="outlined"
            fullWidth
            sx={{ width: "90%" }}
            onChange={(e) =>
              setformData({
                ...formData,
                pn: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-basic"
            label="S/N"
            variant="outlined"
            fullWidth
            sx={{ width: "90%" }}
            onChange={(e) =>
              setformData({
                ...formData,
                sn: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "33px" }}>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="brandName">brandName</InputLabel>
            <Select
              labelId="brandName"
              id="brandName"
              //value={age}
              label="brandName"
              onChange={(e) =>
                setformData({
                  ...formData,
                  brandName: e.target.value,
                })
              }

              //onChange={handleChange}
            >
              {state.brand.data?.map((item, index) => (
                <MenuItem key={index} value={item?.brandName}>
                  {" "}
                  {item?.brandName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">
              {" "}
              Select Currency
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="currency"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120, // Adjust the height as needed
                  },
                },
              }}
              onChange={(e) =>
                setformData({
                  ...formData,
                  currencyName: e.target.value,
                })
              }
              //onChange={handleChange}
            >
              {state.currency.data?.currencyList?.map((item, index) => (
                <MenuItem key={index} value={item?.currencyName}>
                  {" "}
                  {item?.currencyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "33px" }}>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">Entity</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="entity"
              onChange={(e) =>
                setformData({
                  ...formData,
                  entityName: e.target.value,
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
              {state.entity.data?.map((item, index) => (
                <MenuItem key={index} value={item?.entityName}>
                  {" "}
                  {item?.entityName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-basic"
            label="IMPA Code"
            variant="outlined"
            fullWidth
            sx={{ width: "90%" }}
            onChange={(e) =>
              setformData({
                ...formData,
                impaCode: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "33px" }}>
        <Grid item xs={21} sm={6}>
          <TextField
            id="outlined-basic"
            label="Store Number"
            variant="outlined"
            fullWidth
            sx={{ width: "90%" }}
            onChange={(e) =>
              setformData({
                ...formData,
                storeNo: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-basic"
            label="Remarks"
            variant="outlined"
            fullWidth
            sx={{ width: "90%" }}
            onChange={(e) =>
              setformData({
                ...formData,
                remarks: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
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
        Add
      </Button>
    </>
  );
};

export default SingleIncome;
