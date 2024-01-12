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
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import { fetchentity } from '../redux/slice/entitySlice';
import { fetchShipper } from '../redux/slice/ShipperSlice';
import { fetchConsignee } from '../redux/slice/ConsigneeSlice';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CiplReport = () => {
  const [formData, setformData] = useState({
    description: '',
    shipperName: '',
    consigneeName: '',
    entityName: '',
    date: '',
    dateTo: '',
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchItem());
    dispatch(fetchentity());
    dispatch(fetchShipper());
    dispatch(fetchConsignee());
  }, [dispatch]);
  const handleDateChange = (date) => {
    setformData({
      ...formData,
      date: date.format('YYYY-MM-DD'),
    });
  };
  console.log(formData);
  const handleDateChangeTo = (dateTo) => {
    setformData({
      ...formData,
      dateTo: dateTo.format('YYYY-MM-DD'),
    });
  };
  console.log(formData);
  return (
    <>
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
            Cipl Report
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Item Description
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='description'
              //value={age}
              label='description'
              onChange={(e) =>
                setformData({
                  ...formData,
                  description: e.target.value,
                })
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
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Shipper</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='shipperName'
              //value={age}
              label='shipperName'
              onChange={(e) =>
                setformData({
                  ...formData,
                  shipperName: e.target.value,
                })
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
              {state.shipper.data?.map((item, index) => (
                <MenuItem key={index} value={item?.shipperName}>
                  {' '}
                  {item?.shipperName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Consignee</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='description'
              //value={age}
              label='description'
              onChange={(e) =>
                setformData({
                  ...formData,
                  consigneeName: e.target.value,
                })
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
              {state.consignee.data?.map((item, index) => (
                <MenuItem key={index} value={item?.consigneeName}>
                  {' '}
                  {item?.consigneeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Entity</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Description'
              value={formData?.entityName}
              onChange={(e) =>
                setformData({
                  ...formData,
                  entityName: e.target.value,
                })
              }
            >
              {state.entity.data?.map((item, index) => (
                <MenuItem key={index} value={item?.entityName}>
                  {' '}
                  {item?.entityName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <InputLabel id='date-picker-label'>From date</InputLabel>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              //value={formData.date}
              onChange={(newDate) => handleDateChange(newDate)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id='date-picker-label'>To Date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              //value={formData.date}
              onChange={(newDate) => handleDateChangeTo(newDate)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '17px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Repair/Service
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              value={formData.repairService || ''}
              label='Repair/service'
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
      </Grid>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          mt: '33px',
          mb: '17px',
        }}
      >
        <Button
          variant='contained'
          color='secondary'
          size='large'
          //onClick={handleClick}
          sx={{ marginRight: '8px' }}
        >
          Preview
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='large'
          //onClick={handleClick}
          sx={{ marginRight: '8px' }}
        >
          Dwnload Excel
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='large'
          //onClick={handleClick}
        >
          Download Pdf
        </Button>
      </Box>
    </>
  );
};

export default CiplReport;
