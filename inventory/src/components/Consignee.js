import {
  Button,
  Card,
  CardContent,
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
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchlocation } from '../redux/slice/location';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';

const Consignee = () => {
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;
  console.log(state, 'location data');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
  }, []);

  const [formData, setformData] = useState({
    consigneeName: '',
    address: '',
    pincode: '',
    email: '',
    phoneNumber: '',
    notifyParty: '',
    deliveryAddress: '',
    locationName: null,
  });
  console.log(formData);
  const [consignee, setConsignee] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/consignee/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, 'resdata');

      toast.success('🦄 Consignee Added Successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  useEffect(() => {
    console.log(currentUser.accessToken, 'heyyyy');
    fetch('http://localhost:8080/consignee/view', {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setConsignee(result);
      });
  }, []);

  const deleteConsignee = async (id) => {
    console.log(id);

    fetch(`http://localhost:8080/consignee/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(consignee),
    })
      .then(() => {
        console.log('Consignee Updated');

        toast.warn('🦄 Consignee deleted Successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error('Error updating consignee:', error);
      });
  };
  const handleInputChange = async (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData, 'hey');
  console.log(state, 'heyy bro');
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
              Create Consignee
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
              id='consigneeName'
              label='Consignee Name'
              variant='outlined'
              onChange={(e) =>
                setformData({
                  ...formData,
                  consigneeName: e.target.value,
                })
              }
              //   value={location}
              //   onChange={(e) => setLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='address'
              label='Address '
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
            <TextField
              id='outlined-basic'
              label='Pin Code'
              variant='outlined'
              onChange={(e) =>
                setformData({
                  ...formData,
                  pincode: e.target.value,
                })
              }
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='email'
              label='Email'
              variant='outlined'
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '21px', ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Phone Number'
              variant='outlined'
              onChange={(e) =>
                setformData({
                  ...formData,
                  phoneNumber: e.target.value,
                })
              }
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='deliveryAddress'
              label='Delivery Address'
              variant='outlined'
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: '21px', ml: '13px' }}></Grid>
        <Grid container spacing={2} sx={{ mt: '21px', ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='notifyParty'
              label='notifyParty'
              variant='outlined'
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={10} sm={6}>
            <Select
              labelId='location'
              id='location'
              sx={{ width: '90%' }}
              value={formData?.locationName || 'sgr'}
              label='Location'
              fullWidth
              onChange={(e) =>
                setformData({
                  ...formData,
                  locationName: e.target.value,
                })
              }
            >
              <MenuItem value='sgr' disabled>
                Location
              </MenuItem>
              {state.nonPersisted.location.data?.map((item, index) => (
                <MenuItem key={index} value={item?.locationName}>
                  {' '}
                  {item?.locationName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Button
          variant='contained'
          color='secondary'
          size='large'
          //onClick={handleClick}
          onClick={handleClick}
          sx={{
            mt: '33px',
            mb: '17px',
            marginLeft: 'auto',
            marginleft: 'auto',
            display: 'block',
            mr: '650px',
          }}
        >
          Add
        </Button>
      </Card>

      <Grid sx={{ mt: '33px', width: '99%', overflowX: 'scroll' }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '33px',
            borderBottom: '2px solid yellow',
            width: '100%',
          }}
        >
          <Table sx={{ minWidth: 600 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Name
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Address
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Pincode
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Email
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Phone Number
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Delivery Address
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Notify Party
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Location
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consignee.length > 0 ? (
                consignee
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((consignee) => (
                    <TableRow
                      key={consignee.consigneeName}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {/* <TableCell component='th' scope='row'>
                  {attendence.name}
                </TableCell> */}
                      <TableCell align='left'>
                        {consignee.consigneeName}
                      </TableCell>
                      <TableCell align='left'>{consignee.address}</TableCell>
                      <TableCell align='left'>{consignee.pincode}</TableCell>
                      <TableCell align='left'>{consignee.email}</TableCell>
                      <TableCell align='left'>
                        {consignee.phoneNumber}
                      </TableCell>
                      <TableCell align='left'>
                        {consignee.deliveryAddress}
                      </TableCell>
                      <TableCell align='left'>
                        {consignee.notifyParty}
                      </TableCell>
                      <TableCell align='left'>
                        {consignee.locationName}
                      </TableCell>
                      <Box>
                        <Link to={`/updateConsignee/${consignee.id}`}>
                          <Button variant='contained'>Update</Button>
                        </Link>

                        <Button
                          sx={{ marginLeft: '11px', mt: '10px' }}
                          variant='contained'
                          color='secondary'
                          onClick={() => deleteConsignee(consignee.id)}
                        >
                          Delete
                        </Button>
                      </Box>
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
                  <hr style={{ width: '90%' }} />
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={consignee.length}
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
      </Grid>
    </>
  );
};

export default Consignee;
