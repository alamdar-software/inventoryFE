import {
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Card, CardContent, Grid, InputLabel, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fetchentity } from '../redux/slice/entitySlice';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const MasterReports = () => {
  const [filteredCipl, setFilteredCipl] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setformData] = useState({
    description: '',
    locationName: '',
    startDate: '',
    endDate: '',
    entityName: '',
  });

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;

  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
    dispatch(fetchentity(currentUser.accessToken));
  }, [dispatch]);

  const handleDateChange = (date) => {
    setformData({
      ...formData,
      startDate: date.format('YYYY-MM-DD'),
    });
  };
  console.log(formData);
  const handleDateChangeTo = (dateTo) => {
    setformData({
      ...formData,
      endDate: dateTo.format('YYYY-MM-DD'),
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        'http://localhost:8080/incomingstock/searchMaster',
        {
          method: 'post',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

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
  const handleDownloadCsv = () => {
    const boldStyle = { bold: true };
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Add header row
    worksheet.addRow([
      'Item Description',
      'Location/Vessel',
      'SubLocation',
      'Category',
      'Brand',
      'Entity',
      'Purchase Date',
      'Purchase Order',
      'Part No',
      'Serial No',

      'Total Quantity',
      'Extended Value',

      'Unit Cost',
      'Price',

      'Currency',
    ]).font = boldStyle;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(2).width = 30;

    let serialNumber = 1;
    // Add data rows
    filteredCipl.forEach((ciplRow, rowIndex) => {
      const rowData = [
        serialNumber++,
        Array.isArray(ciplRow.description)
          ? ciplRow.description.join(', ')
          : ciplRow.description,
        ciplRow.locationName,
        ciplRow.address,
        ciplRow.name,
        ciplRow.brandName,
        ciplRow.entityName,
        ciplRow.date,
        ciplRow.purchaseOrder,
        ciplRow.pn,
        ciplRow.sn,
        ciplRow.quantity,
        ciplRow.extendedValue,
        ciplRow.unitCost,
        ciplRow.price,
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
  const handleDownloadPdf = () => {
    const input = document.getElementById('cipl-table');

    html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape' });

      // Divide the canvas into multiple sections if needed
      const imgHeight = (canvas.height * 208) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      const marginTop = 20;

      // Add each section to the PDF
      pdf.setFont('helvetica', 'bold');

      pdf.text('Master Report', 110, 10);

      while (heightLeft >= 0) {
        pdf.addImage(imgData, 'PNG', 0, position + marginTop, 297, imgHeight);
        heightLeft -= 208;
        position -= 297;
        if (heightLeft >= 0) {
          pdf.addPage();
        }
      }

      pdf.save('Master Report.pdf');
    });
  };

  return (
    <>
      <Card
        color='secondary'
        sx={{
          width: '90%',
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
            Master Report (Incoming Stock)
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          borderBottom: '2px solid #ab47bc',
          borderRadius: '33px',
          width: '90%',
        }}
      >
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
                      description: e.target.value,
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
                  {state.nonPersisted.location.data?.map((item, index) => (
                    <MenuItem key={index} value={item?.locationName}>
                      {' '}
                      {item?.locationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: '23px' }}>
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
          <Grid container spacing={2} sx={{ mt: '21px' }}>
            <Grid item xs={21} sm={6}>
              <FormControl fullWidth sx={{ width: '90%' }}>
                <InputLabel id='demo-simple-select-label'>Entity</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Description'
                  value={formData?.entityName}
                  onChange={(e) =>
                    setformData({
                      ...formData,
                      entityName: e.target.value,
                    })
                  }
                >
                  {state.nonPersisted.entity.data?.map((item, index) => (
                    <MenuItem key={index} value={item?.entityName}>
                      {' '}
                      {item?.entityName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
              //onClick={handleClick}
              onClick={handleDownloadCsv}
              sx={{ marginRight: '8px' }}
            >
              Dwnload Excel
            </Button>
            <Button
              variant='contained'
              color='secondary'
              size='large'
              onClick={handleDownloadPdf}
            >
              Download Pdf
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Grid sx={{ mt: '33px', width: '95%' }}>
        <TableContainer
          id='cipl-table'
          component={Paper}
          sx={{
            borderRadius: '15px',
            borderBottom: '1px solid black',
            borderTop: '1px solid black',
            width: '100%',
          }}
        >
          <Table sx={{ minWidth: 900 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell
                  align='right'
                  sx={{ fontWeight: 'bold', paddingRight: '60px' }}
                >
                  Item Description
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Location
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  SubLocation
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Catagory
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Brand
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Entity
                </TableCell>
                <TableCell
                  align='right'
                  sx={{
                    fontWeight: 'bold',
                    width: '40px',
                    marginRight: '50px',
                    paddingRight: '50px',
                  }}
                >
                  Purchase Date
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Purchase Order
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Part Number
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Serial Number
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Quantity
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Extended Value
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Unit Cost
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Price
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Currency
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCipl
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((master) => (
                  <TableRow
                    key={`${master.id}`} // Use a unique key for each row
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {/* <TableCell component='th' scope='row'>
                  {attendence.name}
                </TableCell> */}
                    <TableCell align='left'>{master.description}</TableCell>
                    <TableCell align='right'>{master.locationName}</TableCell>
                    <TableCell align='right'>{master.address}</TableCell>
                    <TableCell align='right'>{master.name}</TableCell>
                    <TableCell align='right'>{master.brandName}</TableCell>
                    <TableCell align='right'>{master.entityName}</TableCell>
                    <TableCell align='right'>{master.date}</TableCell>
                    <TableCell align='right'>{master.purchaseOrder}</TableCell>
                    <TableCell align='right'>{master.pn}</TableCell>
                    <TableCell align='right'>{master.sn}</TableCell>
                    <TableCell align='right'>{master.quantity}</TableCell>
                    <TableCell align='right'>{master.extendedValue}</TableCell>
                    <TableCell align='right'>{master.unitCost}</TableCell>
                    <TableCell align='right'>{master.price}</TableCell>
                    <TableCell align='right'>{master.currencyName}</TableCell>

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

export default MasterReports;
