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
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import { fetchentity } from '../redux/slice/entitySlice';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fetchConsumeItem } from '../redux/slice/ConsumeItemSlice';
import ExcelJS from 'exceljs';
const ConsumeReport = () => {
  const [formData, setformData] = useState({
    item: '',
    locationName: '',
    startDate: '',
    endDate: '',
  });
  const [consume, setConsume] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [filteredConsume, setFilteredConsume] = useState([]);

  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchItem());
    dispatch(fetchentity());
    dispatch(fetchConsumeItem());
  }, [dispatch]);
  const handleDateChange = (startDate) => {
    setformData({
      ...formData,
      startDate: startDate.format('YYYY-MM-DD'),
    });
  };
  console.log(formData);
  const handleDateChangeTo = (endDate) => {
    setformData({
      ...formData,
      endDate: endDate.format('YYYY-MM-DD'),
    });
  };
  console.log(formData);

  // const handleSearch = () => {
  //   fetch('http://localhost:8080/consumeditem/searchReport', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (Array.isArray(result)) {
  //         setConsume(result);
  //       } else {
  //         console.error('Received data does not contain an array:', result);
  //         setConsume([]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error searching data:', error);
  //       setConsume([]);
  //     });
  // };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        'http://localhost:8080/consumeditem/searchReport',
        {
          method: 'post',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setConsume(data);
      console.log(data, 'came from backend');
    } catch (error) {
      console.error('Error while adding inventory:', error.message);
      alert('data not found');
    }
  };

  const handleDownloadCsv = () => {
    const boldStyle = { bold: true };
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Add header row
    worksheet.addRow([
      'Item Description',
      'Location/Vessel',
      'SubLocation',
      'Consumed Quantity',
      'Date',
      'remarks',
    ]).font = boldStyle;
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.getColumn(5).width = 20;

    let serialNumber = 1;
    // Add data rows
    consume.forEach((consumeRow, rowIndex) => {
      const rowData = [
        // serialNumber++,
        Array.isArray(consumeRow.item)
          ? consumeRow.item.join(', ')
          : consumeRow.item,
        consumeRow.locationName,
        consumeRow.SubLocations,
        consumeRow.quantity,
        consumeRow.date,
      ];

      worksheet.addRow(rowData);
    });

    // Create a blob from the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'MasterReport.xlsx';
      link.click();
    });
  };
  console.log(formData, 'resssss');

  return (
    <>
      <Card
        color='secondary'
        sx={{
          width: '100%',
          backgroundColor: 'secondary',
          borderBottom: '2px solid yellow',
          mb: '33px',
        }}
      >
        <CardContent>
          <Typography
            variant='h4'
            color='secondary'
            gutterBottom
            style={{ fontFamily: "'EB Garamond'" }}
          >
            Consumed Item Report
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={21} sm={6}>
              <FormControl fullWidth sx={{ width: '90%' }}>
                <InputLabel id='demo-simple-select-label'>
                  Item Description
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='description'
                  //value={age}
                  label='description'
                  onChange={(e) =>
                    setformData({
                      ...formData,
                      item: e.target.value,
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
                  {state.item.data?.map((item, index) => (
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
                  label='location'
                  onChange={(e) =>
                    setformData({
                      ...formData,
                      locationName: e.target.value,
                    })
                  }
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 120,
                      },
                    },
                  }}
                  //onChange={handleLocationChange}
                >
                  {state.location.data?.map((item, index) => (
                    <MenuItem key={index} value={item?.locationName}>
                      {' '}
                      {item?.locationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: '21px' }}>
            <Grid item xs={12} sm={6}>
              <InputLabel id='date-picker-label'>From date</InputLabel>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  //value={formData.date}
                  onChange={(newDate) => handleDateChange(newDate)}
                  fullWidth
                  sx={{ width: '90%' }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id='date-picker-label'>To Date</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  //value={formData.date}
                  onChange={(newDate) => handleDateChangeTo(newDate)}
                  fullWidth
                  sx={{ width: '90%' }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: '23px' }}></Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              mt: '33px',
              mb: '17px',
            }}
          >
            <Button
              variant='contained'
              color='secondary'
              size='large'
              onClick={handleClick}
              sx={{ marginRight: '8px' }}
            >
              Preview
            </Button>
            <Button
              variant='contained'
              color='secondary'
              size='large'
              onClick={handleDownloadCsv}
              sx={{ marginRight: '8px' }}
            >
              Dwnload Excel
            </Button>
            <Button
              variant='contained'
              color='secondary'
              size='large'
              //onClick={handleClick}
            >
              Download Pdf
            </Button>
          </Box>
        </CardContent>
      </Card>

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
                  Item Description
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Location
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
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Remarks
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consume.map((consume) => (
                <TableRow
                  key={consume.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* <TableCell component='th' scope='row'>
                  {attendenceconsume
                </TableCell> */}
                  <TableCell align='right'>{consume.item}</TableCell>
                  <TableCell align='right'>{consume.locationName}</TableCell>
                  <TableCell align='right'>{consume.SubLocations}</TableCell>
                  <TableCell align='right'>{consume.quantity}</TableCell>
                  <TableCell align='right'>{consume.transferDate}</TableCell>

                  {/* <Link to={`/updatePickup/${master.id}`}>
                      <Button variant='contained'>Update</Button>
                    </Link>
                    <Button
                      sx={{ marginLeft: '11px' }}
                      variant='contained'
                      color='secondary'
                      onClick={() => deletePickup(pickup.id)}
                    >
                      Delete
                    </Button> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={pickup.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Grid>
    </>
  );
};

export default ConsumeReport;
