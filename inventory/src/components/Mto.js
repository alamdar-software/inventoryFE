import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchConsignee } from '../redux/slice/ConsigneeSlice';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fetchInventory } from '../redux/slice/InventorySlice';
import { fetchIncome } from '../redux/slice/SingleIncomeSlice';
import { toast } from 'react-toastify';

const Mto = () => {
  const state = useSelector((state) => state);
  // const [loading, setLoading] = useState(true); // State for loading
  const [formData, setformData] = useState({
    locationName: '',
    destinationSubLocation: '',
    transferDate: '',
    consigneeName: '',
    repairService: '',
    SubLocation: [],
    description: [],
    sn: [],
    purchase: [],
    quantity: [],
    remarks: [],
    partNo: [],
  });

  const [subLocations, setSubLocations] = useState([]);
  const [description, setDescription] = useState([]);
  const [sn, setSn] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [remarks, setRemarks] = useState([]);

  const [formRows, setFormRows] = useState(1);
  const [formControls, setFormControls] = useState([{ key: 0 }]);
  const [selectedSubLocations, setSelectedSubLocations] = useState([]);
  const [item, setItem] = useState([]);
  const [partNumbersData, setPartNumbersData] = useState([]);
  const [selectedPartNo, setselectedPartNo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [partNo, setPartNo] = useState(
    Array.from({ length: formRows }, () => [])
  );
  const { currentUser } = state.persisted.user;
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchConsignee(currentUser.accessToken));
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
    dispatch(fetchInventory(currentUser.accessToken));
    dispatch(fetchIncome(currentUser.accessToken));
  }, []);
  console.log(state, 'mto');

  // const handleSubLocationChange = (index, value) => {
  //   updateFormDataSubLocation(index, value);
  //   setSubLocations((prevSubLocations) => {
  //     const updatedSubLocations = [...prevSubLocations];
  //     updatedSubLocations[index] = value;
  //     return updatedSubLocations;
  //   });
  // };
  // console.log(subLocations);
  // console.log(formData);
  const handleClick = (e) => {
    e.preventDefault();

    // const formData = {
    //   locationName,
    // };

    console.log(formData);

    fetch('http://localhost:8080/mto/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(formData),
    }).then(() => {
      toast.success('🦄 Mto  Added Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
     
      console.log('MTO Added');
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
    const selectedLocationObj = state.nonPersisted.location.data.find(
      (location) => location.locationName === selectedLocation
    );
    setSubLocations(selectedLocationObj ? selectedLocationObj?.addresses : []);
  };
  console.log(subLocations, 'subbbbb');

  // const handleSubLocationChange = (e, index) => {
  //   const selectedSubLocation = e.target.value || ''; // Ensure a default value if undefined
  //   updateFormDataSubLocation(index, selectedSubLocation);
  //   setSelectedSubLocations((prevSubLocations) => {
  //     const updatedSubLocations = [...prevSubLocations];
  //     updatedSubLocations[index] = selectedSubLocation;
  //     return updatedSubLocations;
  //   });

  //   const selectedInventoryData = state.nonPersisted.inventory.data.filter(
  //     (inventoryItem) => inventoryItem.address?.address === selectedSubLocation
  //   );
  //   console.log(selectedInventoryData, '22');

  //   // Extract item descriptions from the selected inventory data
  //   const itemDescriptions = selectedInventoryData.map(
  //     (inventoryItem) => inventoryItem.description
  //   );
  //   console.log(itemDescriptions, '33');

  //   // Update the item state with the selected item descriptions
  //   setItem((prevItems) => {
  //     const updatedItems = [...prevItems];
  //     updatedItems[index] = itemDescriptions; // This line is updated
  //     return updatedItems;
  //   });
  // };
  const handleSubLocationChange = (e, index) => {
    const selectedSubLocation = e.target.value || ''; 
    updateFormDataSubLocation(index, selectedSubLocation);
    setSelectedSubLocations((prevSubLocations) => {
      const updatedSubLocations = [...prevSubLocations];
      updatedSubLocations[index] = selectedSubLocation;
      return updatedSubLocations;
    });
  
    // Start the loader
    setIsLoading(true);
  
    // Simulate the fetching of item descriptions based on the sublocation
    const selectedInventoryData = state.nonPersisted.inventory.data.filter(
      (inventoryItem) => inventoryItem.address?.address === selectedSubLocation
    );
  
    // Extract item descriptions from the selected inventory data
    const itemDescriptions = selectedInventoryData.map(
      (inventoryItem) => inventoryItem.description
    );
  
    // Set loading to false when data is fetched
    setIsLoading(itemDescriptions.length === 0);
  
    // Update the item state with the selected item descriptions
    setItem((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = itemDescriptions;
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
  const handleDateChange = (transferDate) => {
    setformData({
      ...formData,
      transferDate: transferDate.format('YYYY-MM-DD'),
    });
  };
  console.log(formData,"heyyyy");

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
  const handleDescriptionChange = (index, description) => {
    updateFormDataDescription(index, description);
    setDescription((prevDescription) => {
      const updateDescription = [...prevDescription];
      updateDescription[index] = description.match(/^[^-(]*/)[0].trim();
      return updateDescription;
    });
    // Find the corresponding data in state.singleincome for the selected item
    const selectedIncomeData = state.nonPersisted.singleIncome?.data.filter(
      (incomeItem) => incomeItem.description === description.match(/^[^-(]*/)[0].trim()
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

  const handleAddClick = () => {
    setFormRows((prevRows) => prevRows + 1);
    setFormControls((prevControls) => [
      ...prevControls,
      { key: prevControls.length },
    ]);
    setSubLocations((prevSubLocations) => [...prevSubLocations, '']);
    updateFormDataSubLocation(formControls.length, '');
  };

  const handleDeleteClick = (index) => {
    if (formControls.length > 1) {
      setFormControls((prevControls) =>
        prevControls.filter((_, i) => i !== index)
      );

      // Update other state variables accordingly
      setSubLocations((prevSubLocations) => {
        // No need to remove any sublocations
        return prevSubLocations;
      });
      setSelectedSubLocations((prevSelectedSubLocations) =>
        prevSelectedSubLocations.filter((_, i) => i !== index)
      );

      setformData((prevFormData) => {
        const updatedFormData = { ...prevFormData };

        // Remove the entry at the specified index from formData.SubLocation
        updatedFormData.SubLocation = [
          ...prevFormData.SubLocation.slice(0, index),
          ...prevFormData.SubLocation.slice(index + 1),
        ];

        // Repeat the above line for other arrays in your form data
        updatedFormData.item = [
          ...prevFormData.item.slice(0, index),
          ...prevFormData.item.slice(index + 1),
        ];
        updatedFormData.sn = [
          ...prevFormData.sn.slice(0, index),
          ...prevFormData.sn.slice(index + 1),
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

        // Update other arrays in formData as needed

        return updatedFormData;
      });
    }
  };

  console.log(formData);

  const renderFormControls = () => {
    return formControls.map((control, index) => (
      <div key={control.key} style={{ display: 'flex', marginBottom: '10px' }}>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <InputLabel id='demo-simple-select-label'>Sub Location</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            //value={age}
            label='sublocation'
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
              <MenuItem key={index} value={address?.address}>
                {address?.address}
              </MenuItem>
            ))}
            {/* {subLocations.location.data?.map((item, index) => (
              <MenuItem key={index} value={item?.locationName}>
                {' '}
                {item?.locationName}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>
        {/* <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <InputLabel id='demo-simple-select-label'>
            Item Description
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='description'
            //value={age}
            label='description'
            // onChange={(e) =>
            //   setformData({
            //     ...formData,
            //     itemName: e.target.value,
            //   })
            // }
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
        </FormControl> */}
      <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
  <InputLabel id='demo-simple-select-label'>Item Description</InputLabel>
  {isLoading ? (
    <div style={{ padding: '3px', textAlign: 'center', marginTop: '27px' }}>Loading...</div>
  ) : (
    <Select
      labelId='demo-simple-select-label'
      id='description'
      label='Item Description'
      onChange={(e) => handleDescriptionChange(index, e.target.value)}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 120,
          },
        },
      }}
    >
      {item[index]?.map((filteredItem, itemIndex) => (
        <MenuItem key={itemIndex} value={filteredItem}>
          {filteredItem}
        </MenuItem>
      ))}
    </Select>
  )}
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
            //onChange={handleChange}
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
          <Button onClick={() => handleDeleteClick(index)}>
            <DeleteIcon style={{ color: 'red' }} />
          </Button>
        </div>

        {/* Repeat similar blocks for other form controls */}
      </div>
    ));
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
            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              Transfer Mto
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
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Destinaton SubLocation
            </InputLabel>
            <Select
              labelId='destinationSubLocation'
              id='destinationSubLocation'
              //value={age}
              label='location'
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120, // Adjust the height as needed
                  },
                },
              }}
              onChange={(e) => {
                setformData({
                  ...formData,
                  destinationSubLocation: e.target.value,
                });
              }}
              //onChange={handleChange}
            >

              {/* {state.nonPersisted.location.data?.map(
                (item, index) => (
                  console.log(item, 'meinhun'),
                  item.addresses.map((addressItem, addressIndex) => (
                    <MenuItem key={addressIndex} value={addressItem.address}>
                      {addressItem.address}
                    </MenuItem>
                  ))
                )
              )} */}
              {subLocations.map((address, index) => (
              <MenuItem key={index} value={address?.address}>
                {address?.address}
              </MenuItem>
            ))}


            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Consignee</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              label='consignee'
              onChange={(e) =>
                setformData({
                  ...formData,
                  consigneeName: e.target.value,
                })
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // Adjust the height as needed
                  },
                },
              }}
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
        <Grid item xs={12} sm={6}>
        <InputLabel shrink>Request Date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={formData.transferDate}
              onChange={(newDate) => handleDateChange(newDate)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </LocalizationProvider>
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

export default Mto;
