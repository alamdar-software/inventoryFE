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
import ExcelJS from 'exceljs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ItemServiceReport = () => {
  const [formData, setformData] = useState({
    description: '',
    locationName: '',
    startDate: '',
    endDate: '',
    entityName: '',
  });
  const [itemService, setItemService] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchItem());
    dispatch(fetchentity());
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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/report/searchAll', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setItemService(data);
      console.log(data, 'came from backend');
    } catch (error) {
      console.error('Error while adding inventory:', error.message);
      setItemService([]);
      alert('data not found');
    }
  };

  const handleDownloadCsv = () => {
    const boldStyle = { bold: true };
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Add header row
    worksheet.addRow([
      'S.no',
      'Ref.No',
      'repairService',
      'po',
      'locationName',
      'subLocation',
      'description',
      'purchase',
      'pn',
      'consigneeName',
    ]).font = boldStyle;

    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(8).width = 20;
    worksheet.getColumn(10).width = 20;

    worksheet.getColumn(4).alignment = { horizontal: 'left' };
    worksheet.getColumn(3).alignment = { horizontal: 'left' };
    worksheet.getColumn(1).alignment = { horizontal: 'left' };
    let serialNumber = 1;
    // Add data rows
    itemService.forEach((mtoRow, rowIndex) => {
      const rowData = [
        serialNumber++,
        Array.isArray(mtoRow.referenceNo)
          ? mtoRow.referenceNo.join(', ')
          : mtoRow.referenceNo,

        // Array.isArray(mtoRow.consigneeName)
        //   ? mtoRow.consigneeName.join(', ')
        //   : mtoRow.consigneeName,
        Array.isArray(mtoRow.repairService)
          ? mtoRow.repairService.join(', ')
          : mtoRow.repairService,
        Array.isArray(mtoRow.po) ? mtoRow.po.join(', ') : mtoRow.po,
        Array.isArray(mtoRow.locationName)
          ? mtoRow.locationName.join(', ')
          : mtoRow.locationName,
        Array.isArray(mtoRow.subLocation)
          ? mtoRow.subLocation.join(', ')
          : mtoRow.subLocation,
        Array.isArray(mtoRow.description)
          ? mtoRow.description.join(', ')
          : mtoRow.description,
        Array.isArray(mtoRow.purchase)
          ? mtoRow.purchase.join(', ')
          : mtoRow.purchase,
        Array.isArray(mtoRow.pn) ? mtoRow.pn.join(', ') : mtoRow.pn,
        Array.isArray(mtoRow.consigneeName)
          ? mtoRow.consigneeName.join(', ')
          : mtoRow.consigneeName,
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
      link.download = 'Item service Report.xlsx';
      link.click();
    });
  };
  console.log(formData, 'formData');

  const handleDownloadPdf = () => {
    const input = document.getElementById('itemService');

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

      pdf.text('Item Service Report', 110, 10);

      while (heightLeft >= 0) {
        pdf.addImage(imgData, 'PNG', 0, position + marginTop, 297, imgHeight);
        heightLeft -= 208;
        position -= 297;
        if (heightLeft >= 0) {
          pdf.addPage();
        }
      }

      pdf.save('Item Service Report.pdf');
    });
  };

  return (
    <>
      <Card
        color='secondary'
        sx={{
          width: '100%',
          backgroundColor: 'secondary',
          borderBottom: '2px solid yellow',
          mb: '33px',
          //borderBottom: '2px solid #ab47bc',
        }}
      >
        <CardContent>
          <Typography
            variant='h4'
            color='secondary'
            gutterBottom
            style={{ fontFamily: "'EB Garamond'" }}
          >
            Item Service Report
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ borderBottom: '2px solid #ab47bc', borderRadius: '33px' }}>
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
              Download Excel
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

      <Grid sx={{ mt: '33px', width: '100%', overflowX: 'scroll' }}>
        <TableContainer
          id='itemService'
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
                  Reference Number
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Repair Service
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  POSO Number
                </TableCell>

                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Source Location
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Sub Location
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Item
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Purchase
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  P/N
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Consignee
                </TableCell>

                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Transfer Date
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemService.map((itemService) => (
                <TableRow
                  key={itemService.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* <TableCell component='th' scope='row'>
                  {attendenceconsume
                </TableCell> */}
                  <TableCell align='right'>{itemService.referenceNo}</TableCell>
                  <TableCell align='right'>
                    {itemService.repairService ? 'true' : 'false'}
                  </TableCell>
                  <TableCell align='right'>{itemService.po}</TableCell>
                  <TableCell align='right'>
                    {itemService.locationName}
                  </TableCell>
                  <TableCell align='right'>{itemService.subLocation}</TableCell>
                  <TableCell align='right'>{itemService.description}</TableCell>
                  <TableCell align='right'>{itemService.purchase}</TableCell>
                  <TableCell align='right'>{itemService.pn}</TableCell>
                  <TableCell align='right'>
                    {itemService.consigneeName}
                  </TableCell>
                  <TableCell align='right'>
                    {itemService.transferDate}
                  </TableCell>

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

export default ItemServiceReport;
