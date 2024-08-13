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
  import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { fetchInventory } from '../redux/slice/InventorySlice';
  import { fetchIncome } from '../redux/slice/SingleIncomeSlice';
  import dayjs from 'dayjs';
  import { useNavigate, useParams } from 'react-router-dom';
  
  const UpdateMto = () => {
    const [formData, setformData] = useState({
      locationName: '',
      destinationSubLocation: '',
      transferDate: '',
      consigneeName: '',
      status: '',
      repairService: '',
      SubLocation: [],
      description: [],
      sn: [],
      purchase: [],
      quantity: [],
      remarks: [],
      pn: [],
    });
  
    const [mto, setMto] = useState([]);
  
    const state = useSelector((state) => state);
    const [formRows, setFormRows] = useState(1);
    const [formControls, setFormControls] = useState([{ key: 0 }]);
  
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
  
    let navigate = useNavigate();
  
    const { id } = useParams();
  
    console.log(id);
  
    useEffect(() => {
      console.log(currentUser.accessToken, 'heyyyy');
      fetch(`http://localhost:8080/mto/get/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result,"result");
          setMto(result);
        });
    }, []);
  
    const handleClick = (e) => {
      e.preventDefault();
      const update = {
        mto,
      };
      console.log(update);
  
      fetch(`http://localhost:8080/mto/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify(formData),
      })
        .then(() => {
          console.log('Cipl Updated');
          // navigate('/consignee');
        })
        .catch((error) => {
          console.error('Error updating consignee:', error);
        });
    };
  
    const handleDateChange = (transferDate) => {
      setformData({
        ...formData,
        transferDate: transferDate.format('YYYY-MM-DD'),
      });
    };
    console.log(formData, 'formData');
  
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
  
    const renderFormControls = () => {
      return formControls.map((control, index) => (
        <div key={control.key} style={{ display: 'flex', marginBottom: '10px' }}>
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor='outlined-basic'>SubLocation</InputLabel>
            <TextField
              id='outlined-basic'
              variant='outlined'
              value={mto ? mto.SubLocation : ''}
              sx={{ width: '100px', marginRight: '23px' }}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setMto({
                  ...mto,
                  SubLocation: e.target.value,
                });
                setformData(e.target.value);
              }}
              width={'100%'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor='outlined-basic'>Item Description</InputLabel>
            <TextField
              id='outlined-basic'
              variant='outlined'
              value={mto ? mto.description : ''}
              sx={{ width: '100px', marginRight: '23px' }}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setMto({
                  ...mto,
                  idescription: e.target.value,
                });
                setformData(e.target.value);
              }}
              width={'100%'}
            />
          </Grid>
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
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor='outlined-basic'>Part No</InputLabel>
            <TextField
              id='outlined-basic'
              variant='outlined'
              value={mto ? mto.pn : ''}
              sx={{ width: '100px', marginRight: '23px' }}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setMto({
                  ...mto,
                  pn: e.target.value,
                });
                setformData(e.target.value);
              }}
              width={'100%'}
            />
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor='outlined-basic'> S/N</InputLabel>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              variant='outlined'
              //   value={partNumbersData[index]?.sn || ''}
              InputProps={{ readOnly: true }}
              value={mto ? mto.sn : ''}
              onChange={(e) => {
                setMto({
                  ...mto,
                  sn: e.target.value,
                });
                setformData(e.target.value);
              }}
              //   onChange={(e) => handleSnChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor='outlined-basic'>
              {' '}
              Purchase Order(D.O.P)
            </InputLabel>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              variant='outlined'
              //   value={partNumbersData[index]?.date || ''}
              // onChange={(e) => setLocation(e.target.value)}
              //   onChange={(e) => handlePurchaseChange(index, e.target.value)}
              value={mto ? mto.purchase : ''}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setMto({
                  ...mto,
                  purchase: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
            />
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor='outlined-basic'> Quantity</InputLabel>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              variant='outlined'
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              //   onChange={(e) => handleQuantityChange(index, e.target.value)}
              value={mto ? mto.quantity : ''}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setMto({
                  ...mto,
                  quantity: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
            />
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <TextareaAutosize
              sx={{ width: '90%' }}
              aria-label='Brand'
              placeholder='Enter Remarks'
              // value={brandValue} // You can set the value and handle changes as needed
              // onChange={(e) => handleBrandChange(e.target.value)}
              //   onChange={(e) => handleRemarksChange(index, e.target.value)}
              minRows={4} // You can adjust the number of rows as needed
              value={mto ? mto.remarks : ''}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setMto({
                  ...mto,
                  remarks: e.target.value,
                });
                setformData(e.target.value);
              }}
            />
          </Grid>
  
          {/* <div
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
          </div> */}
  
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
                Update Mto
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor='outlined-basic'>Location/Vessel</InputLabel>
            <TextField
              id='outlined-basic'
              variant='outlined'
              value={mto ? mto.locationName : ''}
              sx={{ width: '490px' }}
              onChange={(e) => {
                setformData({
                  ...mto,
                  locationName: e.target.value,
                });
                setMto(e.target.value);
              }}
              width={'50%'}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='demo-simple-select-label'>
                Destinaton SubLocation
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
                onChange={(e) => {
                  setformData({
                    ...formData,
                    destinationSubLocation: e.target.value,
                  });
                }}
                //onChange={handleChange}
              >
                {state.nonPersisted.location.data?.map(
                  (item, index) => (
                    console.log(item, 'meinhun'),
                    item.addresses.map((addressItem, addressIndex) => (
                      <MenuItem key={addressIndex} value={addressItem.address}>
                        {addressItem.address}
                      </MenuItem>
                    ))
                  )
                )}
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor='outlined-basic'>
              Destination SubLocation
            </InputLabel>
            <TextField
              id='destinationSubLocation'
              variant='outlined'
              value={mto ? mto.destinationSublocation : ''}
              sx={{ width: '490px' }}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setMto({
                  ...mto,
                  destinationSubLocation: e.target.value,
                });
                setformData(e.target.value);
              }}
              width={'100%'}
            />
            
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          {/* <Grid item xs={12} sm={6}>
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
          </Grid> */}
  
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor='outlined-basic'>Consignee</InputLabel>
            <TextField
              id='outlined-basic'
              variant='outlined'
              value={mto ? mto.consigneeName : ''}
              sx={{ width: '490px' }}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setMto({
                  ...mto,
                  consigneeName: e.target.value,
                });
                setformData(e.target.value);
              }}
              width={'100%'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%', mt: '23px' }}>
              <InputLabel id='demo-simple-select-label'>
                Repair/Service
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                //value={age}
                value={formData.repairService || ''}
                label='Repair/service'
                sx={{ width: '490px' }}
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
            <InputLabel id='demo-simple-select-label'>Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={mto?.transferDate ? dayjs(mto?.date) : null}
                /* value={
              formData.purchaseDate ? dayjs(formData.purchaseDate) : null
            } */
                //   value={cipl ? cipl.date : ''}
                onChange={(date) => handleDateChange(date)}
                fullWidth
                sx={{ width: '490px' }}
                /* format="yyyy-MM-dd" */
              />
            </LocalizationProvider>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%', mt: '23px' }}>
              <InputLabel id='demo-simple-select-label'>Status</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                //value={age}
                value={mto ? mto.status : ''}
                InputProps={{ readOnly: true }}
                label='Repair/service'
                sx={{ width: '490px' }}
  
                //onChange={handleChange}
                onChange={(e) =>
                  setformData({
                    ...mto,
                    status: e.target.value,
                  })
                }
              >
                <MenuItem value={'verified'}>Verified</MenuItem>
                <MenuItem value={'rejected'}>Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>
  
        <div
          sx={{
            marginTop: '5px',
  
            flexWrap: 'wrap',
            width: '80%',
          }}
        >
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Grid sx={{ overflowX: 'scroll', width: '100%', flexWrap: 'wrap' }}>
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
        </div>
  
        <Button
          variant='contained'
          color='secondary'
          size='large'
          onClick={handleClick}
          sx={{
            mt: '33px',
            mb: '17px',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
          }}
        >
          Update
        </Button>
      </>
    );
  };
  
  export default UpdateMto;
  