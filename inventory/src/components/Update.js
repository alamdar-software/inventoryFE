import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [locationLists, setLocationLists] = useState();
  const [locationName, setLocation] = useState();
  const [address, setSubLocation] = useState();

  let navigate = useNavigate();

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:8080/location/get/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLocationLists(result);
      });
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    const update = {
      locationLists,
    };
    console.log(update);

    fetch(`http://localhost:8080/location/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(locationLists),
    })
      .then(() => {
        console.log('Class Updated');
        navigate('/location-Vessel');
      })
      .catch((error) => {
        console.error('Error updating class:', error);
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
            <Typography variant='h4' color='secondary' gutterBottom>
              Update Location/Vessel
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Card
        sx={{
          width: '100%',
          mt: '33px',
          pt: '33px',
          borderBottom: '2px solid grey',
        }}
      >
        <Grid container spacing={2} sx={{ ml: '11px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Location/vessel'
              variant='outlined'
              value={locationLists ? locationLists.locationName : ''}
              onChange={(e) => {
                setLocationLists({
                  ...locationLists,
                  locationName: e.target.value,
                });
                setLocation(e.target.value);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='SubLocation'
              variant='outlined'
              value={locationLists ? locationLists.address : ''}
              onChange={(e) => {
                setLocationLists({
                  ...locationLists,
                  address: e.target.value,
                });
                setSubLocation(e.target.value);
              }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box
          sx={{ marginTop: '11px', display: 'flex', justifyContent: 'center' }}
        >
          <Button variant='contained' color='secondary' onClick={handleClick}>
            Update
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default Update;