import {
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
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
  import * as React from 'react';
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
  import  { useEffect, useState } from 'react';
  import { useSelector } from 'react-redux';
  import { Link, Navigate, useParams } from 'react-router-dom';
  import { toast } from 'react-toastify';
  import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

  
  const ItemInventory = () => {
    const [remainingQuantity, setremainingQuantity] = useState(0)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [allCounts, setallCounts] = useState([])

    const {id}= useParams();
    useEffect(() => {
      getPoList();
      // other data fetches can go here too
  }, []);
    const [formData, setformData] = useState({
      itemName: '',
      description: '',
      name: '',
      unitName: '',
      minimumStock: '',
    });
    useEffect(() => {
     const cardData= async()=>{
const res = await fetch("http://localhost:8080/prtItem/totalQuantity",{
  method:"get",
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${currentUser.accessToken}`,
  },
})
const data = await res.json();
setallCounts(data)

     }
    }, [])
    console.log(allCounts,"heyyzoon");
    
    //   const [itemName, setItemName] = useState();
    //   const [minimumStock, setMinmumStock] = useState();
    //   const [description, setDescription] = useState();
  
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [IsCardRecievedVisible, setIsCardRecievedVisible] = useState(false);
  
    const handleButtonClick = () => {
      setIsCardVisible(!isCardVisible);
    };
    const handleRecievedClick = () => {
        setIsCardRecievedVisible(!isCardVisible);
      };
    
  
        const handleCloseCard = () => {
            setIsCardVisible(false); // Close the card by setting isCardVisible to false
        };
      const  handleClosePurchaseCard =()=>{
        setIsCardRecievedVisible(false)

      }

  
    
  const [polist, setpolist] = useState([])
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
    const getPoList = async (page, rowsPerPage) => {
      try {
        const url = `http://localhost:8080/prtItem/viewPo/${id}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        });
        const data = await res.json();
        setpolist(data);
      } catch (error) {
        console.error("Failed to fetch PO list:", error);
      }
    };
    
  

  console.log(polist,"pooooooooooooo");
  
    useEffect(() => {
      fetch(`http://localhost:8080/item/viewInventories/${id}`, {
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
            console.log(result,"mjheresult");
       
            setItem(result.inventories);
         
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          // Handle fetch error here, e.g., display an error message to the user
          // You can use state to control the visibility of the error message
          // setError('Error fetching data. Please try again later.');
        });
    }, []);
  console.log(item,"heyyyyyyy");
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
   
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    return (
        <div style={{ position: 'relative' }}>
        <div >
          <Card
            color='secondary'
            sx={{
              width: '100%',
              borderBottom: '2px solid #ab47bc',
            }}
          >
            <CardContent>
              <Typography variant='h4' color='secondary' gutterBottom>
                View Item Inventories
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
                      Location/Vessel
                    </TableCell>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      SubLocation
                    </TableCell>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      Quantity
                    </TableCell>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      Minimum
                    </TableCell>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      Consumed Qty
                    </TableCell>
                    <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                      Scrapped Qty
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
                          <TableCell align='left'>{item.locationName}</TableCell>
                          <TableCell align='left'>{item.address}</TableCell>
                          <TableCell align='left'>{item.quantity.toString()}</TableCell>
                          <TableCell align='left'>{item.minimumStock}</TableCell>
                          <TableCell align='left'>{item.consumedItem}</TableCell>
                          <TableCell align='left'>{item.scrappedItem}</TableCell>
                        
                          <Button
                            onClick={handleButtonClick}
                            sx={{ marginRight: '2px', fontSize: '10px' }}
                            variant='contained'
                          >
                            View PO LIST
                          </Button>
                          
                          {isCardVisible && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
                                backdropFilter: 'blur(5px)', // Blur effect
                                backdropFilter: 'blur(10px)',
                                border: '1px solid #ccc',
                                padding: '10px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                color: 'black',
                                zIndex: 1
                              }}
                            >
                              <Button
                                onClick={handleCloseCard}
                                sx={{
                                  position: 'absolute',
                                  top: '5px',
                                  right: '5px',
                                }}
                              >
                                X
                              </Button>
                              <div>
                                <Grid container style={{ width: '110%',display: 'flex',justifyContent: 'center', }}>
                                  <Card style={{ textAlign: 'center', zIndex: 1001, }}>
                                    <CardContent>
                                      <Typography
                                        variant='h4'
                                        color='black'
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
                                        width: '90%',
                                      }}
                                    >
                                      <Table
                                        sx={{ minWidth: 650 }}
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
                                              Purchased Qty
                                            </TableCell>
                                            <TableCell
                                              align='left'
                                              sx={{ fontWeight: 'bold' }}
                                            >
                                              Remaining Qty
                                            </TableCell>
                                            <TableCell
                                              align='left'
                                              sx={{ fontWeight: 'bold' }}
                                            >
                                              TransferredQty
                                            </TableCell>
                                          </TableRow>
                                        </TableHead>

                                        <TableBody>
  {polist.length > 0 ? (
    polist
    
      .map((pickup) => (
        <TableRow
          key={pickup.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {/* <TableCell component='th' scope='row'>
            {attendence.name}
          </TableCell> */}
          <TableCell align='left'>
            {pickup.purchaseOrder}
          </TableCell>
          <TableCell align='left'>{pickup.date}</TableCell>
          <TableCell align='left'>{pickup.quantity}</TableCell>
          <TableCell align='left'> {pickup.quantity - parseFloat(pickup.TransferedQty.replace(/\[|\]/g, ''))}</TableCell>
          <TableCell align='left'>
            {pickup.TransferedQty.replace(/\[|\]/g, '')}
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
                                      </Table>
                                    </TableContainer>
                                  </Grid>
                                </Grid>
                              </div>
                            </div>
                          )}
        
                        
                            <Button  onClick={handleRecievedClick} variant='contained'
                              sx={{ fontSize: '10px' }}
                            >View RECEIVED LIST</Button>
                              {IsCardRecievedVisible && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
                                backdropFilter: 'blur(5px)', // Blur effect
                                backdropFilter: 'blur(10px)',
                                border: '1px solid #ccc',
                                padding: '10px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                color: 'black',
                                zIndex: 1
                              }}
                            >
                              <Button
                                onClick={handleClosePurchaseCard}
                                sx={{
                                  position: 'absolute',
                                  top: '5px',
                                  right: '5px',
                                }}
                              >
                                X
                              </Button>
                              <div>
                                <Grid container style={{ width: '110%',display: 'flex',justifyContent: 'center', }}>
                                  <Card style={{ textAlign: 'center', zIndex: 1001, }}>
                                    <CardContent>
                                      <Typography
                                        variant='h4'
                                        color='black'
                                        gutterBottom
                                        style={{ fontFamily: "'EB Garamond'" }}
                                      >
                                       RECEIVED ORDER LIST
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
                                        width: '90%',
                                      }}
                                    >
                                      <Table
                                        sx={{ minWidth: 650 }}
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
                                              Purchased Qty
                                            </TableCell>
                                            <TableCell
                                              align='left'
                                              sx={{ fontWeight: 'bold' }}
                                            >
                                              Remaining Qty
                                            </TableCell>
                                            <TableCell
                                              align='left'
                                              sx={{ fontWeight: 'bold' }}
                                            >
                                              TransferredQty
                                            </TableCell>
                                          </TableRow>
                                        </TableHead>
                                      </Table>
                                    </TableContainer>
                                  </Grid>
                                </Grid>
                              </div>
                            </div>
                          )}
                      
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
                            count={item.length}
                            rowsPerPage={rowsPerPage}
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
        </div>
      </div>
      
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
  
  
  export default ItemInventory;
  