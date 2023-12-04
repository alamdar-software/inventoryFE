import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';

const Consignee = () => {
  const [formData, setformData] = useState({
    name: '',
    adress: '',
    pincode: '',
    email: '',
    phoneNumber: '',
    NotifyParty: '',
    deliveryAdress: '',
  });
  // console.log(formData, 'hey');
  const handleClick = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const res = await fetch('http://localhost:8080/consignee/add', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
=======
    try {
      const res = await fetch("http://192.168.1.10:8080/consignee/add", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, "resdata");
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  const handleInputChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
>>>>>>> eefa750e6822870d0a7bfbf831499024fe9ba9da
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
          }}
        >
          <CardContent>
            <Typography variant='h4' color='secondary' gutterBottom>
              Create Consignee
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Card
        sx={{
          width: '100%',
          mt: '33px',
          pt: '33px',
          borderBottom: '2px solid yellow',
          borderRadius: '33px',
        }}
      >
        <Grid container spacing={2} sx={{ ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
<<<<<<< HEAD
              id='outlined-basic'
              label='Consignee Name'
              variant='outlined'
              onChange={(e) =>
                setformData({
                  ...formData,
                  name: e.target.value,
                })
              }
=======
              id="name"
              label="Consignee Name"
              variant="outlined"
              onChange={handleInputChange}
>>>>>>> eefa750e6822870d0a7bfbf831499024fe9ba9da
              //   value={location}
              //   onChange={(e) => setLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
<<<<<<< HEAD
              id='outlined-basic'
              label='Address '
              variant='outlined'
              onChange={(e) =>
                setformData({
                  ...formData,
                  adress: e.target.value,
                })
              }
=======
              id="adress"
              label="Address "
              variant="outlined"
              onChange={handleInputChange}
>>>>>>> eefa750e6822870d0a7bfbf831499024fe9ba9da
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ ml: '13px', mt: '21px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
<<<<<<< HEAD
              id='outlined-basic'
              label='Postal Code'
              variant='outlined'
              onChange={(e) =>
                setformData({
                  ...formData,
                  pincode: e.target.value,
                })
              }
=======
              id="pincode"
              label="Postal Code"
              variant="outlined"
              onChange={handleInputChange}
>>>>>>> eefa750e6822870d0a7bfbf831499024fe9ba9da
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
<<<<<<< HEAD
              id='outlined-basic'
              label='Delivery Address'
              variant='outlined'
              onChange={(e) =>
                setformData({
                  ...formData,
                  deliveryAdress: e.target.value,
                })
              }
=======
              id="deliveryAdress"
              label="Delivery Address"
              variant="outlined"
              onChange={handleInputChange}
>>>>>>> eefa750e6822870d0a7bfbf831499024fe9ba9da
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '21px', ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
<<<<<<< HEAD
              id='outlined-basic'
              label='Contact Number'
              variant='outlined'
              onChange={(e) =>
                setformData({
                  ...formData,
                  phoneNumber: e.target.value,
                })
              }
=======
              id="phoneNumber"
              label="Contact Number"
              variant="outlined"
              onChange={handleInputChange}
>>>>>>> eefa750e6822870d0a7bfbf831499024fe9ba9da
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
<<<<<<< HEAD
              id='outlined-basic'
              label='Email'
              variant='outlined'
              onChange={(e) =>
                setformData({
                  ...formData,
                  email: e.target.value,
                })
              }
=======
              id="email"
              label="Email"
              variant="outlined"
              onChange={handleInputChange}
>>>>>>> eefa750e6822870d0a7bfbf831499024fe9ba9da
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: '21px', ml: '13px' }}></Grid>
        <Grid container spacing={2} sx={{ mt: '21px', ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
<<<<<<< HEAD
              id='outlined-basic'
              label='Notify Party'
              variant='outlined'
              onChange={(e) =>
                setformData({
                  ...formData,
                  NotifyParty: e.target.value,
                })
              }
=======
              id="NotifyParty"
              label="Notify Party"
              variant="outlined"
              onChange={handleInputChange}
>>>>>>> eefa750e6822870d0a7bfbf831499024fe9ba9da
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Button
          variant='contained'
          color='secondary'
          size='large'
          //onClick={handleClick}
          onClick={handleClick}
          sx={{
            mt: '33px',
            mb: '17px',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
          }}
        >
          Add
        </Button>
      </Card>
    </>
  );
};

export default Consignee;
