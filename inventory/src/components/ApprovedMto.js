import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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
import { fetchItem } from '../redux/slice/ItemSlice';
import { fetchlocation } from '../redux/slice/location';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Link } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';

const ApprovedMto = () => {
  const [formData, setformData] = useState({
    description: '',
    locationName: '',
    transferDate: '',
  });
  console.log(formData);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [mto, setMto] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const { currentUser } = state.persisted.user;
  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
  }, []);

  useEffect(() => {
    console.log(currentUser.accessToken, 'heyyyy');
    fetch('http://localhost:8080/mto/approved', {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        if (result && Array.isArray(result)) {
          setMto(result);
          setTotalCount(result.totalCount || 0);
        } else {
          console.error('Invalid data structure:', result);
          // Handle the situation where the expected data is not available
          setMto([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching MTO data:', error);
        // Handle the error by setting an empty array or showing an error message
        setMto([]);
      });
  }, []);

  console.log(mto);
  const handleSearch = () => {
    fetch('http://localhost:8080/mto/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setMto(result);
        } else {
          console.error('Received data does not contain an array:', result);
          setMto([]);
        }
      })
      .catch((error) => {
        console.error('Error searching data:', error);
        setMto([]);
      });
  };

  const handleDateChange = (transferDate) => {
    setformData({
      ...formData,
      transferDate: transferDate.format('YYYY-MM-DD'),
    });
  };
  console.log(mto, 'mein nahi to koun');
  return (
    <>
      <Box>
        <Card
          color='secondary'
          sx={{
            width: '100%',
            backgroundColor: 'secondary',
            borderBottom: '2px solid yellow',
            mb: '31px',
          }}
        >
          <CardContent>
            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              View Mto
            </Typography>
          </CardContent>
        </Card>
        <Chip
          sx={{ mb: '11px', fontWeight: 'bolder' }}
          label={`Total Incoming Stock: ${totalCount}`}
          variant='outlined'
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='demo-simple-select-label'>
                Item Description
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Description'
                onChange={(e) =>
                  setformData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              >
                {state.nonPersisted.item.data?.map((item, index) => (
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
                //value={age}
                label='location'
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 120, // Adjust the height as needed
                    },
                  },
                }}
                // onChange={handleLocationChange}
                onChange={(e) =>
                  setformData({
                    ...formData,
                    locationName: e.target.value,
                  })
                }
              >
                {state.nonPersisted.location.data?.map((item, index) => (
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={formData.transferDate}
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
          onClick={handleSearch}
          sx={{
            mt: '33px',
            mb: '17px',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
          }}
        >
          Search
        </Button>
      </Box>
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
                  Location
                </TableCell>

                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  SubLocation
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Consignee
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Ref Number
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Transfer Date
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Item Description
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Status
                </TableCell>

                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Print
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {mto?.length > 0 ? (
                mto?.map((mto) => (
                  <TableRow key={mto.id}>
                    <TableCell align='right'>{mto.locationName}</TableCell>
                    <TableCell align='right'>{mto.SubLocation}</TableCell>
                    <TableCell align='right'>{mto.consigneeName}</TableCell>
                    <TableCell align='right'>{mto.referenceNo}</TableCell>

                    <TableCell align='right'>{mto.transferDate}</TableCell>
                    <TableCell align='right'>{mto.description}</TableCell>
                    <TableCell align='right'>{mto.status}</TableCell>
                    <TableCell align='right'>
                      <Link to={`/mto/createpdf/${mto.id}`}>
                        <Button
                          variant='contained'
                          color='primary'
                          /*  onClick={() => generatePDF(ciplRow.id, index)} */
                        >
                          {<PictureAsPdfIcon />}
                        </Button>
                      </Link>
                    </TableCell>

                    {/* Add more TableCell components for other properties as needed */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align='center'>
                    No incoming data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={consignee.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Grid>
    </>
  );
};

export default ApprovedMto;
