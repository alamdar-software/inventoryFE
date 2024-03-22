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
    TablePagination,
    TableRow,
    Typography,
  } from '@mui/material';
  import React, { useEffect, useState } from 'react';
  import { useSelector } from 'react-redux';
  import { Link, Navigate, useParams } from 'react-router-dom';
  import { toast } from 'react-toastify';
  
  const ItemInventory = () => {
    const [allCounts, setallCounts] = useState([])

    const {id}= useParams();
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
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
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

  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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
                          <TableCell align='left'>{item.consumedItem!="null"?0:item.consumedItem}</TableCell>
                          <TableCell align='left'>{item.scrappedItem!="null"?0:item.scrappedItem}</TableCell>
                        
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
                <TableFooter sx={{ mt: "5px" }}>
                  <TableRow>
                    <TableCell colSpan={7} align='center '>
                      <hr style={{ width: '100%' }} />
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component='div'
                        count={item.length}
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
                           
                          </span>
                        }
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
  
  export default ItemInventory;
  