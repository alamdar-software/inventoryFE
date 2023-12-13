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
    repairService: "",
    transferDate: "",
    shipperName: "",
    consigneeName: "",
    locationName: "",
    pickupAddress: "",
    currencyName: "",
    SubLocations: [],
    ItemName: [],
    packageName: [],
    HsCode: [],
    CountryOfOrigin: [],
    Dimentions: [],
    Weight: [],
    PartNo: [],
    SN: [],
    DOP: [],
    UnitPrice: [],
    quantity: [],
    Amount: [],
    Brand: [],
    Remarks: [],
  });
  const [SubLocations, setSubLocations] = useState([]);
  const [itemName, setItemNameArray] = useState([]);
  const [packageName, setPackageNameArray] = useState([]);
  const [HsCode, setHsCodeArray] = useState([]);
  const [CountryOfOrigin, setCountryOfOriginArray] = useState([]);
  const [Dimentions, setDimentionsArray] = useState([]);
  const [Weight, setWeightArray] = useState([]);
  const [PartNo, setPartNoArray] = useState([]);
  const [SN, setSNArray] = useState([]);
  const [DOP, setDOPArray] = useState([]);
  const [UnitPrice, setUnitPriceArray] = useState([]);
  const [quantity, setquantityArray] = useState([]);
  const [Amount, setAmountArray] = useState([]);
  const [Brand, setBrandArray] = useState([]);
  const [Remarks, setRemarksArray] = useState([]);

  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchShipper());
    dispatch(fetchConsignee());
    dispatch(fetchPickup());
    dispatch(fetchCurrency());
    dispatch(fetchItem());
  }, []);

  const [formRows, setFormRows] = useState(1);
  const [formControls, setFormControls] = useState([{ key: 0 }]);

  const updateFormDataArray = (field, index, value) => {
    switch (field) {
      case "SubLocations":
        setSubLocations((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "itemName":
        setItemNameArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "packageName":
        setPackageNameArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "HsCode":
        setHsCodeArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "CountryOfOrigin":
        setCountryOfOriginArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "Dimentions":
        setDimentionsArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "Weight":
        setWeightArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "PartNo":
        setPartNoArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "SN":
        setSNArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "DOP":
        setDOPArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "UnitPrice":
        setUnitPriceArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "quantity":
        setquantityArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "Amount":
        setAmountArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "Brand":
        setBrandArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;
      case "Remarks":
        setRemarksArray((prevArray) => {
          const updatedArray = [...prevArray];
          updatedArray[index] = value;
          return updatedArray;
        });
        break;

      // ... add similar cases for other fields
      default:
        break;
    }
  };

  const handleAddClick = () => {
    setFormRows((prevRows) => prevRows + 1);
    setFormControls((prevControls) => [
      ...prevControls,
      { key: prevControls.length },
    ]);
    setSubLocations((prevSubLocations) => [...prevSubLocations, SubLocations]);
    updateFormDataArray("SubLocations", formControls.length, "");
    updateFormDataArray("itemName", formControls.length, "");
    updateFormDataArray("packageName", formControls.length, "");
    updateFormDataArray("HsCode", formControls.length, "");
    updateFormDataArray("CountryOfOrigin", formControls.length, "");
    updateFormDataArray("Dimentions", formControls.length, "");
    updateFormDataArray("Weight", formControls.length, "");
    updateFormDataArray("PartNo", formControls.length, "");
    updateFormDataArray("SN", formControls.length, "");
    updateFormDataArray("DOP", formControls.length, "");
    updateFormDataArray("UnitPrice", formControls.length, "");
    updateFormDataArray("quantity", formControls.length, "");
    updateFormDataArray("Amount", formControls.length, "");
    updateFormDataArray("Brand", formControls.length, "");
    updateFormDataArray("Remarks", formControls.length, "");

    // Example, update for other fields as well
    // ... rest of your code
  };
  const handleSubLocationChange = (index, value) => {
    updateFormDataArray("SubLocations", index, value);

    setformData((prevFormData) => ({
      SubLocations: [...SubLocations],
      ...prevFormData,

      // ... (update other fields)
    }));

    // ... rest of your code
  };
  const handleSubItemChange = (index, value) => {
    updateFormDataArray("itemName", index, value);

    setformData((prevFormData) => ({
      ...prevFormData,
      ItemName: [...itemName], // Use the correct array here
    }));
  };
  const handlepackageNameChange = (index, value) => {
    updateFormDataArray("packageName", index, value);

    // Only update the SubItem field in the formData
    setformData((prevFormData) => ({
      ...prevFormData,
      packageName: [...packageName],
    }));
  };
  const handleHsCodeChange = (index, value) => {
    updateFormDataArray("HsCode", index, value);
    // Only update the SubItem field in the formData
    setformData((prevFormData) => ({
      ...prevFormData,
      HsCode: HsCode,
    }));
  };
  const handleCountryOfOriginChange = (index, value) => {
    updateFormDataArray("CountryOfOrigin", index, value);
    // Only update the SubItem field in the formData
    setformData((prevFormData) => ({
      ...prevFormData,
      CountryOfOrigin: CountryOfOrigin,
    }));
  };
  const handleDimentionsChange = (index, value) => {
    updateFormDataArray("Dimentions", index, value);
    // Only update the SubItem field in the formData
    setformData((prevFormData) => ({
      ...prevFormData,
      Dimentions: Dimentions,
    }));
  };
  const handleWeightChange = (index, value) => {
    updateFormDataArray("Weight", index, value);
    // Only update the SubItem field in the formData
    setformData((prevFormData) => ({
      ...prevFormData,
      Weight: Weight,
    }));
  };
  const handlePartNoChange = (index, value) => {
    updateFormDataArray("PartNo", index, value);
    // Only update the SubItem field in the formData
    setformData((prevFormData) => ({
      ...prevFormData,
      PartNo: PartNo,
    }));
  };
  const handleSNChange = (index, value) => {
    updateFormDataArray("SN", index, value);
    // Only update the SubItem field in the formData
    setformData((prevFormData) => ({
      ...prevFormData,
      SN: SN,
    }));
  };
  const handleDOPChange = (index, value) => {
    updateFormDataArray("DOP", index, value);
    // Only update the SubItem field in the formData
    setformData((prevFormData) => ({
      ...prevFormData,
      DOP: DOP,
    }));
  };
  const handleUnitPriceChange = (index, value) => {
    updateFormDataArray("UnitPrice", index, value);
    // Only update the SubItem field in the formData
    setformData((prevFormData) => ({
      ...prevFormData,
      UnitPrice: UnitPrice,
    }));
  };
  const handlequantityChange = (index, value) => {
    updateFormDataArray("quantity", index, value);
    // Only update the SubItem field in the formData
    setformData((prevFormData) => ({
      ...prevFormData,
      quantity: quantity,
    }));
  };
  const handleAmountChange = (index, value) => {
    updateFormDataArray("Amount", index, value);
    // Only update the SubItem field in the formData
    setformData((prevFormData) => ({
      ...prevFormData,
      Amount: Amount,
    }));
  };
  const handleBrandChange = (index, value) => {
    updateFormDataArray("Brand", index, value);
    // Only update the SubItem field in the formData
    setformData((prevFormData) => ({
      ...prevFormData,
      Brand: Brand,
    }));
  };
  const handleRemarksChange = (index, value) => {
    updateFormDataArray("Remarks", index, value);
    // Only update the SubItem field in the formData
    setformData((prevFormData) => ({
      ...prevFormData,
      Remarks: Remarks,
    }));
  };

  const handleDeleteClick = () => {
    if (formRows > 1) {
      setFormRows((prevRows) => prevRows - 1);
      setFormControls((prevControls) => prevControls.slice(0, -1));
    }
  };
  /*  const updateFormDataSubLocation = (index, value) => {
    setformData((prevFormData) => {
      const updatedSubLocations = [...prevFormData.SubLocation];
      updatedSubLocations[index] = value;
      return {
        ...prevFormData,
        SubLocation: updatedSubLocations,
      };
    });
  }; */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData, "yes");
      const res = await fetch("");
    } catch (error) {}
  };
  console.log(formData, "rupaaaaaaaaaaa");
  console.log(SubLocations, "newwwwwwwwww");
  console.log(packageName, "itemmmmmmm");
  console.log(itemName, "itttttt");
  const renderFormControls = () => {
    return formControls.map((control, index) => (
      <div key={control.key} style={{ display: "flex", marginBottom: "10px" }}>
        <FormControl fullWidth sx={{ width: "50%", marginRight: "10px" }}>
          <InputLabel id="demo-simple-select-label">Sub Location</InputLabel>
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
            /*  onChange={(e) =>
              setformData({
                ...formData,
                SubLocation: [e.target.value],
              })
            } */
            onChange={(e) => handleSubLocationChange(index, e.target.value)}
            /*  onChange={(e) =>
              updateFormDataArray("SubLocation", index, e.target.value)
            } */
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
        <FormControl fullWidth sx={{ width: "50%", marginRight: "10px" }}>
          <InputLabel id="demo-simple-select-label">Item Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="itemName"
            //value={age}
            label="itemName"
            onChange={(e) => handleSubItemChange(index, e.target.value)}
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
        <FormControl fullWidth sx={{ width: "40%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Package Name"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handlepackageNameChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "30%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Hs Code"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleHsCodeChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "50%", marginRight: "10px" }}>
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
        <FormControl fullWidth sx={{ width: "50%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Dimension(CM)"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleDimentionsChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "40%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Weights(Kg)"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleWeightChange(index, e.target.value)}
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
            label="PartNo"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 120, // Adjust the height as needed
                },
              },
            }}
            onChange={(e) => handlePartNoChange(index, e.target.value)}
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
              onChange={(e) => handleSNChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "50%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Purchase(D.O.P)"
              variant="outlined"
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleDOPChange(index, e.target.value)}
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
              onChange={(e) => handlequantityChange(index, e.target.value)}
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
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "50%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextareaAutosize
              sx={{ width: "90%" }}
              aria-label="Remarks"
              placeholder="Enter Remarks"
              // value={brandValue} // You can set the value and handle changes as needed
              // onChange={(e) => handleBrandChange(e.target.value)}
              minRows={4} // You can adjust the number of rows as needed
              onChange={(e) => handleRemarksChange(index, e.target.value)}
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
          <Button onClick={handleDeleteClick}>
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
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Box>
    </>
  );
};

export default Cipl;
