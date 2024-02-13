import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchCategory } from '../redux/slice/CategorySlice';
import { useEffect } from 'react';
import { fetchUom } from '../redux/slice/UomSlice';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Item = () => {
  const [formData, setformData] = useState({
    itemName: '',
    minimumStock: '',
    description: '',
    name: '',
    unitName: '',
  });
  console.log(formData, 'formmmmmmmmm');
  const state = useSelector((state) => state);
  const { currentUser } = useSelector((state) => state.persisted.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory(currentUser.accessToken));
    dispatch(fetchUom(currentUser.accessToken));
  }, []);

  const handleInputChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData, 'heyyyy');

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/item/add', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {}
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
            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              Add Item
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
              id='itemName'
              label='Item'
              variant='outlined'
              onChange={handleInputChange}
              //   value={location}
              //   onChange={(e) => setLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='description'
              label='Item Description'
              variant='outlined'
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ ml: '13px', mt: '21px' }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='Catagory'>Catagory</InputLabel>
              <Select
                labelId='Catagory'
                id='name'
                value={formData?.name}
                //value={age}
                // label='Catagory'
                onChange={(e) =>
                  setformData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                //onChange={handleChange}
              >
                {state.nonPersisted.category.data?.content.map(
                  (item, index) => (
                    <MenuItem key={index} value={item?.name}>
                      {' '}
                      {item?.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='demo-simple-select-label'>UOM</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='unitName'
                value={formData.unitName}
                //value={age}
                label='UOM'
                onChange={(e) =>
                  setformData({
                    ...formData,
                    unitName: e.target.value,
                  })
                }
                //onChange={handleChange}
              >
                {state.nonPersisted.Uom.data?.content.map((item, index) => (
                  <MenuItem key={index} value={item?.unitName}>
                    {' '}
                    {item?.unitName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '21px', ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='minimumStock'
              label='Minimum Stock'
              variant='outlined'
              //   value={subLocation}
              onChange={handleInputChange}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            color='secondary'
            size='large'
            onClick={handleClick}
            sx={{
              mt: '33px',
              mb: '17px',
              mx: 'auto', // Center horizontally
              display: 'block',
            }}
          >
            Add
          </Button>
          <Link to='/Items' style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              color='secondary'
              size='large'
              sx={{
                mt: '33px',
                mb: '17px',
                mx: 'auto', // Center horizontally
                mr: '70px',
              }}
            >
              View Item
            </Button>
          </Link>
        </Box>
      </Card>
    </>
  );
};

export default Item;
