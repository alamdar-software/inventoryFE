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
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchlocation } from "../redux/slice/location";
import { fetchShipper } from "../redux/slice/ShipperSlice";
import { fetchConsignee } from "../redux/slice/ConsigneeSlice";
import { fetchPickup } from "../redux/slice/PickUpSlice";
import { fetchCurrency } from "../redux/slice/CurrencySlice";
import { fetchItem } from "../redux/slice/ItemSlice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TextareaAutosize from "@mui/material/TextareaAutosize";
export const Cipl = () => {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const [formData, setformData] = useState({
    itemName: "",
    repairService: "",
    transferDate: "",
    shipperName: "",
    consigneeName: "",
    locationName: "",
    pickupAddress: "",
    currencyName: "",
    SubLocation: [],
    item: [],
    hs: [],
    cor: [],
    dimension: [],
    weights: [],
    sn: [],
    purchase: [],
    unitPrice: [],
    quantity: [],
    amount: [],
    brand: [],
    remarks: [],
    package: [],
  });
  const [subLocations, setSubLocations] = useState([]);
  const [item, setItem] = useState([]);
  const [hs, setHs] = useState([]);
  const [selectPackage, setPackage] = useState([]);
  const [dimension, setDimension] = useState([]);
  const [weights, setWeights] = useState([]);
  const [countruOfOrigin, setCountryOfOrigin] = useState([]);
  const [sn, setSn] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [unitPrice, setUnitPrice] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [amount, setAmount] = useState([]);
  const [brand, setBrand] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [selectedSubLocations, setSelectedSubLocations] = useState([]);

  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchShipper());
    dispatch(fetchConsignee());
    dispatch(fetchPickup());
    dispatch(fetchCurrency());
    dispatch(fetchItem());
  }, []);
  console.log(state, "cipl");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData, "formmmm");
      const res = await fetch("");
    } catch (error) {}
  };

  const [formRows, setFormRows] = useState(1);
  const [formControls, setFormControls] = useState([{ key: 0 }]);
  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setformData({
      ...formData,
      locationName: selectedLocation,
      SubLocation: [""], // Reset sublocation when location changes
    });
    const selectedLocationObj = state.location.data.find(
      (location) => location.locationName === selectedLocation
    );
    setSubLocations(selectedLocationObj && selectedLocationObj?.addresses);
    console.log(selectedLocationObj, "yuuuu");
  };

  const handleSubLocationChange = (e, index) => {
    const selectedSubLocation = e.target.value || ""; // Ensure a default value if undefined
    setSelectedSubLocations((prevSubLocations) => {
      const updatedSubLocations = [...prevSubLocations];
      updatedSubLocations[index] = selectedSubLocation;
      return updatedSubLocations;
    });

    updateFormDataSubLocation(index, selectedSubLocation);
  };
  const updateFormDataSubLocation = (index, selectedSubLocation) => {
    setformData((prevFormData) => {
      const updatedSubLocations = [...prevFormData.SubLocation];
      updatedSubLocations[index] = selectedSubLocation;
      return {
        ...prevFormData,
        SubLocation: updatedSubLocations,
      };
    });
  };
  console.log(subLocations, "subbbbbbbbbbbbb");
  console.log(formData, "nooooooooooo");

  const handleAddClick = () => {
    setFormRows((prevRows) => prevRows + 1);
    setFormControls((prevControls) => [
      ...prevControls,
      { key: prevControls.length },
    ]);
    setSubLocations((prevSubLocations) => [...prevSubLocations, ""]);
    updateFormDataSubLocation(formControls.length, ""); // Add an empty string to SubLocation
  };

  const handleDeleteClick = (index) => {
    if (formControls.length > 1) {
      setFormControls((prevControls) =>
        prevControls.filter((_, i) => i !== index)
      );
    }
  };
  console.log(formData, "naya");

  const handleItemChange = (index, value) => {
    updateFormDataItem(index, value);
    setItem((prevItem) => {
      const updateItem = [...prevItem];
      updateItem[index] = value;
      return updateItem;
    });
  };
  console.log(item, "item");
  console.log(formData);

  const updateFormDataItem = (index, value) => {
    setformData((prevFormData) => {
      const updateItem = [...prevFormData.item];
      updateItem[index] = value;
      return {
        ...prevFormData,
        item: updateItem,
      };
    });
  };

  const handleHsChange = (index, value) => {
    updateFormDataHS(index, value);
    setHs((prevHs) => {
      const updateHS = [...prevHs];
      updateHS[index] = value;
      return updateHS;
    });
  };

  const updateFormDataHS = (index, value) => {
    setformData((prevFormData) => {
      const updateHS = [...prevFormData.hs];
      updateHS[index] = value;
      return {
        ...prevFormData,
        Hs: updateHS,
      };
    });
  };
  const handlePackageChange = (index, value) => {
    updateFormDataPackage(index, value);
    setPackage((prevPackage) => {
      const updatePackage = [...prevPackage];
      updatePackage[index] = value;
      return updatePackage;
    });
  };

  const updateFormDataPackage = (index, value) => {
    setformData((prevFormData) => {
      const updatePackage = [...prevFormData.package];
      updatePackage[index] = value;
      return {
        ...prevFormData,
        package: updatePackage,
      };
    });
  };
  const handleCountryOfOriginChange = (index, value) => {
    updateFormDataCountryOfOrigin(index, value);
    setCountryOfOrigin((prevCountryOfOrigin) => {
      const updateCountryOfOrigin = [...prevCountryOfOrigin];
      updateCountryOfOrigin[index] = value;
      return updateCountryOfOrigin;
    });
  };
  console.log(item, "item");
  console.log(formData);

  const updateFormDataCountryOfOrigin = (index, value) => {
    setformData((prevFormData) => {
      const updateCountryOfOrigin = [...prevFormData.cor];
      updateCountryOfOrigin[index] = value;
      return {
        ...prevFormData,
        cor: updateCountryOfOrigin,
      };
    });
  };
  const handleDimensionChange = (index, value) => {
    updateFormDataDimension(index, value);
    setDimension((prevDimension) => {
      const updateDimension = [...prevDimension];
      updateDimension[index] = value;
      return updateDimension;
    });
  };
  console.log(dimension, "dimension");
  console.log(formData);

  const updateFormDataDimension = (index, value) => {
    setformData((prevFormData) => {
      const updateDimension = [...prevFormData.dimension];
      updateDimension[index] = value;
      return {
        ...prevFormData,
        dimension: updateDimension,
      };
    });
  };
  const handleWeightsChange = (index, value) => {
    updateFormDataWeights(index, value);
    setWeights((prevWeights) => {
      const updateWeights = [...prevWeights];
      updateWeights[index] = value;
      return updateWeights;
    });
  };
  console.log(weights, "weights");
  console.log(formData);

  const updateFormDataWeights = (index, value) => {
    setformData((prevFormData) => {
      const updateWeights = [...prevFormData.weights];
      updateWeights[index] = value;
      return {
        ...prevFormData,
        weights: updateWeights,
      };
    });
  };

  const handleSnChange = (index, value) => {
    updateFormDataSn(index, value);
    setSn((prevSn) => {
      const updateSn = [...prevSn];
      updateSn[index] = value;
      return updateSn;
    });
  };

  const updateFormDataSn = (index, value) => {
    setformData((prevFormData) => {
      const updateSn = [...prevFormData.sn];
      updateSn[index] = value;
      return {
        ...prevFormData,
        sn: updateSn,
      };
    });
  };
  const handlePurchaseChange = (index, value) => {
    updateFormDataPurchase(index, value);
    setPurchase((prevPurchase) => {
      const updatePurchase = [...prevPurchase];
      updatePurchase[index] = value;
      return updatePurchase;
    });
  };
  const updateFormDataPurchase = (index, value) => {
    setformData((prevFormData) => {
      const updatePurchase = [...prevFormData.purchase];
      updatePurchase[index] = value;
      return {
        ...prevFormData,
        purchase: updatePurchase,
      };
    });
  };
  const handleUnitPriceChange = (index, value) => {
    updateFormDataUnitPrice(index, value);
    setUnitPrice((prevUnitPrice) => {
      const updateUnitPrice = [...prevUnitPrice];
      updateUnitPrice[index] = value;
      return updateUnitPrice;
    });
  };
  const updateFormDataUnitPrice = (index, value) => {
    setformData((prevFormData) => {
      const updateUnitPrice = [...prevFormData.unitPrice];
      updateUnitPrice[index] = value;
      return {
        ...prevFormData,
        unitPrice: updateUnitPrice,
      };
    });
  };

  const handleQuantityChange = (index, value) => {
    updateFormDataQuantity(index, value);
    setQuantity((prevQuantity) => {
      const updateQuantity = [...prevQuantity];
      updateQuantity[index] = value;
      return updateQuantity;
    });
  };

  const updateFormDataQuantity = (index, value) => {
    setformData((prevFormData) => {
      const updateQuantity = [...prevFormData.quantity];
      updateQuantity[index] = value;
      return {
        ...prevFormData,
        quantity: updateQuantity,
      };
    });
  };

  const handleAmountChange = (index, value) => {
    updateFormDataAmount(index, value);
    setAmount((prevAmount) => {
      const updateAmount = [...prevAmount];
      updateAmount[index] = value;
      return updateAmount;
    });
  };

  const updateFormDataAmount = (index, value) => {
    setformData((prevFormData) => {
      const updateAmount = [...prevFormData.amount];
      updateAmount[index] = value;
      return {
        ...prevFormData,
        amount: updateAmount,
      };
    });
  };

  const handleBrandChange = (index, value) => {
    updateFormDataBrand(index, value);
    setBrand((prevBrand) => {
      const updateBrand = [...prevBrand];
      updateBrand[index] = value;
      return updateBrand;
    });
  };

  const updateFormDataBrand = (index, value) => {
    setformData((prevFormData) => {
      const updateBrand = [...prevFormData.brand];
      updateBrand[index] = value;
      return {
        ...prevFormData,
        brand: updateBrand,
      };
    });
  };

  const handleRemarksChange = (index, value) => {
    updateFormDataRemarks(index, value);
    setRemarks((prevRemarks) => {
      const updateRemarks = [...prevRemarks];
      updateRemarks[index] = value;
      return updateRemarks;
    });
  };

  const updateFormDataRemarks = (index, value) => {
    setformData((prevFormData) => {
      const updateRemarks = [...prevFormData.remarks];
      updateRemarks[index] = value;
      return {
        ...prevFormData,
        remarks: updateRemarks,
      };
    });
  };
  const renderFormControls = () => {
    return formControls.map((control, index) => (
      <div key={control.key} style={{ display: "flex", marginBottom: "10px" }}>
        <FormControl fullWidth sx={{ width: "50%", marginRight: "10px" }}>
          <InputLabel id="demo-simple-select-label">Sub Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="location"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 120, // Adjust the height as needed
                },
              },
            }}
            onChange={(e) => handleSubLocationChange(e, index)}
          >
            {subLocations.map((address, index) => (
              <MenuItem key={index} value={address?.address}>
                {address?.address}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ width: "50%", marginRight: "10px" }}>
          <InputLabel id="demo-simple-select-label">Item Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="itemName"
            //value={age}
            label="itemName"
            onChange={(e) => handleItemChange(index, e.target.value)}
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
        <FormControl fullWidth sx={{ width: "30%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Package Name"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handlePackageChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "30%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Hs"
              variant="outlined"
              // value={sn}
              onChange={(e) => handleHsChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "30%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="Country Of Origin"
              label="Country Of Origin"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) =>
                handleCountryOfOriginChange(index, e.target.value)
              }
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "30%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Dimension(CM)"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleDimensionChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "30%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Weights(Kg)"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleWeightsChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "50%", marginRight: "10px" }}>
          <InputLabel id="demo-simple-select-label">Part No</InputLabel>
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
            onChange={(e) =>
              setformData({
                ...formData,
                locationName: e.target.value,
              })
            }
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
        <FormControl fullWidth sx={{ width: "30%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="S/N"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleSnChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "30%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Purchase Order(D.O.P)"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handlePurchaseChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "30%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Unit Price"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleUnitPriceChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "30%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "30%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleAmountChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "30%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Brand"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleBrandChange(index, e.target.value)}
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "50%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextareaAutosize
              sx={{ width: "90%" }}
              aria-label="Brand"
              placeholder="Enter Remarks"
              // value={brandValue} // You can set the value and handle changes as needed
              // onChange={(e) => handleBrandChange(e.target.value)}
              onChange={(e) => handleRemarksChange(index, e.target.value)}
              minRows={4} // You can adjust the number of rows as needed
            />
          </Grid>
        </FormControl>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button>
            <AddIcon onClick={handleAddClick} />
          </button>
          <Button onClick={() => handleDeleteClick(index)}>
            <DeleteIcon style={{ color: "red" }} />
          </Button>
        </div>

        {/* Repeat similar blocks for other form controls */}
      </div>
    ));
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
            mb: "33px",
          }}
        >
          <CardContent>
            <Typography variant="h4" color="secondary" gutterBottom>
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
              onChange={(e) =>
                setformData({
                  ...formData,
                  shipperName: e.target.value,
                })
              }
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
            label="Transfer Date"
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
              onChange={(e) =>
                setformData({
                  ...formData,
                  consigneeName: e.target.value,
                })
              }
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
              onChange={(e) =>
                setformData({
                  ...formData,
                  pickupAddress: e.target.value,
                })
              }
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
              onChange={(e) =>
                setformData({
                  ...formData,
                  currencyName: e.target.value,
                })
              }
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
              onChange={(e) =>
                setformData({
                  ...formData,
                  repairService: e.target.value,
                })
              }
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div
        sx={{
          marginTop: "5px",

          flexWrap: "wrap",
          width: "80%",
        }}
      >
        {formData.locationName && (
          <>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Grid
                sx={{ overflowX: "scroll", width: "100%", flexWrap: "wrap" }}
              >
                <Card
                  color="secondary"
                  sx={{
                    width: "180%",
                    marginTop: "20px",
                    backgroundColor: "secondary",
                  }}
                >
                  <CardContent
                    sx={{ minWidth: "100%", display: "flex", flexWrap: "wrap" }}
                  >
                    {renderFormControls()}
                  </CardContent>
                </Card>
              </Grid>
            </div>
          </>
        )}
      </div>
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
