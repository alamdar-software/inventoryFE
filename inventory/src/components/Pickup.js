import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Select,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TablePagination,
  TableFooter,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const Pickup = () => {
  const [pickupAddress, setPickupAddress] = useState();
  const [pic, setPic] = useState();
  const [message, setMessage] = useState(false)
  const [companyName, setCompanyName] = useState();
  const [countryCode, setCountryCode] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [pickup, setPickUp] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { currentUser } = useSelector((state) => state.persisted.user);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleClick = () => {
  //   try {
  //     const formData = {
  //       pickupAddress,
  //       pIC,
  //       companyName,
  //       countryCode,
  //       contactNumber,
  //     };

  //     console.log(formData);

  //     fetch('http://localhost:8080/pickup/add', {
  //       method: 'POST',
  //       headers: { 'Content-type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     }).then(() => {
  //       console.log('Pickup Added');
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleClick = (e) => {
    e.preventDefault();
    const attendence = {
      pickupAddress,
      pic,
      companyName,
      countryCode,
      contactNumber,
    };
    console.log(attendence);

    fetch('http://localhost:8080/pickup/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(attendence),
    }).then(() => {
      setMessage(true);
      console.log('Pickup Added');
      setTimeout(() => {
        setMessage(false);
      }, 6000);
    });
    setTimeout(() => {
      window.location.reload();
  }, 2000);
  };
  useEffect(() => {
    const getPickup = async () => {
      console.log(currentUser.accessToken, 'heyyyy');
      const res = await fetch('http://localhost:8080/pickup/view', {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });

      const data = await res.json();

      console.log(data, 'backdata');
      setPickUp(data);
    };
    getPickup();
  }, []);
  // useEffect(() => {
  //   fetch('http://localhost:8080/pickup/view')
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       setPickUp(result);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching pickup data:', error);
  //     });
  // }, []);

  const deletePickup = async (id) => {
    try {
        await fetch(`http://localhost:8080/pickup/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${currentUser.accessToken}`,
            },
            body: JSON.stringify(Pickup),
        });

        // Use toast.success() for success messages
        toast.error('🦄 Pickup Deleted Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
         
          });
          setTimeout(() => {
            window.location.reload();
        }, 3000);
    } catch (error) {
        console.error('Error updating pickup:', error);
        // Use toast.error() for error messages
        toast.error("Failed to delete pickup");
    }
};


  return (
    <>
      <Grid>
        <Card
          color='secondary'
          sx={{
            width: '100%',
            // background:
            //   'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)',

            borderBottom: '2px solid #ab47bc',
          }}
        >
          <CardContent>
            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              Add PickUp
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Card
        sx={{
          width: '100%',
          mt: '33px',
          pt: '33px',
          borderBottom: '2px solid #ab47bc',
          borderRadius: '33px',
        }}
      >
        <Grid container spacing={2} sx={{ ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Pickup Address'
              variant='outlined'
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='PIC'
              variant='outlined'
              value={pic}
              onChange={(e) => setPic(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ ml: '13px', mt: '21px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Company Name'
              variant='outlined'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Country Code'
              type='number'
              variant='outlined'
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '21px', ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Contact Number'
              type='number'
              variant='outlined'
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Button
          variant='contained'
          color='secondary'
          size='large'
          onClick={handleClick}
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
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
            {message && (
              <Box
                sx={{
                  color: 'black',
                  fontWeight: 'bolder',
                  padding: 1.5,
                  marginTop: 3,
                  marginBottom:2,
                 
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
                <p sx={{ color: 'white', margin: 0 }}>Pickup Added Successfully</p>
              </Box>
            )}
          </div>
      </Card>
      <Grid sx={{ mt: '33px' }}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: '33px', borderBottom: '2px solid yellow' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  PickupAddress
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Pic
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  CompanyName
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  CountryCode
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  ContactNumber
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pickup
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((pickup) => (
                  <TableRow
                    key={pickup.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {/* <TableCell component='th' scope='row'>
                  {attendence.name}
                </TableCell> */}
                    <TableCell align='right'>{pickup.pickupAddress}</TableCell>
                    <TableCell align='right'>{pickup.pic}</TableCell>
                    <TableCell align='right'>{pickup.companyName}</TableCell>
                    <TableCell align='right'>{pickup.countryCode}</TableCell>
                    <TableCell align='right'>{pickup.contactNumber}</TableCell>

                    <Link to={`/updatePickup/${pickup.id}`}>
                      <Button variant='contained'>Update</Button>
                    </Link>
                    <Button
                      sx={{ marginLeft: '11px' }}
                      variant='contained'
                      color='secondary'
                      onClick={() => deletePickup(pickup.id)}
                    >
                      Delete
                    </Button>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7} align='center'>
                  <hr style={{ width: '100%' }} />
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={pickup.length}
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

export default Pickup;
