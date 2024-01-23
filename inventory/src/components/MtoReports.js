import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import { fetchentity } from '../redux/slice/entitySlice';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const MtoReports = () => {
  const [formData, setformData] = useState({
    description: '',
    locationName: '',
    date: '',
    dateTo: '',
    entityName: '',
    repairService: '',
  });
  const [mtoReport, setmtoReport] = useState([]);
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
  // const handleSearch = () => {
  //   fetch('http://localhost:8080/mto/search', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (Array.isArray(result)) {
  //         setMto(result);
  //       } else {
  //         console.error('Received data does not contain an array:', result);
  //         setMto([]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error searching data:', error);
  //       setMto([]);
  //     });
  // };

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
            Mto Reports
          </Typography>
        </CardContent>
      </Card>
      <Card>
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
          <Grid container spacing={2} sx={{ mt: '21px' }}>
            <Grid item xs={21} sm={6} sx={{ mt: '17px' }}>
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
          </Grid>
          <Grid container spacing={2} sx={{ mt: '23px' }}>
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
            <Grid item xs={12} sm={6} sx={{ mt: '17px' }}>
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
              // onClick={handleSearch}
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
                  Ref No
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Consignee
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Repair Service
                </TableCell>

                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Transfer Date
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Transfer Item
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mtoReport.map((mtoReport) => (
                <TableRow
                  key={mtoReport.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* <TableCell component='th' scope='row'>
                  {attendenceconsume
                </TableCell> */}
                  <TableCell align='right'>{mtoReport.description}</TableCell>
                  <TableCell align='right'>{mtoReport.locationName}</TableCell>
                  <TableCell align='right'>{mtoReport.subLocation}</TableCell>
                  <TableCell align='right'>{mtoReport.entity}</TableCell>
                  <TableCell align='right'>
                    {mtoReport.consumedQuantity}
                  </TableCell>
                  <TableCell align='right'>{mtoReport.date}</TableCell>
                  <TableCell align='right'>{mtoReport.remarks}</TableCell>

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

export default MtoReports;
