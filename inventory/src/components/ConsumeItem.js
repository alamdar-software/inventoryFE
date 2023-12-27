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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchlocation } from '../redux/slice/location';

const ConsumeItem = () => {
  const [formData, setFormData] = useState([]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      transferDate: date.format('YYYY-MM-DD'),
    });
  };
  useEffect(() => {
    dispatch(fetchlocation());
  }, []);

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
              Consume Item
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid container spacing={2} sx={{ mt: '33px' }}>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Location</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              label='location'
              /* onChange={(e) =>
                setformData({
                  ...formData,
                  locationName: e.target.value,
                })
              } */
              // onChange={handleLocationChange}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(newDate) => handleDateChange(newDate)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Button
        variant='contained'
        color='secondary'
        size='large'
        //onClick={handleClick}

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
    </>
  );
};

export default ConsumeItem;
