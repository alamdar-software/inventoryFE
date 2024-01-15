import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

export const Location = () => {
  const [locationName, setLocation] = useState();
  const [address, setSubLocation] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    const attendence = {
      locationName,
      address,
    };
    console.log(attendence);

    fetch('http://localhost:8080/location/add', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(attendence),
    }).then(() => {
      alert('location added');
      console.log('Location Added');
    });
  };
  return (
    <>
      <Grid>
        <Card
          color='secondary'
          sx={{ width: '100%', backgroundColor: 'secondary' }}
        >
          <CardContent>
            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              Create Location/
              <span>Vessel</span>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Card
        sx={{
          width: '70%',
          mt: '33px',
          pt: '33px',
          ml: '13%',
          borderBottom: '2px solid grey',
          borderRadius: '23px',
        }}
      >
        <CardContent>
          <Grid container spacing={2} sx={{ ml: '71px' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                id='outlined-basic'
                label='Location/vessel'
                variant='outlined'
                value={locationName}
                onChange={(e) => setLocation(e.target.value)}
                width={'70px'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id='outlined-basic'
                label='SubLocation'
                variant='outlined'
                value={address}
                onChange={(e) => setSubLocation(e.target.value)}
                width={'200px'}
              />
            </Grid>
          </Grid>
          <hr
            style={{
              marginTop: '33px',
              marginLeft: '50px',
              marginRight: '50px',
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '33px' }}>
            <Button
              variant='contained'
              color='secondary'
              size='large'
              onClick={handleClick}
              // sx={{
              //   mt: '33px',
              //   mb: '17px',
              //   marginLeft: '25rem',
              //   marginRight: 'auto',
              // }}
            >
              Add
            </Button>
            <Link to={'/view-location'}>
              <Button
                variant='contained'
                color='success'
                size='large'
                sx={{
                  marginLeft: '11px',
                }}
              >
                View
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
