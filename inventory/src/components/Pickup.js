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
  TableFooter,
  Box,
  Chip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';

import 'react-toastify/dist/ReactToastify.css';
import { fetchPickup } from '../redux/slice/PickUpSlice';
const Pickup = () => {
  const state = useSelector((state) => state);
  const dispatch= useDispatch()



  useEffect(() => {
    dispatch(fetchPickup(currentUser.accessToken));
  
  }, []);
  const [pickupAddress, setPickupAddress] = useState();
  const [pic, setPic] = useState();
  const [message, setMessage] = useState(false);
  const [companyName, setCompanyName] = useState();
  const [countryCode, setCountryCode] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [pickup, setPickUp] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { currentUser } = useSelector((state) => state.persisted.user);




  const [formData, setformData] = useState({
    companyName: '',
    
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(state,"kiki");

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
      toast.success('🦄 Pickup Added Successfully!', {
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
      try {
        const res = await fetch('http://localhost:8080/pickup/view', {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        });
  
        if (!res.ok) {
          throw new Error('Failed to fetch pickup data');
        }
  
        const data = await res.json();
        setPickUp(data);
        setTotalRows(data.length);

      } catch (error) {
        console.error('Error fetching pickup data:', error);
        // Handle error, e.g., setPickUp([]) to clear previous data or show an error message
      }
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
      console.error('Error updating pickup:', error);
      // Use toast.error() for error messages
      toast.error('Failed to delete pickup');
    }
  };
console.log(pickup)
const handleSearch = () => {
  fetch('http://localhost:8080/pickup/search', {
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
        setPickUp(result);
      } else {
        console.error('Received data does not contain an array:', result);
        setPickUp([]);
      }
    })
    .catch((error) => {
      console.error('Error searching data:', error);
      setPickUp([]);
    });
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
        {/* <Link to={'/view-pickup'}>
              <Button
                variant='contained'
                color='success'
                size='large'
                sx={{
                  marginLeft: '11px',
                }}
              >
                View
              </Button>
            </Link> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5px',
          }}
        >
          {message && (
            <Box
              sx={{
                color: 'black',
                fontWeight: 'bolder',
                padding: 1.5,
                marginTop: 3,
                marginBottom: 2,

                backgroundColor: '#118ab2',
                backgroundImage:
                  'linear-gradient(319deg, #118ab2 0%, #06d6a0 37%, #ffd166 100%)',

                width: '400px',
                textAlign: 'center',
                borderRadius: '10px',
                transition: 'opacity 0.5s ease-in-out',
                opacity: 1, // Set initial opacity to 1
              }}
            >
              <p sx={{ color: 'white', margin: 0 }}>
                Location Added Successfully
              </p>
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
              <p sx={{ color: 'white', margin: 0 }}>
                Pickup Added Successfully
              </p>
            </Box>
          )}
        </div>
      </Card>

      <Box>
        <Card 
          color='secondary'
          sx={{
            width: '100%',
            backgroundColor: 'secondary',
            borderBottom: '2px solid yellow',
            mb: '31px',
            mt:'31px'
          }}
        >
          <CardContent >
            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              View Pickup
            </Typography>
          </CardContent>
        </Card>
        {/* <Chip
          sx={{ mb: '11px', fontWeight: 'bolder' }}
          //label={`Total Incoming Stock: ${totalCount}`}
          variant='outlined'
        /> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='demo-simple-select-label'>
                Company Name
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='companyName'
                onChange={(e) =>
                  setformData({
                    ...formData,
                    companyName: e.target.value,
                  })
                }
              >
                {state.nonPersisted.pickup.data?.map((item, index) => (
                  <MenuItem key={index} value={item?.companyName}>
                    {' '}
                    {item?.companyName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
  {pickup.length > 0 ? (
    pickup
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((pickup) => (
        <TableRow
          key={pickup.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {/* <TableCell component='th' scope='row'>
            {attendence.name}
          </TableCell> */}
          <TableCell align='right'>
            {pickup.pickupAddress}
          </TableCell>
          <TableCell align='right'>{pickup.pic}</TableCell>
          <TableCell align='right'>{pickup.companyName}</TableCell>
          <TableCell align='right'>{pickup.countryCode}</TableCell>
          <TableCell align='right'>
            {pickup.contactNumber}
          </TableCell>

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
                  {/* <hr style={{ width: '100%' }} /> */}
                  <CustomTablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={totalRows}
                    rowsPerPage={5}
                    page={page}
                    slotProps={{
                      select: {
                        'aria-label': 'Rows per page',
                      },
                      actions: {
                        showFirstButton: true,
                        showLastButton: true,
                        slots: {
                          firstPageIcon: FirstPageRoundedIcon,
                          lastPageIcon: LastPageRoundedIcon,
                          nextPageIcon: ChevronRightRoundedIcon,
                          backPageIcon: ChevronLeftRoundedIcon,
                        },
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
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


const blue = {
  200: '#A5D8FF',
  400: '#3399FF',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    width: 100%;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    box-shadow: 0px 4px 16px ${
      theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : grey[200]
    };
    border-radius: 12px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    overflow: hidden;
  }

  td,
  th {
    padding: 16px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)(
  ({ theme }) => `
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    font-family: 'IBM Plex Sans', sans-serif;
    padding: 2px 0 2px 4px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 6px; 
    background-color: transparent;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 100ms ease;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      border-color: ${blue[400]};
    }
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.actions} {
    display: flex;
    gap: 6px;
    border: transparent;
    text-align: center;
  }

  & .${classes.actions} > button {
    display: flex;
    align-items: center;
    padding: 0;
    border: transparent;
    border-radius: 50%; 
    background-color: transparent;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 100ms ease;

    > svg {
      font-size: 22px;
    }

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      border-color: ${blue[400]};
    }

    &:disabled {
      opacity: 0.3;
      &:hover {
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
        background-color: transparent;
      }
    }
  }
  `,
);
export default Pickup;
