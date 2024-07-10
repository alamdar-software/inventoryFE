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
import { fetchShipper } from '../redux/slice/ShipperSlice';
import { fetchConsignee } from '../redux/slice/ConsigneeSlice';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ExcelJS from 'exceljs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { styled } from '@mui/system';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';


const CiplReport = () => {
  const [formData, setformData] = useState({
    description: '',
    shipperName: '',
    consigneeName: '',
    entityName: '',
    date: '',
    dateTo: '',
  });
  const [ciplReport, setCiplReport] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
    dispatch(fetchentity(currentUser.accessToken));
    dispatch(fetchShipper(currentUser.accessToken));
    dispatch(fetchConsignee(currentUser.accessToken));
  }, [dispatch]);
  useEffect(() => {
    // Update totalRows when locationData or itemData changes
    setTotalRows(ciplReport.length);
  },);
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
      const res = await fetch('http://localhost:8080/cipl/searchReport', {
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
      setCiplReport(data);
      console.log(data, 'came from backend');
    } catch (error) {
      console.error('Error while adding inventory:', error.message);
      setCiplReport([]);
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
      'Consignee',
      'Repair Service',
      'Shipper',
      'Transfer Date',
      'Transfer Items',
    ]).font = boldStyle;

    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 30;
    worksheet.getColumn(8).width = 30;

    worksheet.getColumn(4).alignment = { horizontal: 'left' };
    worksheet.getColumn(1).alignment = { horizontal: 'left' };
    let serialNumber = 1;
    // Add data rows
    ciplReport.forEach((ciplRow, rowIndex) => {
      const rowData = [
        serialNumber++,
        Array.isArray(ciplRow.referenceNo)
          ? ciplRow.referenceNo.join(', ')
          : ciplRow.referenceNo,
        Array.isArray(ciplRow.consigneeName)
          ? ciplRow.consigneeName.join(', ')
          : ciplRow.consigneeName,

        Array.isArray(ciplRow.repairService)
          ? ciplRow.repairService.join(', ')
          : ciplRow.repairService,

        Array.isArray(ciplRow.shipperName)
          ? ciplRow.shipperName.join(', ')
          : ciplRow.shipperName,

        Array.isArray(ciplRow.transferDate)
          ? ciplRow.transferDate.join(', ')
          : ciplRow.transferDate,
        Array.isArray(ciplRow.item) ? ciplRow.item.join(', ') : ciplRow.item,
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
      link.download = 'Cipl Report.xlsx';
      link.click();
    });
  };
  console.log(formData, 'formData');

  const handleDownloadPdf = () => {
    const input = document.getElementById('ciplReport');

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

      pdf.text('Cipl Report', 110, 10);

      while (heightLeft >= 0) {
        pdf.addImage(imgData, 'PNG', 0, position + marginTop, 297, imgHeight);
        heightLeft -= 208;
        position -= 297;
        if (heightLeft >= 0) {
          pdf.addPage();
        }
      }

      pdf.save('Cipl.pdf');
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
        }}
      >
        <CardContent>
          <Typography
            variant='h4'
            color='secondary'
            gutterBottom
            style={{ fontFamily: "'EB Garamond'" }}
          >
            Cipl Report
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
            <InputLabel id='demo-simple-select-label'>Shipper</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='shipperName'
              //value={age}
              label='shipperName'
              onChange={(e) =>
                setformData({
                  ...formData,
                  shipperName: e.target.value,
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
              {state.nonPersisted.shipper.data?.map((item, index) => (
                <MenuItem key={index} value={item?.shipperName}>
                  {' '}
                  {item?.shipperName}
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
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Consignee</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='description'
              //value={age}
              label='description'
              onChange={(e) =>
                setformData({
                  ...formData,
                  consigneeName: e.target.value,
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
              {state.nonPersisted.consignee.data?.map((item, index) => (
                <MenuItem key={index} value={item?.consigneeName}>
                  {' '}
                  {item?.consigneeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Repair/Service
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              value={formData.repairService || ''}
              label='Repair/service'
              //onChange={handleChange}
              onChange={(e) =>
                setformData({
                  ...formData,
                  repairService: e.target.value,
                })
              }
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
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
                <MenuItem value="created">Created</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
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

      <Grid sx={{ mt: '33px' }}>
        <TableContainer
          id='ciplReport'
          component={Paper}
          sx={{
            borderRadius: '33px',
            borderBottom: '2px solid yellow',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Ref No
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Consignee
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Repair Service
                </TableCell>

                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Shipper
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Transfer Date
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Transfer Items
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ciplReport.map((ciplReport) => (
                <TableRow
                  key={ciplReport.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* <TableCell component='th' scope='row'>
                  {attendenceconsume
                </TableCell> */}
                  <TableCell align='right'>{ciplReport.referenceNo}</TableCell>
                  <TableCell align='right'>
                    {ciplReport.consigneeName}
                  </TableCell>
                  <TableCell align='right'>
                    {ciplReport.repairService ? 'true' : 'false'}
                  </TableCell>
                  <TableCell align='right'>{ciplReport.shipperName}</TableCell>
                  <TableCell align='right'>{ciplReport.transferDate}</TableCell>
                  <TableCell align='right'>{ciplReport.item}</TableCell>

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


export default CiplReport;
