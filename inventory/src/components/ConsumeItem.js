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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import { fetchIncome } from "../redux/slice/SingleIncomeSlice";
import { fetchInventory } from "../redux/slice/InventorySlice";
const ConsumeItem = () => {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const [formData, setformData] = useState({
    transferDate: "",

    locationName: "",

    SubLocations: [],
    item: [],

    sn: [],

    quantity: [],

    remarks: [],

    partNo: [],
    date: [],
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

  const [brand, setBrand] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [selectedSubLocations, setSelectedSubLocations] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [formRows, setFormRows] = useState(1);
  const [formControls, setFormControls] = useState([{ key: 0 }]);
  const [selectedPartNo, setselectedPartNo] = useState([]);
  const [partNo, setPartNo] = useState(
    Array.from({ length: formRows }, () => [])
  );
  const [partNumbersData, setPartNumbersData] = useState([]);
  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchShipper());
    dispatch(fetchConsignee());
    dispatch(fetchPickup());
    dispatch(fetchCurrency());
    dispatch(fetchItem());
    dispatch(fetchIncome());
    dispatch(fetchInventory());
  }, []);
  console.log(state, "cipl");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/consumeditem/add", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, "came from backend");
      alert("consume Item added successfully");
    } catch (error) {
      console.log("something happens while adding cipl");
    }
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setformData({
      ...formData,
      locationName: selectedLocation,
      SubLocations: [""], // Reset sublocation when location changes
    });
    const selectedLocationObj = state.location.data.find(
      (location) => location.locationName === selectedLocation
    );
    setSubLocations(selectedLocationObj && selectedLocationObj?.addresses);
    console.log(selectedLocationObj, "yuuuu");
  };

  const handleSubLocationChange = (e, index) => {
    const selectedSubLocation = e.target.value || "";

    // Update formData with the selected sublocation
    updateFormDataSubLocations(index, selectedSubLocation);

    // Ensure a default value if undefined
    setSelectedSubLocations((prevSubLocations) => {
      const updatedSubLocations = [...prevSubLocations];
      updatedSubLocations[index] = selectedSubLocation;
      return updatedSubLocations;
    });

    // Find the corresponding item descriptions in the inventory data
    const selectedInventoryData = state.inventory.data.filter(
      (inventoryItem) => inventoryItem.address?.address === selectedSubLocation
    );
    console.log(selectedInventoryData, "22");

    // Extract item descriptions from the selected inventory data
    const itemDescriptions = selectedInventoryData.map(
      (inventoryItem) => inventoryItem.description
    );
    console.log(itemDescriptions, "33");

    // Update the item state with the selected item descriptions
    setItem((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = itemDescriptions; // This line is updated
      return updatedItems;
    });
  };
  console.log(item, "topibaz");

  const updateFormDataSubLocations = (index, selectedSubLocation) => {
    setformData((prevFormData) => {
      const updatedSubLocations = [...prevFormData.SubLocations];
      updatedSubLocations[index] = selectedSubLocation;
      return {
        ...prevFormData,
        SubLocations: updatedSubLocations,
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
    updateFormDataSubLocations(formControls.length, ""); // Add an empty string to SubLocation
  };

  const handleDeleteClick = (index) => {
    setFormControls((prevControls) =>
      prevControls.length > 1
        ? prevControls.filter((_, i) => i !== index)
        : prevControls
    );

    setWeights((prevWeights) => {
      const updatedWeights = [...prevWeights];
      updatedWeights.splice(index, 1); // Remove the weight at the specified index
      return updatedWeights;
    });

    setSubLocations((prevSubLocations) => {
      // No need to remove any sublocations
      return prevSubLocations;
    });

    setformData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      const deletedSubLocation = prevFormData.SubLocations?.[index];

      updatedFormData.deletedSubLocations = [
        ...(prevFormData.deletedSubLocations || []),
        deletedSubLocation,
      ];

      updatedFormData.SubLocations = prevFormData.SubLocations?.filter(
        (subLocation, i) => i !== index
      );

      updatedFormData.itemName = [
        ...(prevFormData.itemName?.slice(0, index) || []),
        ...(prevFormData.itemName?.slice(index + 1) || []),
      ];

      updatedFormData.item = [
        ...(prevFormData.item?.slice(0, index) || []),
        ...(prevFormData.item?.slice(index + 1) || []),
      ];

      updatedFormData.quantity = [
        ...(prevFormData.quantity?.slice(0, index) || []),
        ...(prevFormData.quantity?.slice(index + 1) || []),
      ];

      updatedFormData.remarks = [
        ...(prevFormData.remarks?.slice(0, index) || []),
        ...(prevFormData.remarks?.slice(index + 1) || []),
      ];

      updatedFormData.unitPrice = [
        ...(prevFormData.unitPrice?.slice(0, index) || []),
        ...(prevFormData.unitPrice?.slice(index + 1) || []),
      ];

      updatedFormData.date = [
        ...(prevFormData.date?.slice(0, index) || []),
        ...(prevFormData.date?.slice(index + 1) || []),
      ];
      updatedFormData.partNo = [
        ...(prevFormData.partNo?.slice(0, index) || []),
        ...(prevFormData.partNo?.slice(index + 1) || []),
      ];
      updatedFormData.sn = [
        ...(prevFormData.sn?.slice(0, index) || []),
        ...(prevFormData.sn?.slice(index + 1) || []),
      ];

      return updatedFormData;
    });
  };

  console.log(formData, "naya");

  const handleItemChange = (index, selectedSubLocation, selectedItem) => {
    // Update formData with the selected item
    updateFormDataItem(index, selectedItem.match(/^[^(]*/)[0].trim());
    console.log(selectedItem.match(/^[^(]*/)[0].trim(), "meingoonselected");

    // Ensure a default value if undefined
    setSelectedItem((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = selectedItem.match(/^[^(]*/)[0].trim();
      return updatedSelectedItems;
    });

    // Find the corresponding data in state.singleincome for the selected item
    const selectedIncomeData = state.singleIncome?.data.filter(
      (incomeItem) =>
        incomeItem.description === selectedItem.match(/^[^(]*/)[0].trim()
    );
    console.log(selectedIncomeData, "selectttttt");
    console.log(selectedItem, "selected item");

    // Extract part numbers from the selected income data
    const partNumbers = selectedIncomeData.map(
      (incomeItem) => incomeItem.pn || []
    );

    // Update the partNumbers state with the selected part numbers
    setPartNo((prevPartNumbers) => {
      const updatedPartNumbers = [...prevPartNumbers];
      updatedPartNumbers[index] = partNumbers.flat(); // Use flat to flatten the nested arrays
      return updatedPartNumbers;
    });
  };

  console.log(partNo, "formmgasi");

  const updateFormDataItem = (index, selectedItem) => {
    setformData((prevFormData) => {
      const updatedItems = [...prevFormData.item];
      updatedItems[index] = selectedItem.match(/^[^(]*/)[0].trim();
      return {
        ...prevFormData,
        item: updatedItems,
      };
    });
  };

  const handlePartNoChange = async (
    index,
    selectedSubLocation,
    selectedPartNo
  ) => {
    // ... (your existing code)

    // Find the corresponding data in state.singleIncome for the selected part number
    const selectedIncomeData = state.singleIncome?.data.find(
      (incomeItem) => incomeItem.pn === selectedPartNo
    );

    // Extract the necessary data from the selected income data
    const partNumberData = {
      date: selectedIncomeData?.date || "",
      unitPrice: selectedIncomeData?.unitCost || "",

      sn: selectedIncomeData?.sn || "",
      brand: selectedIncomeData?.brandName || "",
    };
    updateFormDataPart(index, selectedPartNo, partNumberData);
    // Update formData with the selected part number data
    setPartNumbersData((prevPartNumbersData) => {
      const updatedPartNumbersData = [...prevPartNumbersData];
      updatedPartNumbersData[index] = partNumberData;
      return updatedPartNumbersData;
    });
  };

  const updateFormDataPart = (index, selectedPartNo, partNumberData) => {
    setformData((prevFormData) => {
      const updatedPartNumbersData = [...prevFormData.partNo];
      updatedPartNumbersData[index] = selectedPartNo;

      // Update other relevant properties in formData
      return {
        ...prevFormData,
        partNo: updatedPartNumbersData,

        sn: [...(prevFormData.sn || []), partNumberData.sn], // Keep the previous sn values

        date: [...(prevFormData.date || []), partNumberData.date],
      };
    });
  };

  console.log(partNumbersData, "partNumbersData");
  console.log(partNumbersData?.date, "dateeee");

  console.log(item, "item");
  console.log(formData);

  console.log(formData);

  console.log(formData);

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
      const updateSn = [...(prevFormData.sn || [])]; // Ensure sn is an array
      updateSn[index] = value;
      return {
        ...prevFormData,
        sn: updateSn,
      };
    });
  };
  const handlePurchaseChange = (index, value) => {
    // Update formData with the selected purchase order value
    updateFormDataPurchase(index, value);
  };

  const updateFormDataPurchase = (index, value) => {
    setformData((prevFormData) => {
      const updatedPurchaseOrders = [...prevFormData.purchase];
      updatedPurchaseOrders[index] = value;

      // Assuming partNumbersData is an array with objects
      // Make sure index is valid for partNumbersData array
      const selectedPartNumberData = partNumbersData[index];

      // Update other relevant properties in formData
      return {
        ...prevFormData,
        purchase: updatedPurchaseOrders,
        // Update other properties based on selectedPartNumberData
        date: selectedPartNumberData?.date || "",

        sn: selectedPartNumberData?.sn || "",
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

  const handleDateChange = (date) => {
    setformData({
      ...formData,
      transferDate: date.format("YYYY-MM-DD"),
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

  console.log("All Items Data:", state.item.data);
  const renderFormControls = () => {
    console.log(formControls, "yayerfgyu");
    return formControls?.map((control, index) => (
      <div
        key={control.key}
        style={{ display: "flex", marginBottom: "10px", width: "100%" }}
      >
        <FormControl fullWidth sx={{ width: "40%", marginRight: "10px" }}>
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
        <FormControl fullWidth sx={{ width: "40%", marginRight: "10px" }}>
          <InputLabel id="demo-simple-select-label">Item Desc</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="itemName"
            label="itemName"
            onChange={(e) =>
              handleItemChange(
                index,
                selectedSubLocations[index],
                e.target.value
              )
            }
          >
            {item[index]?.map((filteredItem, itemIndex) => (
              <MenuItem key={itemIndex} value={filteredItem}>
                {filteredItem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          sx={{ width: "50%", marginRight: "10px" }}
          key={control.key}
        >
          <InputLabel id={`part-no-label-${index}`}>Part No</InputLabel>
          <Select
            labelId={`part-no-label-${index}`}
            id={`part-no-select-${index}`}
            label="Part No"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 120, // Adjust the height as needed
                },
              },
            }}
            onChange={(e) =>
              handlePartNoChange(index, selectedPartNo[index], e.target.value)
            }
          >
            {partNo[index]?.map((partNo, partIndex) => (
              <MenuItem key={partIndex} value={partNo}>
                {partNo}
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
              value={partNumbersData[index]?.sn || ""}
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleSnChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: "90%", marginRight: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "90%" }}
              id="outlined-basic"
              label="Purchase Order(D.O.P)"
              variant="outlined"
              value={partNumbersData[index]?.date || ""}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handlePurchaseChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>

        <FormControl fullWidth sx={{ width: "50%", marginRight: "10px" }}>
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

        <FormControl fullWidth sx={{ width: "50%" }}>
          <Grid item xs={12} sm={6}>
            <TextareaAutosize
              aria-label="Brand"
              placeholder="Enter Remarks"
              // value={brandValue} // You can set the value and handle changes as needed
              // onChange={(e) => handleBrandChange(e.target.value)}
              onChange={(e) => handleRemarksChange(index, e.target.value)}
              minRows={2}
              minCols={7} // You can adjust the number of rows as needed
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
  const calculateTotalWeight = () => {
    // Sum up the values in the weights array
    const totalWeightFromWeightsArray = weights.reduce(
      (acc, weight) => acc + parseFloat(weight) || 0,
      0
    );

    // Sum up the values in the form data weights
    const totalWeightFromFormData = formData.weights.reduce(
      (acc, weight) => acc + parseFloat(weight) || 0,
      0
    );

    // Sum up both total weights
    const totalWeight = totalWeightFromFormData;

    return totalWeight.toFixed(2); // Adjust the precision as needed
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
              Consumed Item
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
              value={formData.locationName || ""}
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
        <Grid item xs={12} sm={6}>
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
                    width: "100%",
                    marginTop: "20px",
                    backgroundColor: "secondary",
                  }}
                >
                  <CardContent
                    sx={{ minWidth: "60%", display: "flex", flexWrap: "wrap" }}
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

export default ConsumeItem;
