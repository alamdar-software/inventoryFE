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
  TableFooter,
  TableHead,
  TablePagination,
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

const ViewMtoApproval = () => {
  const [formData, setformData] = useState({
    description: '',
    locationName: '',
    transferDate: '',
  });
  console.log(formData);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [mto, setMto] = useState([]);
  const [FilteredMto, setFilteredMto] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const { currentUser } = state.persisted.user;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
  }, []);

  // useEffect(() => {
  //   console.log(currentUser.accessToken, 'heyyyy');
  //   fetch('http://localhost:8080/mto/verified', {
  //     headers: {
  //       Authorization: `Bearer ${currentUser.accessToken}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((result) => {
  //       if (result.mtoList && Array.isArray(result.mtoList)) {
  //         setMto(result.mtoList);
  //         setTotalCount(result.totalCount);
  //       } else {
  //         console.error('Invalid data structure:', result);
  //         // Handle the situation where the expected data is not available
  //         setMto([]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching MTO data:', error);
  //       // Handle the error by setting an empty array or showing an error message
  //       setMto([]);
  //     });
  // }, []);

  useEffect(() => {
    fetch('http://localhost:8080/mto/verified', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setMto(result);
        setFilteredMto(result);
      })
      .catch((error) => {
        console.error('Error fetching pickup data:', error);
      });
  }, []);

  console.log(mto);
  const handleSearch = () => {
    fetch('http://localhost:8080/mto/mtoVerifiedSearch', {
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
  console.log(formData);
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
              View Mto Approval
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
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 120, // Adjust the height as needed
                    },
                  },
                }}
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
      {/* <Grid sx={{ mt: '33px', width: '100%', overflowX: 'scroll' }}> */}
      <Grid sx={{ mt: '33px' }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '33px',
            borderBottom: '2px solid yellow',
            // width: '110%',
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
                  Status
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Item Description
                </TableCell>

                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Print
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {mto.length > 0 ? (
                mto
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((mto) => (
                    <TableRow key={mto.id}>
                      <TableCell align='right'>{mto.locationName}</TableCell>
                      <TableCell align='right'>{mto.SubLocation}</TableCell>
                      <TableCell align='right'>{mto.consigneeName}</TableCell>
                      <TableCell align='right'>{mto.referenceNo}</TableCell>

                      <TableCell align='right'>{mto.transferDate}</TableCell>
                      <TableCell align='right'>{mto.status}</TableCell>
                      <TableCell align='right'>{mto.description}</TableCell>
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

                      <Link to={`/updateMtoApproval/${mto.id}`}>
                        <Button>
                          <BorderColorSharpIcon
                            // onClick={() => handleDeleteClick(index)}
                            style={{ color: 'green' }}
                          />
                        </Button>
                      </Link>

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
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7} align='center'>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={mto.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{ fontWeight: 'bolder' }}
                    labelRowsPerPage={
                      <span
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        Rows per page:
                      </span>
                    }
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
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

export default ViewMtoApproval;
