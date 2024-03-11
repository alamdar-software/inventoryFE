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
  IconButton,
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
import EditIcon from '@mui/icons-material/Edit';
export const ViewCipl = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [item, setitem] = useState();
  const [locationName, setlocationName] = useState();
  const [transferDate, settransferDate] = useState();
  const [cipl, setcipl] = useState([]);
  const [allCipl, setAllCipl] = useState([]);
  const [filteredCipl, setFilteredCipl] = useState([]);
  const { currentUser } = useSelector((state) => state.persisted.user);

  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
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
*/
  const handledeleteCipl = async (id) => {
    alert('Deleted Successfully!');
    console.log(id);
    fetch(`http://localhost:8080/cipl/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then(() => {
        console.log('Pickup Deleted');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating pickup:', error);
      });
  };
  useEffect(() => {
    fetch('http://localhost:8080/cipl/approved', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result, 'rupaaaaaaaaaaa');
        setAllCipl(result);
        setFilteredCipl(result);
      })
      .catch((error) => {
        console.error('Error fetching pickup data:', error);
      });
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/cipl/search', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setFilteredCipl(data);
      console.log(data, 'came from backend');
    } catch (error) {
      console.error('Error while adding inventory:', error.message);
      alert('data not found');
    }
  };

  const handleDateChange = (date) => {
    setformData({
      ...formData,
      transferDate: date.format('YYYY-MM-DD'),
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
              View Cipl
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

                //onChange={handleChange}
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
      <Grid sx={{ mt: '33px' }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '33px',
            borderBottom: '2px solid yellow',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Source Location
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  SubLocations
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Shipper
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Consignee
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Ref Number
                </TableCell>

                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Transfer Date
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Status
                </TableCell>

                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Print
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCipl.length > 0 ? (
                filteredCipl
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((ciplRow) =>
                    // Render a row for each sublocation
                    ciplRow.SubLocations.map((subLocation, index) => (
                      <TableRow
                        key={`${ciplRow.id}-${index}`} // Use a unique key for each row
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell align='left'>
                          {ciplRow.locationName}
                        </TableCell>
                        <TableCell align='left'>{subLocation}</TableCell>
                        <TableCell align='left'>
                          {ciplRow.shipperName}
                        </TableCell>
                        <TableCell align='left'>
                          {ciplRow.consigneeName}
                        </TableCell>
                        <TableCell align='left'>
                          {ciplRow.referenceNo}
                        </TableCell>
                        {/* Replace one of the TableCell components if needed */}
                        <TableCell align='left'>
                          {ciplRow.transferDate}
                        </TableCell>
                        <TableCell align='left'>{ciplRow.status}</TableCell>


                        <TableCell align='left'>
                          <Link to={`/cipl/createpdf/${ciplRow.id}`}>
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() => generatePDF(ciplRow.id, index)}
                            >
                              <PictureAsPdfIcon />
                            </Button>
                          </Link>
                          </TableCell>
                          <TableCell>
                          <Link to={`/updateCipl/${ciplRow.id}`}>
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                          </Link>
                          <Button
                            sx={{ marginLeft: '11px' }}
                            variant='contained'
                            color='secondary'
                            onClick={() => handledeleteCipl(ciplRow.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align='center' sx={{ color: 'red' }}>
                    No incoming data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={7} align='center'>
                  <hr style={{ width: '100%', marginLeft: '100px' }} />
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={filteredCipl.length}
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

export default ViewCipl;
