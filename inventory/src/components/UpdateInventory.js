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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchItem } from '../redux/slice/ItemSlice';
import { fetchlocation } from '../redux/slice/location';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const UpdateInventory = () => {
  const [formData, setformData] = useState({
    description: '',
    locationName: '',
    address: '',
    quantity: '',
    consumedItem: '',
    scrappedItem: '',
  });
  const [inventory, setInventory] = useState();
  const state = useSelector((state) => state);
  const [subLocations, setSubLocations] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchItem());
  }, []);
  console.log(inventory, 'inventory');
  let navigate = useNavigate();

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:8080/inventory/get/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setInventory(result);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const update = {
      inventory,
    };
    console.log(update);

    fetch(`http://localhost:8080/inventory/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(inventory),
    })
      .then(() => {
        console.log('Inventory Updated');
        // navigate('/consignee');
      })
      .catch((error) => {
        console.error('Error updating consignee:', error);
      });
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    console.log('Selected Location:', selectedLocation);

    setformData({
      ...formData,
      locationName: selectedLocation,
      address: '', // Reset sublocation when location changes
    });

    const selectedLocationObj = state.location.data.find(
      (location) => location.locationName === selectedLocation
    );

    console.log('Selected Location Object:', selectedLocationObj);

    const updatedSubLocations = selectedLocationObj
      ? selectedLocationObj.addresses
      : [];

    setSubLocations(updatedSubLocations);

    // Update inventory state
    setInventory((prevInventory) => ({
      ...prevInventory,
      locationName: selectedLocation,
      address: '', // Reset sublocation when location changes
    }));

    console.log('Sub Locations:', updatedSubLocations);
  };
  console.log(formData, 'hey');
  console.log(state, 'state');

  return (
    <>
      <Grid>
        <Card
          color='secondary'
          sx={{
            width: '100%',
            // background:
            //   'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)',

            borderBottom: '2px solid #ab47bc',
          }}
        >
          <CardContent>
            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              Update Inventory
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid container spacing={2} mt='33px'>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Location</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={inventory ? inventory.locationName : ''}
              label='location'
              /* onChange={(e) =>
                setformData({
                  ...formData,
                  locationName: e.target.value,
                })
              } */
              onChange={handleLocationChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120, // Adjust the height as needed
                  },
                },
              }}
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
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Sub Location</InputLabel>

            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={inventory ? inventory.address : ''}
              label='sublocation'
              onChange={(e) => {
                setInventory({
                  ...inventory,
                  address: e.target.value,
                });
                setformData(e.target.value);
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120, // Adjust the height as needed
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
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Item Description
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='description'
              value={inventory ? inventory.description : ''}
              label='description'
              onChange={(e) => {
                setformData({
                  ...formData,
                  description: e.target.value,
                });
                setInventory({
                  ...inventory,
                  description: e.target.value,
                });
              }}
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
                <MenuItem key={index} value={item?.description}>
                  {' '}
                  {item?.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='outlined-basic'
            label='Quantity'
            variant='outlined'
            value={inventory ? inventory.quantity : ''}
            onChange={(e) => {
              setInventory({
                ...inventory,
                quantity: e.target.value,
              });
              setformData(e.target.value);
            }}
            fullWidth
            sx={{ width: '90%' }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            id='outlined-basic'
            label='Consumed Quantity'
            variant='outlined'
            value={inventory ? inventory.consumedItem : ''}
            onChange={(e) => {
              setInventory({
                ...inventory,
                consumedItem: e.target.value,
              });
              setformData(e.target.value);
            }}
            fullWidth
            sx={{ width: '90%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='outlined-basic'
            label='Scrapped Quantity'
            variant='outlined'
            value={inventory ? inventory.scrappedItem : ''}
            onChange={(e) => {
              setInventory({
                ...inventory,
                scrappedItem: e.target.value,
              });
              setformData(e.target.value);
            }}
            fullWidth
            sx={{ width: '90%' }}
          />
        </Grid>
      </Grid>
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

export default UpdateInventory;
