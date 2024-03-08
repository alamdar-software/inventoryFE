import React, { useState, useEffect } from 'react';
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
import { useSelector } from 'react-redux';

export const Location = () => {
  const { currentUser } = useSelector((state) => state.persisted.user);
  const [message, setMessage] = useState(false);
  const [locationName, setLocation] = useState('');
  const [address, setSubLocation] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    const attendance = {
      locationName,
      address,
    };

    fetch('http://localhost:8080/location/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(attendance),
    }).then(() => {
      setMessage(true);
      console.log('Location Added');
      setTimeout(() => {
        setMessage(false);
      }, 3000); // Set timeout to hide message after 4 seconds
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
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
            {message && (
              <Box
                sx={{
                  color: 'black',
                  fontWeight: 'bolder',
                  padding: 1.5,
                  marginTop: 3,
                 
                  backgroundColor: "#118ab2",
backgroundImage: "linear-gradient(319deg, #118ab2 0%, #06d6a0 37%, #ffd166 100%)",

                  width: '400px',
                  textAlign: 'center',
                  borderRadius: '10px',
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: 1, // Set initial opacity to 1
                }}
              >
                <p sx={{ color: 'white', margin: 0 }}>Location Added Successfully</p>
              </Box>
            )}
            {!message && (
              <Box
                sx={{
                  color: 'black',
                  fontWeight: 'bolder',
                  padding: 1.5,
                  marginTop: 3,
                  backgroundColor: '#74D680',
                  width: '400px',
                  textAlign: 'center',
                  borderRadius: '10px',
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: 0, // Set initial opacity to 0
                }}
              >
                <p sx={{ color: 'white', margin: 0 }}>Location Added Successfully</p>
              </Box>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
