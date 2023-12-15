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

const Mto = () => {
  const [formData, setformData] = useState({
    locationName: '',
    transferDate: '',
    consigneeName: '',
    repairService: '',
    SubLocation: [],
    item: [],
    sn: [],
    purchase: [],
    quantity: [],
    remarks: [],
  });

  const [subLocations, setSubLocations] = useState([]);
  const [item, setItem] = useState([]);
  const [sn, setSn] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const state = useSelector((state) => state);
  const [formRows, setFormRows] = useState(1);
  const [formControls, setFormControls] = useState([{ key: 0 }]);
  const [selectedSubLocations, setSelectedSubLocations] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchConsignee());
    dispatch(fetchlocation());
    dispatch(fetchItem());
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
  console.log(subLocations, 'subbbbb');

  const handleSubLocationChange = (e, index) => {
    const selectedSubLocation = e.target.value || ''; // Ensure a default value if undefined
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
  console.log(subLocations, 'subbbbbbbbbbbbb');
  console.log(formData, 'nooooooooooo');

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
  const handleItemChange = (index, value) => {
    updateFormDataItem(index, value);
    setItem((prevItem) => {
      const updateItem = [...prevItem];
      updateItem[index] = value;
      return updateItem;
    });
  };
  console.log(item, 'item');
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
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <InputLabel id='demo-simple-select-label'>Item Name</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='itemName'
            //value={age}
            label='itemName'
            // onChange={(e) =>
            //   setformData({
            //     ...formData,
            //     itemName: e.target.value,
            //   })
            // }
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
                {' '}
                {item?.itemName}
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
              setformData({
                ...formData,
                locationName: e.target.value,
              })
            }
            //onChange={handleChange}
          >
            {state.location.data?.map((item, index) => (
              <MenuItem key={index} value={item?.locationName}>
                {' '}
                {item?.locationName}
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
              // value={sn}
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
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
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
              {state.location.data?.map((item, index) => (
                <MenuItem key={index} value={item?.locationName}>
                  {' '}
                  {item?.locationName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            label='Transfer Date'
            variant='outlined'
            // value={locationName}
            // onChange={(e) => setLocation(e.target.value)}
            fullWidth
          />
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
              //onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // Adjust the height as needed
                  },
                },
              }}
            >
              {state.consignee.data?.map((item, index) => (
                <MenuItem key={index} value={item?.name}>
                  {' '}
                  {item?.name}
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
              label='Repair/service'
              //onChange={handleChange}
            >
              <MenuItem value={'Yes'}>Yes</MenuItem>
              <MenuItem value={'No'}>No</MenuItem>
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
        <Button variant='contained' size='large' color='secondary'>
          Add
        </Button>
      </Box>
    </>
  );
};

export default Mto;
