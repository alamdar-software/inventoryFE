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

const ViewInventoryMoc = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedInventory, setSelectedInventory] = useState('');
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const { currentUser } = state.persisted.user;

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
        } else {
          console.error('Empty or invalid JSON response');
        }
      })
      .catch((error) => {
        console.error('Error fetching inventory data:', error);
      });
  }, []);

  //   const deleteInventory = async (id) => {
  //     console.log(id);
  //     fetch(`http://localhost:8080/inventory/delete/${id}`, {
  //       method: 'DELETE',
  //       headers: { 'Content-type': 'application/json' },
  //       body: JSON.stringify(InventoryList),
  //     })
  //       .then(() => {
  //         console.log('Location Updated');
  //         window.location.reload();
  //       })
  //       .catch((error) => {
  //         console.error('Error updating location:', error);
  //       });
  //   };
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
              View Inventory
            </Typography>
          </CardContent>
        </Card>
      </Grid>

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
                  Item Description
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Quantity
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Consumed Quantity
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Scrapped Quantity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((inventory) => (
                  <TableRow
                    key={inventory.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {/* <TableCell component='th' scope='row'>
                    {attendence.name}
                  </TableCell> */}

                    <TableCell align='right'>
                      {inventory.locationName}
                    </TableCell>
                    <TableCell align='right'>
                      {inventory?.address?.address || ''}
                    </TableCell>
                    <TableCell align='right'>
                      {inventory.description.match(/^[^-(]*/)[0].trim()}
                    </TableCell>
                    <TableCell align='right'>{inventory.quantity}</TableCell>
                    <TableCell align='right'>
                      {inventory.consumedItem}
                    </TableCell>
                    <TableCell align='right'>
                      {inventory.scrappedItem}
                    </TableCell>
                    {/* <Box>
                      <Button
                        variant='outlined'
                        onClick={handleButtonClick}
                        sx={{ mr: '11px' }}
                      >
                        {' '}
                        View Po List
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
                          <Grid>
                            <Card sx={{ backgroundColor: '#E5EAE7' }}>
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
                                width: '100%',
                                overflowX: 'scroll',
                              }}
                            >
                              <TableContainer
                                component={Paper}
                                sx={{
                                  borderRadius: '33px',
                                  borderBottom: '2px solid yellow',
                                  width: '110%',
                                }}
                              >
                                <Table
                                  sx={{ minWidth: 650 }}
                                  aria-label='simple table'
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align='right'
                                        sx={{ fontWeight: 'bold' }}
                                      >
                                        Purchase Order
                                      </TableCell>
                                      <TableCell
                                        align='right'
                                        sx={{ fontWeight: 'bold' }}
                                      >
                                        Date
                                      </TableCell>
                                      <TableCell
                                        align='right'
                                        sx={{ fontWeight: 'bold' }}
                                      >
                                        Unit Cost
                                      </TableCell>
                                      <TableCell
                                        align='right'
                                        sx={{ fontWeight: 'bold' }}
                                      >
                                        Currency
                                      </TableCell>
                                      <TableCell
                                        align='right'
                                        sx={{ fontWeight: 'bold' }}
                                      >
                                        Quantity
                                      </TableCell>
                                      <TableCell
                                        align='right'
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
                      )} */}

                    {/* <Link to={`/updateInventory/${inventory?.id}`}>
                        <Button variant='contained'>Update</Button>
                      </Link>
                    </Box> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={inventoryData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
    </>
  );
};

export default ViewInventoryMoc;
