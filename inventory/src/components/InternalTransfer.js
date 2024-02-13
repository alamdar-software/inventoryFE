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
  TextareaAutosize,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fetchInventory } from '../redux/slice/InventorySlice';
import { fetchIncome } from '../redux/slice/SingleIncomeSlice';
const InternalTransfer = () => {
  const [formData, setformData] = useState({
    locationName: '',
    transferDate: '',
    destination: '',

    SubLocation: [],
    description: [],
    sn: [],
    partNo: [],
    purchase: [],
    quantity: [],
    remarks: [],
  });
  const dispatch = useDispatch();
  const [subLocations, setSubLocations] = useState([]);
  const [description, setDescription] = useState([]);
  const [sn, setSn] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const state = useSelector((state) => state);
  const [formControls, setFormControls] = useState([{ key: 0 }]);
  const [item, setItem] = useState([]);
  const [formRows, setFormRows] = useState(1);
  const [partNumbersData, setPartNumbersData] = useState([]);
  const [selectedPartNo, setselectedPartNo] = useState([]);
  const [partNo, setPartNo] = useState(
    Array.from({ length: formRows }, () => [])
  );
  const { currentUser } = state.persisted.user;
  const [selectedSubLocations, setSelectedSubLocations] = useState([]);

  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
    dispatch(fetchInventory(currentUser.accessToken));
    dispatch(fetchIncome(currentUser.accessToken));
  }, []);
  console.log(state);

  const handleClick = (e) => {
    e.preventDefault();

    // const formData = {
    //   locationName,
    // };

    console.log(formData);

    fetch('http://localhost:8080/internaltransfer/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(formData),
    }).then(() => {
      console.log('Internal Transfer Added');
      //window.location.reload();
    });
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setformData({
      ...formData,
      locationName: selectedLocation,
      // Reset sublocation when location changes
    });
    const selectedLocationObj = state.location.data.find(
      (location) => location.locationName === selectedLocation
    );
    setSubLocations(selectedLocationObj ? selectedLocationObj?.addresses : []);
  };

  // const handleSubLocationChange = (e, index) => {
  //   const value = e.target.value;

  //   setSubLocations((prevSubLocations) => {
  //     const updatedSubLocations = [...prevSubLocations];
  //     updatedSubLocations[index] = value;
  //     return updatedSubLocations;
  //   });

  //   setformData((prevFormData) => {
  //     const updatedFormData = {
  //       ...prevFormData,
  //       SubLocation: [...prevFormData.SubLocation],
  //     };
  //     updatedFormData.SubLocation[index] = value;
  //     return updatedFormData;
  //   });
  // };
  // console.log(subLocations);
  // console.log(formData);

  // const updateFormDataSubLocation = (index, value) => {
  //   setformData((prevFormData) => {
  //     const updatedSubLocations = [...prevFormData.SubLocation];
  //     updatedSubLocations[index] = value;
  //     return {
  //       ...prevFormData,
  //       SubLocation: updatedSubLocations,
  //     };
  //   });
  // };
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

  const handleDateChange = (transferDate) => {
    setformData({
      ...formData,
      transferDate: transferDate.format('YYYY-MM-DD'),
    });
  };
  console.log(formData);
  const handleSubLocationChange = (e, index) => {
    const selectedSubLocation = e.target.value || ''; // Ensure a default value if undefined
    updateFormDataSubLocation(index, selectedSubLocation);
    setSelectedSubLocations((prevSubLocations) => {
      const updatedSubLocations = [...prevSubLocations];
      updatedSubLocations[index] = selectedSubLocation;
      return updatedSubLocations;
    });

    const selectedInventoryData = state.inventory.data.filter(
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
  console.log(subLocations, 'subbbbbbbbbbbbb');
  console.log(formData, 'nooooooooooo');

  const handleDescriptionChange = (index, description) => {
    updateFormDataDescription(index, description);
    setDescription((prevDescription) => {
      const updateDescription = [...prevDescription];
      updateDescription[index] = description;
      return updateDescription;
    });
    // Find the corresponding data in state.singleincome for the selected item
    const selectedIncomeData = state.singleIncome?.data.filter(
      (incomeItem) =>
        incomeItem.description === description.match(/^[^(]*/)[0].trim()
    );
    console.log(selectedIncomeData, 'selectttttt');
    console.log(description, 'selected item');

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
  console.log(description, 'item');
  console.log(formData);

  const updateFormDataDescription = (index, value) => {
    setformData((prevFormData) => {
      const updateDescription = [...prevFormData.description];
      updateDescription[index] = value;
      return {
        ...prevFormData,
        description: updateDescription,
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
  const handleAddClick = () => {
    setFormRows((prevRows) => prevRows + 1);
    setFormControls((prevControls) => [
      ...prevControls,
      { key: prevControls.length },
    ]);
    setSubLocations((prevSubLocations) => [...prevSubLocations, '']);
    updateFormDataSubLocation(formControls.length, '');
  };

  const handleDeleteClick = () => {
    if (formRows > 1) {
      setFormRows((prevRows) => prevRows - 1);
      setFormControls((prevControls) => prevControls.slice(0, -1));
    }
  };
  const renderFormControls = () => {
    return formControls.map((control, index) => (
      <div key={control.key} style={{ display: 'flex', marginBottom: '10px' }}>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <InputLabel id='demo-simple-select-label'>Sub Location</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            //value={age}
            label='location'
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 120, // Adjust the height as needed
                },
              },
            }}
            onChange={(e) => handleSubLocationChange(e, index)}
            // onChange={(e) =>
            //   setformData({
            //     ...formData,
            //     locationName: e.target.value,
            //   })
            // }
            //onChange={handleChange}
          >
            {subLocations.map((address, index) => (
              <MenuItem key={index} value={address.address}>
                {address.address}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <InputLabel id='demo-simple-select-label'>
            Item Description
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='description'
            //value={age}
            label='description'
            onChange={(e) =>
              handleDescriptionChange(
                index,
                // selectedSubLocations[index],
                e.target.value
              )
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
            {item[index]?.map((filteredItem, itemIndex) => (
              <MenuItem key={itemIndex} value={filteredItem}>
                {filteredItem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <InputLabel id='demo-simple-select-label'>Part No</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            //value={age}
            label='location'
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
              onChange={(e) => handleSnChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '30%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Purchase Order(D.O.P)'
              variant='outlined'
              value={partNumbersData[index]?.date || ''}
              onChange={(e) => handlePurchaseChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '30%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Quantity'
              variant='outlined'
              // value={locationName}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              fullWidth
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
          }}
        >
          <button>
            <AddIcon onClick={handleAddClick} />
          </button>
          <Button onClick={handleDeleteClick}>
            <DeleteIcon style={{ color: 'red' }} />
          </Button>
        </div>

        {/* Repeat similar blocks for other form controls */}
      </div>
    ));
  };
  console.log(state, 'statesss');
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
            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              Internal Transfer
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Location</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
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
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={formData.transferDate}
              onChange={(newDate) => handleDateChange(newDate)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '33px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Destination/SubLocation
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              label='location'
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
                  destination: e.target.value,
                })
              }
            >
              {state.nonPersisted.location.data?.flatMap((location) =>
                location.addresses.map((subLocation) => (
                  <MenuItem key={subLocation.id} value={subLocation.address}>
                    {subLocation.address}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
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
                    width: '111%',
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
          onClick={handleClick}
        >
          Add
        </Button>
      </Box>
    </>
  );
};

export default InternalTransfer;
