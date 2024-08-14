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
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewItem = () => {
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setformData] = useState({
    itemName: '',
    description: '',
    name: '',
    unitName: '',
    minimumStock: '',
  });
  //   const [itemName, setItemName] = useState();
  //   const [minimumStock, setMinmumStock] = useState();
  //   const [description, setDescription] = useState();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [item, setItem] = useState([]);
  const { currentUser } = useSelector((state) => state.persisted.user);
  // useEffect(() => {
  //   console.log(currentUser.accessToken, 'heyyyy');
  //   fetch('http://localhost:8080/item/view', {
  //     headers: {
  //       Authorization: `Bearer ${currentUser.accessToken}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (result) {
  //         const itemArray = Object.values(result);
  //         setItem(itemArray);
  //       } else {
  //         console.error('Empty or invalid JSON response');
  //       }
  //     });
  // }, []); // Make sure to include an empty dependency array if you only want this effect to run once on component mount

  const fetchData = () => {
    fetch('http://localhost:8080/item/view', {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((result) => {
        if (result && Object.keys(result).length > 0) {
          const itemArray = Object.values(result);
          setItem(itemArray);
          setTotalRows(itemArray.length);
        } else {
          console.error('Empty response from the server');
          setItem([]);
          setTotalRows(0);
          // Optionally, display a message to the user
          // You can use state to control the visibility of the message
          // setMessage('No incoming data available');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle fetch error here, e.g., display an error message to the user
        // You can use state to control the visibility of the error message
        // setError('Error fetching data. Please try again later.');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTotalRows(item.length);
  }, [item]);
  
  
  useEffect(() => {
    setTotalRows(item.length);
  }, [item]);

  const deleteItem = async (id) => {
    console.log(id);
    fetch(`http://localhost:8080/item/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(item),
    })
      .then(() => {
        console.log('item Deleted');
        toast.warn('🦄 Item Deleted Successfully!', {
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
  return (
    <>
      <Card
        color='secondary'
        sx={{
          width: '100%',
          borderBottom: '2px solid #ab47bc',
        }}
      >
        <CardContent>
          <Typography variant='h4' color='secondary' gutterBottom>
            List Of Items
          </Typography>
        </CardContent>
      </Card>

      <Grid sx={{ mt: '33px' }}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: '33px', borderBottom: '2px solid yellow' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Item Name
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Item Description
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Catagory
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  UOM
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Minimum Stock
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {item.length > 0 ? (
                item
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow
                      key={item.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align='left'>{item.itemName}</TableCell>
                      <TableCell align='left'>{item.description?.substring(0, 5)+"..."}</TableCell>
                      <TableCell align='left'>{item.name}</TableCell>
                      <TableCell align='left'>{item.unitName}</TableCell>
                      <TableCell align='left'>{item.minimumStock}</TableCell>
                      <Link to={`/item/viewInventories/${item.id}`}>
                        <Button
                          sx={{ marginRight: '11px' }}
                          variant='contained'
                        >
                          View Inventories
                        </Button>
                      </Link>

                      <Link
                        sx={{ marginLeft: '11px' }}
                        to={`/updateItem/${item.id}`}
                      >
                        <Button variant='contained'>Update</Button>
                      </Link>
                      <Button
                        sx={{ marginLeft: '11px' }}
                        variant='contained'
                        color='secondary'
                        onClick={() => deleteItem(item.id)}
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

export default ViewItem;
