import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,

  TableRow,
  Typography,
} from '@mui/material';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { styled } from '@mui/system';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchItem } from '../redux/slice/ItemSlice';
import { fetchlocation } from '../redux/slice/location';


const ViewInventoryMoc = () => {
  
  const [inventoryData, setInventoryData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedInventory, setSelectedInventory] = useState('');
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const { currentUser } = state.persisted.user;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Define the handleChangePage and handleChangeRowsPerPage functions here

  // Fetch the data and set the totalRows state variable here

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
          setTotalRows(inventoryArray.length); // Update totalRows state
        } else {
          console.error('Empty or invalid JSON response');
        }
      })
      .catch((error) => {
        console.error('Error fetching inventory data:', error);
      });
  }, []);

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card
          color="secondary"
          sx={{
            width: '100%',
            borderBottom: '2px solid #ab47bc',
          }}
        >
          <CardContent>
            <Typography variant="h4" color="secondary" gutterBottom>
              List Of Inventories
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: '33px', borderBottom: '2px solid yellow' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              {/* Render the table body here */}
                           
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
    </Grid>
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


export default ViewInventoryMoc;