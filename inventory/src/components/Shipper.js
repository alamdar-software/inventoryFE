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
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { styled } from '@mui/system';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { fetchShipper } from '../redux/slice/ShipperSlice';

const Shipper = () => {
  const [shipperList, setShipperList] = useState([]);
  const [shipperName, setShipperName] = useState();
  const [address, setAddressName] = useState();
  const [postalCode, setPostalCode] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [email, setEmail] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // You can adjust the number of rows per page
  const { currentUser } = useSelector((state) => state.persisted.user);
  const [totalRows,setTotalRows] = useState(0);
  const [shipper,setShipper] =useState([]);
  const state = useSelector((state) => state);
  const dispatch= useDispatch()



  useEffect(() => {
    dispatch(fetchShipper(currentUser.accessToken));
  
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [searchData, setSearchData] = useState({
    shipperName: '',
    
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (!shipperName || !address || !postalCode || !contactNumber || !email) {
      Swal.fire({
        title: 'Plese Fill All Fiels',
        text: 'Fields are Empty?',
        icon: 'question',
      });
      return;
    }
    const formData = {
      shipperName,
      address,
      postalCode,
      contactNumber,
      email,
    };

    console.log(formData);

    fetch('http://localhost:8080/shipper/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(formData),
    }).then(() => {
      console.log('Shipper Added');
      toast.success('🦄 Shipper Added Successfully!', {
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
    });
  };

  useEffect(() => {
    console.log(currentUser.accessToken, 'heyyyy');
    fetch('http://localhost:8080/shipper/view', {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const shippersArray = Object.values(result);
          setShipper(shippersArray);
          setTotalRows(shipperList.length);
        } else {
          console.error('Empty or invalid JSON response');
        }
      })
      .catch((error) => {
        console.error('Error fetching shipper data:', error);
      });
  }, []);

  const deleteShipper = async (id) => {
    console.log(id);

    fetch(`http://localhost:8080/shipper/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(shipperList),
    })
      .then(() => {
        console.log('Shipper Updated');
        toast.warn('🦄 Shipper Deleted Successfully!', {
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
        console.error('Error updating shipper:', error);
      });
  };
  const handleSearch = () => {
    console.log(searchData,"searchdata")
    fetch('http://localhost:8080/shipper/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(searchData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setShipper(result);
        } else {
          console.error('Received data does not contain an array:', result);
          setShipper([]);
        }
      })
      .catch((error) => {
        console.error('Error searching data:', error);
        setShipper([]);
      });
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
              Create Shipper
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
              id='outlined-basic'
              label='Shipper Name'
              variant='outlined'
              //   value={location}
              value={shipperName}
              onChange={(e) => setShipperName(e.target.value)}
              //   onChange={(e) => setLocation(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Address Name'
              variant='outlined'
              value={address}
              onChange={(e) => setAddressName(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ ml: '13px', mt: '21px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Postal Code'
              variant='outlined'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Contact Number'
              variant='outlined'
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '21px', ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Email'
              variant='outlined'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              View Shipper
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
                Shipper Name
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='companyName'
                onChange={(e) =>
                  setSearchData({
                    ...searchData,
                    shipperName: e.target.value,
                  })
                }
              >
                {state.nonPersisted.shipper.data?.map((item, index) => (
                  <MenuItem key={index} value={item?.shipperName}>
                    {' '}
                    {item?.shipperName}
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
                  Name
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Address
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Postal Code
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Contact Number
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Email
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {shipper.length > 0 ? (
                shipper
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((shipperList) => (
                    <TableRow
                      key={shipperList.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align='right'>
                        {shipperList.shipperName}
                      </TableCell>

                      <TableCell align='right'>{shipperList.address}</TableCell>
                      <TableCell align='right'>
                        {shipperList.postalCode}
                      </TableCell>
                      <TableCell align='right'>
                        {shipperList.contactNumber}
                      </TableCell>
                      <TableCell align='right'>{shipperList.email}</TableCell>

                      {/* Include your update and delete buttons here */}
                      <Link to={`/updateShipper/${shipperList.id}`}>
                        <Button variant='contained'>Update</Button>
                      </Link>
                      <Button
                        sx={{ marginLeft: '11px' }}
                        variant='contained'
                        color='secondary'
                        onClick={() => deleteShipper(shipperList.id)}
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
                <TableCell colSpan={5} align="center">
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




export default Shipper;
