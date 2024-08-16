import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchConsignee } from '../redux/slice/ConsigneeSlice';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import { fetchInventory } from '../redux/slice/InventorySlice';
import { fetchIncome } from '../redux/slice/SingleIncomeSlice';
const UpdateMto = () => {
  const [formData, setFormData] = useState({});
  const [mto, setMto] = useState({});
  const [subLocations, setSubLocations] = useState([]);
  const [item, setItem] = useState([]);
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;
  const dispatch = useDispatch();
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchConsignee(currentUser.accessToken));
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
    dispatch(fetchInventory(currentUser.accessToken));
    dispatch(fetchIncome(currentUser.accessToken));
  }, [dispatch, currentUser.accessToken]);

  useEffect(() => {
    fetch(`http://localhost:8080/mto/get/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMto(result);
        setFormData(result);
      });
  }, [id, currentUser.accessToken]);

  useEffect(() => {
    if (mto.locationName) {
      const selectedLocationObj = state?.nonPersisted?.location?.data?.find(
        (location) => location.locationName === mto.locationName
      );
      setSubLocations(selectedLocationObj ? selectedLocationObj.addresses : []);
    }
  }, [mto.locationName, state?.nonPersisted?.location?.data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (transferDate) => {
    setFormData((prevData) => ({
      ...prevData,
      transferDate: transferDate.format('YYYY-MM-DD'),
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    // Construct the update data, only including changed fields
    const updateData = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== mto[key]) {
        updateData[key] = formData[key];
      }
    });

    // Send the update request
    fetch(`http://localhost:8080/mto/status/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(updateData),
    })
      .then(() => {
        console.log('MTO Updated');
        navigate('/consignee');
      })
      .catch((error) => {
        console.error('Error updating MTO:', error);
      });
  };

  const renderFormControls = () => {
    return formData.description.map((desc, index) => (
      <Grid container spacing={2} key={index}>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="outlined-basic">SubLocation</InputLabel>
          <Select
            id="demo-simple-select"
            value={formData.SubLocation[index]}
            name="SubLocation"
            onChange={(e) => handleInputChange(e)}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 120,
                },
              },
            }}
          >
            {subLocations.map((address, idx) => (
              <MenuItem key={idx} value={address?.address}>
                {address?.address}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="outlined-basic">Item Description</InputLabel>
          <Select
            id="description"
            value={formData.description[index].substring(0, 5) || "hey"}
            name="description"
            onChange={(e) => handleInputChange(e)}
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
        </Grid>
        {/* Continue rendering other fields similarly */}
      </Grid>
    ));
  };

  return (
    <>
      <Grid>
        <Card color="secondary" sx={{ mb: '33px' }}>
          <CardContent>
            <Typography variant="h4" color="secondary" gutterBottom>
              Update Mto
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="outlined-basic">Location/Vessel</InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="locationName"
            value={formData.locationName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="outlined-basic">Destination SubLocation</InputLabel>
          <Select
            id="destinationSubLocation"
            name="destinationSubLocation"
            value={formData.destinationSubLocation}
            onChange={handleInputChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 120,
                },
              },
            }}
          >
            {subLocations.map((address, index) => (
              <MenuItem key={index} value={address?.address}>
                {address?.address}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="outlined-basic">Consignee</InputLabel>
          <Select
            id="consigneeName"
            name="consigneeName"
            value={formData.consigneeName}
            onChange={handleInputChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            {state.nonPersisted.consignee.data?.map((item, index) => (
              <MenuItem key={index} value={item?.consigneeName}>
                {item?.consigneeName}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="outlined-basic">Repair/Service</InputLabel>
          <Select
            id="repairService"
            name="repairService"
            value={formData.repairService}
            onChange={handleInputChange}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="demo-simple-select-label">Date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={formData.transferDate ? dayjs(formData.transferDate) : null}
              onChange={(date) => handleDateChange(date)}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Card sx={{ mt: '20px' }}>
        <CardContent>{renderFormControls()}</CardContent>
      </Card>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleClick}
        sx={{ mt: '33px', display: 'block', mx: 'auto' }}
      >
        Update
      </Button>
    </>
  );
};

export default UpdateMto;
