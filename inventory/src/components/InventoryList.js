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
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PoList } from '../components/PoList';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const InventoryList = () => {
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;
  const [inventoryData, setInventoryData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedInventory, setSelectedInventory] = useState('');

  const dispatch = useDispatch();
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);

  const handleButtonClick = () => {
    setIsCardVisible(!isCardVisible);
  };
  const handleCloseCard = () => {
    setIsCardOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(selectedInventory, 'heyyy');
  const [formData, setformData] = useState({
    description: '',
    locationName: '',
    address: '',
    quantity: '',
    consumedItem: '',
    scrappedItem: '',
  });
  console.log(inventoryData, 'datesssss');
  useEffect(() => {
    console.log(currentUser.accessToken, 'heyyyy');
    fetch('http://localhost:8080/inventory/view', {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const inventoryArray = Object.values(result);
          setInventoryData(inventoryArray);
          console.log(inventoryData, 'mujhe');
        } else {
          console.error('Empty or invalid JSON response');
        }
      })
      .catch((error) => {
        console.error('Error fetching inventory data:', error);
      });
  }, []);

  const deleteInventory = async (id) => {
    console.log(id);
    fetch(`http://localhost:8080/inventory/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(InventoryList),
    })
      .then(() => {
        toast.warn('🦄 Category Added Successfully!', {
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
        console.error('Error updating location:', error);
      });
  };
  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
  }, []);

  const handleSearch = () => {
    fetch('http://localhost:8080/inventory/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setInventoryData(result);
        } else {
          console.error('Received data does not contain an array:', result);
          setInventoryData([]);
        }
      })
      .catch((error) => {
        console.error('Error searching data:', error);
        setInventoryData([]);
      });
  };
  console.log(formData, 'yess');
  return (
    <>
      <Grid>
        <Card
          color='secondary'
          sx={{
            width: '90%',
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
              View Inventory
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Card sx={{ mt: '23px' }}>
        <CardContent>
          <Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <InputLabel id='demo-simple-select-label'>
                    Location
                  </InputLabel>
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
        </CardContent>
      </Card>
      <Grid sx={{ mt: '33px' }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '33px',
            borderBottom: '2px solid yellow',
            width: '102%',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Location
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  SubLocation
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Item Description
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Quantity
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Consumed Quantity
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Scrapped Quantity
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryData.length > 0 ? (
                inventoryData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((inventory) => (
                    <TableRow
                      key={inventory.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {/* <TableCell component='th' scope='row'>
                  {attendence.name}
                </TableCell> */}

                      <TableCell align='left'>
                        {inventory.locationName}
                      </TableCell>
                      <TableCell align='left'>
                        {inventory?.address?.address || ''}
                      </TableCell>
                      <TableCell align='left'>
                        {inventory.description.match(/^[^-(]*/)[0].trim()}
                      </TableCell>
                      <TableCell align='left'>{inventory.quantity}</TableCell>
                      <TableCell align='left'>
                        {inventory.consumedItem}
                      </TableCell>
                      <TableCell align='left'>
                        {inventory.scrappedItem}
                      </TableCell>
                      <Box classname="flex">
                        <Button
                          variant='outlined'
                          width="15px"
                          onClick={handleButtonClick}
                          sx={{ mr: '1px', }}
                        >
                          {' '}
                          View PO
                        </Button>
                        {isCardVisible && (
                          <div
                            style={{
                              position: 'fixed',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              backgroundColor: '#fff',
                              border: '1px solid #ccc',
                              padding: '10px',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                              color: 'black',
                            }}
                          >
                            <Grid container style={{ width: '100%', overflowX: 'auto' }}>
                              <Card sx={{ backgroundColor: '#E5EAE7',width:"100%" }}>
                                <CardContent>
                                  <Typography
                                    variant='h4'
                                    color='secondary'
                                    gutterBottom
                                    style={{ fontFamily: "'EB Garamond'" }}
                                  >
                                    Purchase Order List
                                  </Typography>
                                </CardContent>
                              </Card>

                              <Grid
                                sx={{
                                  mt: '33px',
                                  width: '120%',
                                 
                                }}
                              >
                                <TableContainer
                                  component={Paper}
                                  sx={{
                                    borderRadius: '33px',
                                    borderBottom: '2px solid yellow',
                                    width: '130%',
                                  }}
                                >
                                  <Table
                                    sx={{ minWidth: 800 }}
                                    aria-label='simple table'
                                  >
                                    <TableHead>
                                      <TableRow>
                                        <TableCell
                                          align='left'
                                          sx={{ fontWeight: 'bold' }}
                                        >
                                          Purchase Order
                                        </TableCell>
                                        <TableCell
                                          align='left'
                                          sx={{ fontWeight: 'bold' }}
                                        >
                                          Date
                                        </TableCell>
                                        <TableCell
                                          align='left'
                                          sx={{ fontWeight: 'bold' }}
                                        >
                                          Unit Cost
                                        </TableCell>
                                        <TableCell
                                          align='left'
                                          sx={{ fontWeight: 'bold' }}
                                        >
                                          Currency
                                        </TableCell>
                                        <TableCell
                                          align='left'
                                          sx={{ fontWeight: 'bold' }}
                                        >
                                          Quantity
                                        </TableCell>
                                        <TableCell
                                          align='left'
                                          sx={{ fontWeight: 'bold' }}
                                        >
                                          Remaining Quantity
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                  </Table>
                                </TableContainer>
                              </Grid>
                            </Grid>
                          </div>
                        )}

                        <Link to={`/updateInventory/${inventory?.id}`}>
                          <Button variant='contained'><EditIcon/></Button>
                        </Link>
                        <Button
                          sx={{ marginLeft: '1px' }}
                          variant='contained'
                          color='secondary'
                          onClick={() => deleteInventory(inventory.id)}
                        >
                          <DeleteIcon/>
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
                  <hr style={{ width: '100%' }} />
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={inventoryData.length}
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

export default InventoryList;
