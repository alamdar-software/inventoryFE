import {
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
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchlocation } from '../redux/slice/location';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { styled } from '@mui/system';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { fetchConsignee } from '../redux/slice/ConsigneeSlice';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import DeleteIcon from '@mui/icons-material/Delete';

const Consignee = () => {
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;
  const [totalRows,setTotalRows] = useState(0);
  console.log(state, 'location data');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchConsignee(currentUser.accessToken));

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
        // window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  // useEffect(() => {
  //   console.log(currentUser.accessToken, 'heyyyy');
  //   fetch('http://localhost:8080/consignee/view', {
  //     headers: {
  //       Authorization: `Bearer ${currentUser.accessToken}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setConsignee(result);
  //       setTotalRows(consignee.length);
  //     });
  // }, []);

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
      setTotalRows(result.length); // Update totalRows based on the fetched data
    })
    .catch((error) => {
      // Handle fetch errors
      console.error('Error fetching consignee data:', error);
    });
  }, [currentUser.accessToken]); // Include currentUser.accessToken in the dependency array if you need to refetch data when it changes
  

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

  const handleSearch = () => {
    fetch('http://localhost:8080/consignee/search', {
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
          setConsignee(result);
        } else {
          console.error('Received data does not contain an array:', result);
          setConsignee([]);
        }
      })
      .catch((error) => {
        console.error('Error searching data:', error);
        setConsignee([]);
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
              View Consignee
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
                Consignee Name
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='companyName'
                onChange={(e) =>
                  setformData({
                    ...formData,
                    consigneeName: e.target.value,
                  })
                }
              >
                {state.nonPersisted.consignee.data?.map((item, index) => (
                  <MenuItem key={index} value={item?.consigneeName}>
                    {' '}
                    {item?.consigneeName}
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
                      <TableCell>
                        <Link to={`/updateConsignee/${consignee.id}`}>
                          {/* <Button variant='contained'>Update</Button> */}
                          <Button>
                            <BorderColorSharpIcon
                              // onClick={() => handleDeleteClick(index)}
                              style={{ color: 'green' }}
                            />
                          </Button>
                        </Link> 
                        
                        </TableCell>
                        <TableCell>
                        {/* <Button
                          sx={{ marginLeft: '11px', mt: '10px' }}
                          variant='contained'
                          color='secondary'
                          onClick={() => deleteConsignee(consignee.id)}
                        >
                          Delete
                        </Button> */}
                        <Button   onClick={() => deleteConsignee(consignee.id)}>
                          <DeleteIcon />
                        </Button>
                        </TableCell>
                      
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

export default Consignee;
