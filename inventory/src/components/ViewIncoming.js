import {
  Alert,
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
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchentity } from '../redux/slice/entitySlice';
import { fetchCurrency } from '../redux/slice/CurrencySlice';
import { fetchItem } from '../redux/slice/ItemSlice';
import { fetchlocation } from '../redux/slice/location';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewIncoming = () => {
  const [formData, setformData] = useState({
    description: '',
    locationName: '',
    date: '',
    purchaseOrder: '',
    entityName: '',
  });
  const [incoming, setIncoming] = useState([]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { currentUser } = state.persisted.user;
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
    dispatch(fetchCurrency(currentUser.accessToken));
    dispatch(fetchentity(currentUser.accessToken));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/bulkstock/approved', {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result, 'kabsetuhai');

        if (Array.isArray(result.stockViewList)) {
          setIncoming(result.stockViewList);
          setTotalCount(result.totalCount); // Set the total count
        } else {
          console.error('Received data does not contain an array:', result);
          setIncoming([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIncoming([]);
      });
  }, []);

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setformData({
      ...formData,
      locationName: selectedLocation,
      //   address: [], // Reset sublocation when location changes
    });
    const selectedLocationObj = state.location.data.find(
      (location) => location.locationName === selectedLocation
    );
  };
  console.log(formData);

  const handleDateChange = (date) => {
    setformData({
      ...formData,
      date: date.format('YYYY-MM-DD'),
    });
  };
  const handleSearch = () => {
    fetch('http://localhost:8080/bulkstock/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        setIncoming(result);
      })
      .catch((error) => {
        console.error('Error searching data:', error);
        setIncoming([]);
      });
  };
  console.log(incoming, 'mujhmeinhai');
  const handledeleteincome = async (id) => {
    fetch(`http://localhost:8080/bulkstock/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then(() => {
        toast.warn('🦄 Incoming Deleted Successfully!', {
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
        console.error('Error updating pickup:', error);
      });
  };

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
              Incoming Stock
            </Typography>
          </CardContent>
        </Card>
        <Chip
          sx={{ mb: '11px', fontWeight: 'bolder' }}
          label={`Total Incoming Stock: ${totalCount}`}
          variant='outlined'
        />
        <Grid container spaciing={2}>
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
          <Grid item xs={21} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='demo-simple-select-label'>Location</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='location'
                onChange={handleLocationChange}
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
        <Grid container spacing={2} sx={{ mt: '33px' }}>
          <Grid item xs={21} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                /* value={
                formData.purchaseDate ? dayjs(formData.purchaseDate) : null
              } */
                onChange={(newDate) => handleDateChange(newDate)}
                fullWidth
                sx={{ width: '90%' }}
                /* format="yyyy-MM-dd" */
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={21} sm={6}>
            <TextField
              id='outlined-basic'
              label='PO Number'
              variant='outlined'
              fullWidth
              sx={{ width: '90%' }}
              onChange={(e) =>
                setformData({
                  ...formData,
                  purchaseOrder: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '33px' }}>
          <Grid item xs={21} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='demo-simple-select-label'>Entity</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='entity'
                onChange={(e) =>
                  setformData({
                    ...formData,
                    entityName: e.target.value,
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
                {state.nonPersisted.entity.data?.map((item, index) => (
                  <MenuItem key={index} value={item?.entityName}>
                    {' '}
                    {item?.entityName}
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
      <Grid sx={{ mt: '33px', width: '104%' }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '33px',
            borderBottom: '2px solid yellow',
          }}
        >
          <Table sx={{ minWidth: 500 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Item Description
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Location
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  SubLocation
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Entity
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Quantity
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  PO Number
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Purchase Date
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Incoming Type
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Status
                </TableCell>
                <TableCell
                  align='left'
                  sx={{ fontWeight: 'bold' }}
                  className='flex flex-row'
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incoming.length > 0 ? (
                incoming
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align='left'>{item.description}</TableCell>
                      <TableCell align='left'>{item.locationName}</TableCell>
                      <TableCell align='left'>{item.address}</TableCell>
                      <TableCell align='left'>{item.entityName}</TableCell>
                      <TableCell align='left'>{item.quantity}</TableCell>
                      <TableCell align='left'>{item.purchaseOrder}</TableCell>
                      <TableCell align='left'>{item.date}</TableCell>
                      <TableCell align='left'>{item.dataType}</TableCell>
                      <TableCell align='left'>{item.status}</TableCell>
                      <TableCell align='left' className='flex flex-row'>
                        <Link
                          to={`/updateIncoming/${item.id}`}
                          className='flex flex-row'
                        >
                          <Button>
                            <BorderColorSharpIcon
                              // onClick={() => handleDeleteClick(index)}
                              style={{ color: 'green' }}
                            />
                          </Button>
                        </Link>
                        <Button onClick={() => handledeleteincome(item.id)}>
                          <DeleteIcon />
                        </Button>
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
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7} align='center'>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={incoming.length}
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

export default ViewIncoming;
