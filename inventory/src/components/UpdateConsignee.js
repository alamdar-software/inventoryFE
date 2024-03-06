import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateConsignee = () => {
  const [formData, setformData] = useState({
    name: '',
    address: '',
    pincode: '',
    email: '',
    phoneNumber: '',
    notifyParty: '',
    deliveryAddress: '',
    locationName: null,
  });
  const [consignee, setConsignee] = useState();
  const { currentUser } = useSelector((state) => state.persisted.user);
  let navigate = useNavigate();

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    console.log(currentUser.accessToken, 'heyyyy');
    fetch(`http://localhost:8080/consignee/get/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setConsignee(result);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const update = {
      consignee,
    };
    console.log(update);

    fetch(`http://localhost:8080/consignee/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(consignee),
    })
      .then(() => {
        toast.success('🦄 Category Added Successfully!', {
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
          
            navigate('/consignee');
        }, 3000);
      })
      .catch((error) => {
        console.error('Error updating consignee:', error);
      });
  };

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
            <Typography variant='h4' color='secondary' gutterBottom>
              Update Consignee
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Card
        sx={{
          width: '100%',
          mt: '33px',
          pt: '33px',
          borderBottom: '2px solid #ab47bc',
          borderRadius: '33px',
        }}
      >
        <Grid container spacing={2} sx={{ ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Name'
              variant='outlined'
              value={consignee ? consignee.name : ''}
              //   onChange={(e) => setPickupAddress(e.target.value)}
              onChange={(e) => {
                setConsignee({
                  ...consignee,
                  name: e.target.value,
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
              label='Address'
              variant='outlined'
              value={consignee ? consignee.address : ''}
              onChange={(e) => {
                setConsignee({
                  ...consignee,
                  address: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ ml: '13px', mt: '21px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Pincode'
              variant='outlined'
              value={consignee ? consignee.pincode : ''}
              onChange={(e) => {
                setConsignee({
                  ...consignee,
                  pincode: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='email'
              label='Email'
              variant='outlined'
              value={consignee ? consignee.email : ''}
              onChange={(e) => {
                setConsignee({
                  ...consignee,
                  email: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '21px', ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Phone Number'
              variant='outlined'
              value={consignee ? consignee.phoneNumber : ''}
              onChange={(e) => {
                setConsignee({
                  ...consignee,
                  phoneNumber: e.target.value,
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
              label='Notify Party'
              variant='outlined'
              value={consignee ? consignee.notifyParty : ''}
              onChange={(e) => {
                setConsignee({
                  ...consignee,
                  notifyParty: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>{' '}
        <Grid container spacing={2} sx={{ mt: '21px', ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Delivery Address'
              variant='outlined'
              value={consignee ? consignee.deliveryAddress : ''}
              onChange={(e) => {
                setConsignee({
                  ...consignee,
                  deliveryAddress: e.target.value,
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
              label='Location'
              variant='outlined'
              value={consignee ? consignee.locationName : ''}
              onChange={(e) => {
                setConsignee({
                  ...consignee,
                  locationName: e.target.value,
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
      </Card>
    </>
  );
};

export default UpdateConsignee;
