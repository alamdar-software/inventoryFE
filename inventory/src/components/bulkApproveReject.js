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
  TablePagination,
  Box,
  TableFooter,
  TextareaAutosize,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { toast } from 'react-toastify';

export const BulkApproveReject = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [item, setitem] = useState();
  const [locationName, setlocationName] = useState();
  const [transferDate, settransferDate] = useState();
  const [cipl, setcipl] = useState([]);
  const [allCipl, setAllCipl] = useState([]);
  const [filteredBulk, setFilteredBulk] = useState([]);
  const { currentUser } = useSelector((state) => state.persisted.user);

  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
  }, []);

  const [page, setPage] = useState(0);
  const [Po, setPo] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchData, setsearchData] = useState({
    purchaseOrder: ""
  })
  const [formData, setformData] = useState({
    purchaseOrder: searchData?.purchaseOrder,
    status: '',
    verifierComments: '',
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(formData, 'heyyy');
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

  /*   const handleClick = (e) => {
    e.preventDefault();
    const attendence = {
      pickupAddress,
      pic,
      companyName,
      countryCode,
      contactNumber,
    };
    console.log(attendence);

    fetch("http://localhost:8080/pickup/add", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(attendence),
    }).then(() => {
      console.log("Pickup Added");
      window.location.reload();
    });
  };
  useEffect(() => {
    fetch('http://localhost:8080/pickup/view')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setPickUp(result);
      })
      .catch((error) => {
        console.error('Error fetching pickup data:', error);
      });
  }, []);

  const deletePickup = async (id) => {
    alert("Deleted Successfully!");
    console.log(id);
    fetch(`http://localhost:8080/pickup/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(Pickup),
    })
      .then(() => {
        console.log("Pickup Deleted");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating pickup:", error);
      });
    }; */
  useEffect(() => {
    fetch('http://localhost:8080/bulkstock/view/purchaseOrders', {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${currentUser.accessToken}`,
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result, "yyyyyyyyyyyyyyyyy");
        setPo(result);
      })
      .catch((error) => {
        console.error('Error fetching pickup data:', error);
      });
  }, []);
  console.log(Po, "dd");
  // useEffect(() => {
  //   fetch('http://localhost:8080/cipl/rejected', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${currentUser.accessToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((result) => {
  //       console.log(result, 'meinhunkhalnayak');
  //       setAllCipl(result);
  //       setFilteredCipl(result);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching pickup data:', error);
  //     });
  // }, []);

  const handleClick = async (e) => {
    console.log("i am here");
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/bulkstock/searchVerified', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify(searchData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data, 'came from backend');
      setFilteredBulk(data);
    } catch (error) {
      console.error('Error while adding inventory:', error.message);
      alert('data not found');
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    const finalData = {
      ...formData,
      purchaseOrder: searchData?.purchaseOrder, // Ensure `purchaseOrder` is included
    };
    
    console.log(finalData, "i am here");
  
    try {
      const res = await fetch('http://localhost:8080/bulkstock/updateByPoVerified', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify(finalData), // Send `finalData` directly
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
   
  
      toast.success("Bulk status updated successfully");
    } catch (error) {
      console.error('Error while updating bulk status:', error.message);
      alert('Data not found');
    }
  };
  
  const handleDateChange = (date) => {
    setformData({
      ...formData,
      date: date.format('YYYY-MM-DD'),
    });
  };
  const generatePDF = async (rowData, index) => {
    console.log('Generate PDF clicked');
    // const pdf = new jsPDF();

    const tableRow = document.getElementById(`${rowData.id}-${index}`);
    if (tableRow) {
      // const canvas = await html2canvas(tableRow);
      // const imgData = canvas.toDataURL('image/png');
      // pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      // pdf.save('table.pdf');
    }
  };
  console.log(searchData, "seqrchhhhhhhhh");
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
              Bulk/Approve Reject
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
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Po</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='itemName'
                label='itemName'
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 120, // Adjust the height as needed
                    },
                  },
                }}
                onChange={(e) => {
                  setsearchData({
                    ...setsearchData,
                    purchaseOrder: e.target.value,
                  });
                }}
              /* onChange={(e) =>
                handleItemChange(
                  index,
                  selectedSubLocations[index],
                  e.target.value
                )
              } */
              >
                {Po?.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {' '}
                    {item}
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
          sx={{
            mt: '33px',
            mb: '17px',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
          }}
          onClick={(e) => handleClick(e)}
        >
          Search
        </Button>
      </Card>
      <Grid sx={{ mt: '33px' }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '33px',
            borderBottom: '2px solid yellow',
            // width: '110%',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Item description
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Location/Vessel
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  SubLocation
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Entity
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Quantity
                </TableCell>

                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Purchase Date
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Status
                </TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBulk
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((bulk) =>
                  // Render a row for each sublocation


                  <TableRow
                    key={`${bulk.id}`} // Use a unique key for each row
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  <TableCell align='right'>
  {bulk.address && bulk.address.address}
</TableCell>

                    <TableCell align='right'>{bulk.locationName}</TableCell>
                    <TableCell align='right'>{bulk.address}</TableCell>
                    <TableCell align='right'>{bulk.entityName}</TableCell>
                    <TableCell align='right'>{bulk.quantity}</TableCell>
                    <TableCell align='right'>{bulk.date}</TableCell>
                    <TableCell align='right'>{bulk.status}</TableCell>


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
                    count={cipl.length}
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
          count={cipl.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
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
            <FormControl fullWidth>


              <TextField
                id='outlined-basic'
                disabled
                variant='outlined'
                value={searchData.purchaseOrder}
                fullWidth
                sx={{ width: '90%' }}



              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='status-label'>Status</InputLabel>
              <Select
                labelId='status-label'
                id='status'
                label='Status'
                onChange={(e) => {
                  setformData({
                    ...formData,
                    status: e.target.value,
                  });
                }}
              >

                <MenuItem value="verifyAll">Verify All</MenuItem>
                <MenuItem value="rejectAll">Reject All</MenuItem>
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <TextareaAutosize
                sx={{ width: '90%' }}
                aria-label='Brand'
                placeholder='Verifier Remarks'
                onChange={(e) => {
                  setformData({
                    ...formData,
                    verifierComments: e.target.value,
                  });
                }}
                // value={brandValue} // You can set the value and handle changes as needed
                // onChange={(e) => handleBrandChange(e.target.value)}
                // onChange={(e) => handleRemarksChange(index, e.target.value)}
                minRows={4} // You can adjust the number of rows as needed
              />
            </FormControl>
          </Grid>

        </Grid>

        <Button
          variant='contained'
          color='secondary'
          size='large'
          sx={{
            mt: '33px',
            mb: '17px',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
          }}
          onClick={(e) => handlesubmit(e)}
        >
          Submit
        </Button>
      </Card>


    </>
  );
};

export default BulkApproveReject;
