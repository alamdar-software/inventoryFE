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
import { fetchConsumeItem } from '../redux/slice/ConsumeItemSlice';
import { toast } from 'react-toastify';

const ViewConsume = () => {
  const [item, setitem] = useState();
  const [locationName, setlocationName] = useState();
  const [transferDate, settransferDate] = useState();
  const [consumed, setconsumed] = useState([]);
  const [allConsumed, setAllConsumed] = useState([]);
  const [filteredConsumed, setFilteredConsumed] = useState([]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { currentUser } = state?.persisted.user;
  useEffect(() => {
    dispatch(fetchlocation(currentUser?.accessToken));
    dispatch(fetchItem(currentUser?.accessToken));
    dispatch(fetchConsumeItem(currentUser?.accessToken));
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setformData] = useState({
    item: '',
    transferDate: '',
    locationName: '',
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
    fetch('http://localhost:8080/consumeditem/view', {
      headers: {
        Authorization: `Bearer ${currentUser?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllConsumed(result);
        setFilteredConsumed(result);
      })
      .catch((error) => {
        console.error('Error fetching cipl data:', error);
      });
  }, []); // Make sure to include an empty dependency array if you only want this effect to run once on component mount

  console.log(filteredConsumed, 'filter');

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/consumeditem/search', {
        method: 'post',
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setFilteredConsumed(data);
      console.log(data, 'came from backend');
    } catch (error) {
      console.error('Error while finding consume:', error.message);
      alert('data not found');
    }
  };

  const handleDateChange = (date) => {
    setformData({
      ...formData,
      transferDate: date.format('YYYY-MM-DD'),
    });
  };
  /*   const generatePDF = async (rowData, index) => {
    console.log("Generate PDF clicked");
    const pdf = new jsPDF();

    const tableRow = document.getElementById(`${rowData.id}-${index}`);
    if (tableRow) {
      const canvas = await html2canvas(tableRow);
      const imgData = canvas.toDataURL("image/png");

      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("table.pdf");
    }
  }; */
  console.log(state, 'nopppe');
  const deleteConsumed = async (id) => {
    console.log(id);
    await fetch(`http://localhost:8080/consumeditem/delete/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
        'Content-type': 'application/json',
      },
    })
      .then(() => {
        console.log('item Deleted');
        toast``.success('🦄 Consumed Deleted Successfully!', {
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
              View Consumed Items
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
              <InputLabel id='demo-simple-select-label'>Item Desc</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='itemName'
                label='itemName'
                onChange={(e) => {
                  setformData({
                    ...formData,
                    item: e.target.value,
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
                {state.nonPersisted.item.data?.map((item, index) => (
                  <MenuItem key={index} value={item?.description}>
                    {' '}
                    {item?.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='demo-simple-select-label'>Location</InputLabel>
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
                onChange={(e) => {
                  setformData({
                    ...formData,
                    locationName: e.target.value,
                  });
                }}
              >
                {state.nonPersisted?.location.data?.map((item, index) => (
                  <MenuItem key={index} value={item?.locationName}>
                    {' '}
                    {item?.locationName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '220%' }}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    /* value={
                formData.purchaseDate ? dayjs(formData.purchaseDate) : null
              } */
                    onChange={(newDate) => handleDateChange(newDate)}
                    // onChange={(newDate) => handleDateChange(newDate)}
                    fullWidth
                    sx={{ width: '90%' }}
                    /* format="yyyy-MM-dd" */
                  />
                </LocalizationProvider>
              </Grid>
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
          onClick={handleClick}
        >
          Search
        </Button>
      </Card>
      <Grid sx={{ mt: '33px', width: '100%', overflowX: 'scroll' }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '33px',
            borderBottom: '2px solid yellow',
            width: '98%',
          }}
        >
          <Table sx={{ minWidth: 400 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Item Description
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Location/Vessel
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  SubLocation
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Consumed Quantity
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Date
                </TableCell>

                <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredConsumed.length > 0 ? (
                filteredConsumed?.map((consumedRow) =>
                  // Render a row for each sublocation
                  consumedRow.item.map((item, index) => (
                    <TableRow
                      key={`${consumedRow.id}-${index}`} // Use a unique key for each row
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align='right'>
                        {item.match(/^[^-(]*/)[0].trim()}
                      </TableCell>
                      <TableCell align='right'>
                        {consumedRow.locationName}
                      </TableCell>
                      <TableCell align='right'>
                        {consumedRow.subLocations}
                      </TableCell>
                      <TableCell align='right'>
                        {consumedRow.quantity}
                      </TableCell>
                      <TableCell align='right'>{consumedRow.date}</TableCell>
                      <TableCell align='right'>
                        <Box>
                          <Link to={`/updateConsumed/${consumedRow.id}`}>
                            <Button
                              sx={{ marginLeft: '11px', marginTop: '15px' }}
                              variant='contained'
                            >
                              Update
                            </Button>
                          </Link>

                          <Button
                            sx={{ marginLeft: '11px', marginTop: '15px' }}
                            variant='contained'
                            color='secondary'
                            onClick={() => deleteConsumed(consumedRow.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )
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
                    count={filteredConsumed.length}
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

export default ViewConsume;
