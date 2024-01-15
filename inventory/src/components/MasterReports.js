import {
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Card, CardContent, Grid, InputLabel, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fetchentity } from '../redux/slice/entitySlice';

const MasterReports = () => {
  const [formData, setformData] = useState({
    description: '',
    locationName: '',
    date: '',
    dateTo: '',
    entityName: '',
  });
  const [master, setMaster] = useState([]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchItem());
    dispatch(fetchentity());
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
            Master Report (Incoming Stock)
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ borderBottom: '2px solid #ab47bc', borderRadius: '33px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={21} sm={6}>
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
                <InputLabel id='demo-simple-select-label'>Location</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='location'
                  onChange={(e) =>
                    setformData({
                      ...formData,
                      locationName: e.target.value,
                    })
                  }
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 120,
                      },
                    },
                  }}
                  //onChange={handleLocationChange}
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
          <Grid container spacing={2} sx={{ mt: '21px' }}>
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
        </CardContent>
      </Card>
      <Grid sx={{ mt: '33px', width: '100%', overflowX: 'scroll' }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '33px',
            borderBottom: '2px solid yellow',
            width: '110%',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Item Description
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Location
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  SubLocation
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Catagory
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Brand
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Entity
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Purchase Date
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Purchase Order
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Part Number
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Serial Number
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Quantity
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Extended Value
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Unit Cost
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Price
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Currency
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {master.map((master) => (
                <TableRow
                  key={master.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* <TableCell component='th' scope='row'>
                  {attendence.name}
                </TableCell> */}
                  <TableCell align='right'>{master.description}</TableCell>
                  <TableCell align='right'>{master.locationName}</TableCell>
                  <TableCell align='right'>{master.subLocation}</TableCell>
                  <TableCell align='right'>{master.catagory}</TableCell>
                  <TableCell align='right'>{master.brandName}</TableCell>
                  <TableCell align='right'>{master.entityName}</TableCell>
                  <TableCell align='right'>{master.date}</TableCell>
                  <TableCell align='right'>{master.purchaseOrder}</TableCell>
                  <TableCell align='right'>{master.partNumber}</TableCell>
                  <TableCell align='right'>{master.serialNumber}</TableCell>
                  <TableCell align='right'>{master.quantity}</TableCell>
                  <TableCell align='right'>{master.extendedValue}</TableCell>
                  <TableCell align='right'>{master.unitCost}</TableCell>
                  <TableCell align='right'>{master.price}</TableCell>
                  <TableCell align='right'>{master.currency}</TableCell>

                  {/* <Link to={`/updatePickup/${master.id}`}>
                      <Button variant='contained'>Update</Button>
                    </Link>
                    <Button
                      sx={{ marginLeft: '11px' }}
                      variant='contained'
                      color='secondary'
                      onClick={() => deletePickup(pickup.id)}
                    >
                      Delete
                    </Button> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={pickup.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Grid>
    </>
  );
};

export default MasterReports;
