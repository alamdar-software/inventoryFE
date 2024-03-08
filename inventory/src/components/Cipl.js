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
} from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchlocation } from '../redux/slice/location';
import { fetchShipper } from '../redux/slice/ShipperSlice';
import { fetchConsignee } from '../redux/slice/ConsigneeSlice';
import { fetchPickup } from '../redux/slice/PickUpSlice';
import { fetchCurrency } from '../redux/slice/CurrencySlice';
import { fetchItem } from '../redux/slice/ItemSlice';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import TextareaAutosize from '@mui/material/TextareaAutosize';
import { fetchIncome } from '../redux/slice/SingleIncomeSlice';
import { fetchInventory } from '../redux/slice/InventorySlice';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
export const Cipl = () => {
  const location = useLocation();
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const [formData, setformData] = useState({
    itemName: '',
    repairService: '',
    transferDate: '',
    shipperName: '',
    consigneeName: '',
    locationName: '',
    pickupAddress: '',
    currencyName: '',
    SubLocations: [],
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
    packageName: [],
    po: '',
    totalWeight: '',
    totalPackage: '',
    totalAmount: '',
    partNo: [],
    date: [],
    currencyRate: '',
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
  const [amounts, setAmounts] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [formRows, setFormRows] = useState(1);
  const [formControls, setFormControls] = useState([{ key: 0 }]);
  const [selectedPartNo, setselectedPartNo] = useState([]);
  const [partNo, setPartNo] = useState(
    Array.from({ length: formRows }, () => [])
  );
  const { currentUser } = state.persisted.user;
  const [partNumbersData, setPartNumbersData] = useState([]);
  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchShipper(currentUser.accessToken));
    dispatch(fetchConsignee(currentUser.accessToken));
    dispatch(fetchPickup(currentUser.accessToken));
    dispatch(fetchCurrency(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
    dispatch(fetchIncome(currentUser.accessToken));
    dispatch(fetchInventory(currentUser.accessToken));
  }, []);
  console.log(state, 'cipl');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/cipl/add', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, 'came from backend');
      toast.success('🦄 Cipl Added Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
        setTimeout(() => {
          window.location.reload();
      }, 3000);
      window.location.reload();
    } catch (error) {
      console.log('something happens while adding cipl');
    }
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setformData({
      ...formData,
      locationName: selectedLocation,
      SubLocations: [''], // Reset sublocation when location changes
    });
    const selectedLocationObj = state.nonPersisted.location.data.find(
      (location) => location.locationName === selectedLocation
    );
    setSubLocations(selectedLocationObj && selectedLocationObj?.addresses);
    console.log(selectedLocationObj, 'yuuuu');
  };

  const handleSubLocationChange = (e, index) => {
    const selectedSubLocation = e.target.value || '';

    // Update formData with the selected sublocation
    updateFormDataSubLocations(index, selectedSubLocation);

    // Ensure a default value if undefined
    setSelectedSubLocations((prevSubLocations) => {
      const updatedSubLocations = [...prevSubLocations];
      updatedSubLocations[index] = selectedSubLocation;
      return updatedSubLocations;
    });

    // Find the corresponding item descriptions in the inventory data
    const selectedInventoryData = state.nonPersisted.inventory.data.filter(
      (inventoryItem) => inventoryItem.address?.address === selectedSubLocation
    );
    console.log(selectedInventoryData, '22');

    // Extract item descriptions from the selected inventory data
    const itemDescriptions = selectedInventoryData.map(
      (inventoryItem) => inventoryItem.description
    );
    console.log(itemDescriptions, '33');

    // Update the item state with the selected item descriptions
    setItem((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = itemDescriptions; // This line is updated
      return updatedItems;
    });
  };
  console.log(item, 'topibaz');

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
  console.log(subLocations, 'subbbbbbbbbbbbb');
  console.log(formData, 'nooooooooooo');

  const handleAddClick = () => {
    setFormRows((prevRows) => prevRows + 1);
    setFormControls((prevControls) => [
      ...prevControls,
      { key: prevControls.length },
    ]);
    setSubLocations((prevSubLocations) => [...prevSubLocations, '']);
    updateFormDataSubLocations(formControls.length, ''); // Add an empty string to SubLocation
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

      // Remove the entry at the specified index from formData.weights
      updatedFormData.weights = [
        ...prevFormData.weights.slice(0, index),
        ...prevFormData.weights.slice(index + 1),
      ];

      // Track the deleted sublocation
      const deletedSubLocation = prevFormData.SubLocations[index];

      // If you have other arrays in formData that should be updated, do it here
      // For example:
      // updatedFormData.otherData = [...prevFormData.otherData.slice(0, index), ...prevFormData.otherData.slice(index + 1)];

      // Store the deleted sublocation in a separate array
      updatedFormData.deletedSubLocations = [
        ...(prevFormData.deletedSubLocations || []),
        deletedSubLocation,
      ];

      // Remove deleted sublocations from the main SubLocations array
      updatedFormData.SubLocations = prevFormData.SubLocations.filter(
        (subLocation, i) => i !== index
      );
      updatedFormData.itemName = [
        ...prevFormData.itemName.slice(0, index),
        ...prevFormData.itemName.slice(index + 1),
      ];
      updatedFormData.amount = [
        ...prevFormData.amount.slice(0, index),
        ...prevFormData.amount.slice(index + 1),
      ];
      updatedFormData.brand = [
        ...prevFormData.brand.slice(0, index),
        ...prevFormData.brand.slice(index + 1),
      ];
      updatedFormData.cor = [
        ...prevFormData.cor.slice(0, index),
        ...prevFormData.cor.slice(index + 1),
      ];
      updatedFormData.dimension = [
        ...prevFormData.dimension.slice(0, index),
        ...prevFormData.dimension.slice(index + 1),
      ];
      updatedFormData.hs = [
        ...prevFormData.hs.slice(0, index),
        ...prevFormData.hs.slice(index + 1),
      ];
      updatedFormData.item = [
        ...prevFormData.item.slice(0, index),
        ...prevFormData.item.slice(index + 1),
      ];
      updatedFormData.packageName = [
        ...prevFormData.packageName.slice(0, index),
        ...prevFormData.packageName.slice(index + 1),
      ];
      updatedFormData.purchase = [
        ...prevFormData.purchase.slice(0, index),
        ...prevFormData.purchase.slice(index + 1),
      ];
      updatedFormData.quantity = [
        ...prevFormData.quantity.slice(0, index),
        ...prevFormData.quantity.slice(index + 1),
      ];
      updatedFormData.remarks = [
        ...prevFormData.remarks.slice(0, index),
        ...prevFormData.remarks.slice(index + 1),
      ];
      updatedFormData.sn = [
        ...prevFormData.sn.slice(0, index),
        ...prevFormData.sn.slice(index + 1),
      ];
      updatedFormData.unitPrice = [
        ...prevFormData.unitPrice.slice(0, index),
        ...prevFormData.unitPrice.slice(index + 1),
      ];
      updatedFormData.weights = [
        ...prevFormData.weights.slice(0, index),
        ...prevFormData.weights.slice(index + 1),
      ];
      updatedFormData.date = [
        ...prevFormData.date.slice(0, index),
        ...prevFormData.date.slice(index + 1),
      ];
      updatedFormData.partNo = [
        ...prevFormData.partNo.slice(0, index),
        ...prevFormData.partNo.slice(index + 1),
      ];
      return updatedFormData;
    });
  };

  console.log(formData, 'naya');

  const handleItemChange = (index, selectedSubLocation, selectedItem) => {
    // Update formData with the selected item
    updateFormDataItem(index, selectedItem);

    // Ensure a default value if undefined
    setSelectedItem((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = selectedItem;
      return updatedSelectedItems;
    });

    // Find the corresponding data in state.singleincome for the selected item
    const selectedIncomeData = state?.nonPersisted.singleIncome?.data?.filter(
      (incomeItem) => incomeItem.description.match(/^[^-(]*/)[0].trim() === selectedItem.match(/^[^-(]*/)[0].trim()
    );
    console.log(selectedIncomeData, 'selectttttt');
    console.log(selectedItem, 'selected item');

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

  console.log(partNo, 'formmgasi');

  const updateFormDataItem = (index, selectedItem) => {
    setformData((prevFormData) => {
      const updatedItems = [...prevFormData.item];
      updatedItems[index] = selectedItem;
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
    const selectedIncomeData = state.nonPersisted.singleIncome?.data.find(
      (incomeItem) => incomeItem.pn === selectedPartNo
    );

    // Extract the necessary data from the selected income data
    const partNumberData = {
      date: selectedIncomeData?.date || '',
      unitPrice: selectedIncomeData?.unitCost || '',

      sn: selectedIncomeData?.sn || '',
      brand: selectedIncomeData?.brandName || '',
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

        brand: [...(prevFormData.brand || []), partNumberData.brand],
        sn: [...(prevFormData.sn || []), partNumberData.sn], // Keep the previous sn values
        amount: [...(prevFormData.amount || []), partNumberData.amount],
        date: [...(prevFormData.date || []), partNumberData.date],
        unitPrice: [
          ...(prevFormData.unitPrice || []),
          String(partNumberData.unitPrice),
        ],
      };
    });
  };

  console.log(partNumbersData, 'partNumbersData');
  console.log(partNumbersData?.date, 'dateeee');

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
        hs: updateHS,
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
      const updatePackage = [...prevFormData.packageName];
      updatePackage[index] = value;
      return {
        ...prevFormData,
        packageName: updatePackage,
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
  console.log(item, 'item');
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
  console.log(dimension, 'dimension');
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
  console.log(weights, 'weights');
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
        date: selectedPartNumberData?.date || '',
        unitPrice: selectedPartNumberData?.unitPrice || '',
        amount: selectedPartNumberData?.amount || '',
        brand: selectedPartNumberData?.brand || '',
        sn: selectedPartNumberData?.sn || '',
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
    calculateAndUpdateAmount(index);
  };

  const handleQuantityChange = (index, value) => {
    updateFormDataQuantity(index, value);
    setQuantity((prevQuantity) => {
      const updateQuantity = [...prevQuantity];
      updateQuantity[index] = value;
      return updateQuantity;
    });
    calculateAndUpdateAmount(index);
  };
  const calculateAndUpdateAmount = (index) => {
    const calculatedAmount = calculateAmount(
      formData.quantity[index],
      partNumbersData[index]?.unitPrice || 0
    );

    setAmounts((prevAmounts) => {
      const updatedAmounts = [...prevAmounts];
      updatedAmounts[index] = calculatedAmount;
      return updatedAmounts;
    });

    updateFormDataAmount(index, calculatedAmount);
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
  };

  const updateFormDataAmount = (index, value) => {
    setformData((prevFormData) => {
      const updateAmount = calculateAmount(
        prevFormData.quantity[index],
        partNumbersData[index]?.unitPrice || 0
      );

      const updatedAmounts = [...prevFormData.amount];
      updatedAmounts[index] = updateAmount;
      console.log(updateAmount, 'rusiiiiiiiiiiiiiiii');
      console.log(updatedAmounts, 'ruseeeeeeeeeeeeee');
      return {
        ...prevFormData,
        amount: updatedAmounts,
      };
    });
  };
  const calculateAmount = (quantity, unitCost) => {
    const parsedQuantity = parseFloat(quantity);
    const parsedUnitCost = parseFloat(unitCost);

    if (!isNaN(parsedQuantity) && !isNaN(parsedUnitCost)) {
      return (parsedQuantity * parsedUnitCost).toFixed(2);
    } else {
      return '';
    }
  };

  const handleBrandChange = (index, value) => {
    updateFormDataBrand(index, value);
    setBrand((prevBrand) => {
      const updateBrand = [...prevBrand];
      updateBrand[index] = value;
      return updateBrand;
    });
  };
  const handleDateChange = (date) => {
    setformData({
      ...formData,
      transferDate: date.format('YYYY-MM-DD'),
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

  console.log('All Items Data:', state.nonPersisted.item.data);
  const renderFormControls = () => {
    console.log(formControls, 'yayerfgyu');
    return formControls?.map((control, index) => (
      <div key={control.key} style={{ display: 'flex', marginBottom: '10px' }}>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <InputLabel id='demo-simple-select-label'>Sub Location</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='location'
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
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Item Desc</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='itemName'
            label='itemName'
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
        <FormControl fullWidth sx={{ width: '70%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '100%' }}
              id='outlined-basic'
              label='Package Name'
              variant='outlined'
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handlePackageChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '30%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Hs'
              variant='outlined'
              // value={sn}
              onChange={(e) => handleHsChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='Country Of Origin'
              label='Country Of Origin'
              variant='outlined'
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) =>
                handleCountryOfOriginChange(index, e.target.value)
              }
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Dimension(CM)'
              variant='outlined'
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleDimensionChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '40%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Weights(Kg)'
              variant='outlined'
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleWeightsChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>

        <FormControl
          fullWidth
          sx={{ width: '50%', marginRight: '10px' }}
          key={control.key}
        >
          <InputLabel id={`part-no-label-${index}`}>Part No</InputLabel>
          <Select
            labelId={`part-no-label-${index}`}
            id={`part-no-select-${index}`}
            label='Part No'
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
        <FormControl fullWidth sx={{ width: '30%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='S/N'
              variant='outlined'
              value={partNumbersData[index]?.sn || ''}
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleSnChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '90%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Purchase Order(D.O.P)'
              variant='outlined'
              value={partNumbersData[index]?.date || ''}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handlePurchaseChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '60%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Unit Price'
              variant='outlined'
              value={partNumbersData[index]?.unitPrice || ''}
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleUnitPriceChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Quantity'
              variant='outlined'
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '80%' }}
              id='outlined-basic'
              label='Amount'
              variant='outlined'
              value={formData.amount[index] || ''}
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              /* onChange={(e) => handleAmountChange(index, e.target.value)} */
              fullWidth
              readOnly
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Brand'
              variant='outlined'
              value={partNumbersData[index]?.brand || ''}
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={(e) => handleBrandChange(index, e.target.value)}
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextareaAutosize
              sx={{ width: '90%' }}
              aria-label='Brand'
              placeholder='Enter Remarks'
              // value={brandValue} // You can set the value and handle changes as needed
              // onChange={(e) => handleBrandChange(e.target.value)}
              onChange={(e) => handleRemarksChange(index, e.target.value)}
              minRows={4} // You can adjust the number of rows as needed
            />
          </Grid>
        </FormControl>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '60px',
          }}
        >
          <button>
            <AddIcon onClick={handleAddClick} />
          </button>
          <Button onClick={() => handleDeleteClick(index)}>
            <DeleteIcon style={{ color: 'red' }} />
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

  const calculateTotalAmount = () => {
    // Assuming you have quantities and unit prices arrays in your formData
    const totalAmountFromFormData = formData.quantity.reduce(
      (acc, quantity, index) => {
        const unitPrice = parseFloat(formData.unitPrice[index]) || 0;
        return acc + quantity * unitPrice;
      },
      0
    );

    return totalAmountFromFormData.toFixed(2); // Adjust the precision as needed
  };

  useEffect(() => {
    const totalWeight = calculateTotalWeight();
    const uniquePackageNames = [...new Set(formData.package)];
    const totalPackageCount = uniquePackageNames.length;
    const totalAmount = calculateTotalAmount();

    setformData((prevFormData) => ({
      ...prevFormData,
      totalWeight: totalWeight,
      totalPackage: String(totalPackageCount),
      totalAmount: totalAmount,
    }));
  }, [formData.packageName, formData.quantity, formData.unitPrice]);
  const renderweightandTotal = () => {
    const totalWeight = calculateTotalWeight();
    const uniquePackageNames = [...new Set(formData.packageName)];
    const totalAmount = calculateTotalAmount();
    // Calculate the total package count
    const totalPackageCount = uniquePackageNames.length;

    // Update the formData with calculated values

    return (
      <Grid container spacing={1} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={4}>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            label='Total  Weight'
            variant='outlined'
            value={totalWeight}
            // value={locationName}
            // onChange={(e) => setLocation(e.target.value)}
            onChange={(e) =>
              setformData({
                ...formData,
                totalWeight: totalWeight,
              })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            label='Total  Package'
            variant='outlined'
            value={totalPackageCount}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            label='Total  Amount'
            variant='outlined'
            value={totalAmount}
            // onChange={(e) => setLocation(e.target.value)}
            fullWidth
            readOnly
          />
        </Grid>
      </Grid>
    );
  };
  const renderAdditionalFields = () => {
    if (formData.repairService === true) {
      return (
        <>
          {/* Additional fields for 'Repair/Service' Yes */}
          <Grid item xs={21} sm={6}>
            <TextField
              id='outlined-basic'
              label='Po/SO No'
              variant='outlined'
              fullWidth
              sx={{ width: '90%' }}
              onChange={(e) =>
                setformData({
                  ...formData,
                  po: e.target.value,
                })
              }
            />
          </Grid>
          {/* Add more additional fields as needed */}
        </>
      );
    } else {
      // No additional fields for 'Repair/Service' No
      return null;
    }
  };

  return (
    <>
      <Grid>
        <Card
          color='secondary'
          sx={{
            width: '100%',
            backgroundColor: 'secondary',
            borderBottom: '2px solid yellow',
            mb: '33px',
          }}
        >
          <CardContent>
            <Typography variant='h4' color='secondary' gutterBottom>
              CIPL Transfer
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Location</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              value={formData.locationName || ''}
              label='location'
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
              {state.nonPersisted.location.data?.map((item, index) => (
                <MenuItem key={index} value={item?.locationName}>
                  {' '}
                  {item?.locationName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Shipper</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              label='shipper'
              value={formData.shipperName || ''}
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
              {state.nonPersisted.shipper.data?.map((item, index) => (
                <MenuItem key={index} value={item?.shipperName}>
                  {' '}
                  {item?.shipperName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              /* value={
            formData.purchaseDate ? dayjs(formData.purchaseDate) : null
          } */
              onChange={(newDate) => handleDateChange(newDate)}
              fullWidth
              sx={{ width: '90%' }}
              /* format="yyyy-MM-dd" */
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Consignee</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              label='consignee'
              value={formData.consigneeName || ''}
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
              {state.nonPersisted.consignee.data?.map((item, index) => (
                <MenuItem key={index} value={item?.consigneeName}>
                  {' '}
                  {item?.consigneeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Pickup Address
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              value={formData.pickupAddress || ''}
              label='pickupAddress'
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
              {state?.nonPersisted.pickup.data?.map((item, index) => (
                <MenuItem key={index} value={item?.pickupAddress}>
                  {' '}
                  {item?.pickupAddress}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Select Currency
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              value={formData.currencyName || ''}
              label='selectCurrency'
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
              {state.nonPersisted.currency.data?.currencyList.map(
                (item, index) => (
                  <MenuItem key={index} value={item?.currencyName}>
                    {' '}
                    {item?.currencyName}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            label='Currency Rate'
            variant='outlined'
            // value={locationName}
            // onChange={(e) => setLocation(e.target.value)}
            onChange={(e) =>
              setformData({
                ...formData,
                currencyRate: e.target.value,
              })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Repair/Service
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              value={formData.repairService || ''}
              label='Repair/service'
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
        {renderAdditionalFields()}
      </Grid>
      <div
        sx={{
          marginTop: '5px',

          flexWrap: 'wrap',
          width: '80%',
        }}
      >
        {formData.locationName && (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Grid
                sx={{ overflowX: 'scroll', width: '100%', flexWrap: 'wrap' }}
              >
                <Card
                  color='secondary'
                  sx={{
                    width: '180%',
                    marginTop: '20px',
                    backgroundColor: 'secondary',
                  }}
                >
                  <CardContent
                    sx={{ minWidth: '100%', display: 'flex', flexWrap: 'wrap' }}
                  >
                    {renderFormControls()}
                  </CardContent>
                </Card>
              </Grid>
              {renderweightandTotal()}
            </div>
          </>
        )}
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '33px' }}>
        {' '}
        <Button
          variant='contained'
          size='large'
          color='secondary'
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Box>
    </>
  );
};

export default Cipl;
