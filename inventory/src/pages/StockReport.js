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
  
  Box,
  FormLabel,
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
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { styled } from '@mui/system';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';



export const StockReport = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [item, setitem] = useState();
  const [locationName, setlocationName] = useState();
  const [transferDate, settransferDate] = useState();
  const [cipl, setcipl] = useState([]);
  const [allCipl, setAllCipl] = useState([]);
  const [filteredCipl, setFilteredCipl] = useState([]);
  const [totalRows,setTotalRows] = useState(0);
  const { currentUser } = state.persisted.user;

  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
  }, []);

  useEffect(() => {
    // Update totalRows when locationData or itemData changes
    setTotalRows(filteredCipl.length);
  },);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setformData] = useState({
    startDate: '',
    endDate: '',

    repairService: '',
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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/report/search', {
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
      startDate: date.format('YYYY-MM-DD'),
    });
  };
  const handleToDateChange = (date) => {
    setformData({
      ...formData,
      endDate: date.format('YYYY-MM-DD'),
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
  const handleDownloadCsv = () => {
    const boldStyle = { bold: true };
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Add header row
    worksheet.addRow([
      'Serial No',
      'Reference No',
      'Repair/Service',
      'Source Location',
      'SubLocation',

      'Purchase',
      'P/N',
      'Consignee',

      'Transfer Date',
      'Action',
    ]).font = boldStyle;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(6).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(7).width = 15;
    worksheet.getColumn(8).width = 15;
    worksheet.getColumn(9).width = 15;
    worksheet.getColumn(10).width = 15;

    let serialNumber = 1;
    // Add data rows
    filteredCipl.forEach((ciplRow, rowIndex) => {
      const rowData = [
        serialNumber++,
        Array.isArray(ciplRow.referenceNo)
          ? ciplRow.referenceNo.join(', ')
          : ciplRow.referenceNo,
        ciplRow.repairService,
        ciplRow.locationName,
        Array.isArray(ciplRow.subLocation)
          ? ciplRow.subLocation.join(', ')
          : ciplRow.subLocation,
        Array.isArray(ciplRow.purchase)
          ? ciplRow.purchase.join(', ')
          : ciplRow.purchase,

        ciplRow.pn,
        ciplRow.consigneeName,
        ciplRow.transferDate,
        ciplRow.dataType,
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
      link.download = 'stockmoment.xlsx';
      link.click();
    });
  };
  console.log(filteredCipl, 'rusijk');
  // Inside your handleDownloadPdf function
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
      pdf.setFont('helvetica', 'bold');
      pdf.text('Incoming Stock Report', 110, 10);

      // Add each section to the PDF
      pdf.setFont('helvetica', 'bold');
      pdf.text('Reference No', 10, 10);
      pdf.text('Repair/Service', 60, 10);
      pdf.text('Source Location', 110, 10);
      pdf.text('SubLocation', 160, 10);
      pdf.text('Purchase', 210, 10);
      pdf.text('P/N', 260, 10);
      pdf.text('Consignee', 310, 10);
      pdf.text('Transfer Date', 360, 10);
      pdf.text('Action', 410, 10);
      while (heightLeft >= 0) {
        pdf.addImage(imgData, 'PNG', 0, position + marginTop, 297, imgHeight);
        heightLeft -= 208;
        position -= 297;
        if (heightLeft >= 0) {
          pdf.addPage();
        }
      }

      pdf.save('table.pdf');
    });
  };
  // useEffect(() => {
  //   const fetchLocations = async () => {
  //     try {
  //       const res = await fetch('http://localhost:8080/report/view', {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${currentUser.accessToken}`,
  //         },
  //       });
  //       if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  //       const result = await res.json();
  //       setFilteredCipl(result);
  //     } catch (error) {
  //       console.error('Error fetching location data:', error);
  //     }
  //   };
  
  //   fetchLocations();
  // }, [currentUser.accessToken]);


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
              Stock Report
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
            <FormControl fullWidth sx={{ width: '100%' }}>
              <FormLabel>From Date</FormLabel>
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '100%' }}>
              <FormLabel>To Date</FormLabel>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    /* value={
          formData.purchaseDate ? dayjs(formData.purchaseDate) : null
        } */
                    onChange={(newDate) => handleToDateChange(newDate)}
                    // onChange={(newDate) => handleDateChange(newDate)}
                    fullWidth
                    sx={{ width: '90%' }}
                    /* format="yyyy-MM-dd" */
                  />
                </LocalizationProvider>
                
              </Grid>
            </FormControl>
          </Grid>
          <Grid container spacing={2} sx={{ ml: '0px', mt: '20px' }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ width: '45%' }}>
                <InputLabel id='demo-simple-select-label'>
                  Repair/Service
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={formData?.repairService}
                  //value={age}

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
      </Card>
      <Grid sx={{ mt: '33px', width: '100%', overflowX: 'scroll' }}>
        <TableContainer
          id='cipl-table'
          component={Paper}
          sx={{
            borderRadius: '10px',
            border: '1px   black',
            width: '98%',
            // Adjust the height as needed
            overflowY: 'auto',
            background: 'transparent', // Set background color to transparent
            margin: '5px',
          }}
        >
          <Table sx={{ minWidth: 500 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Reference No
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Repair/Service
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Source Location
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  SubLocation
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
              {filteredCipl
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ciplRow) => (
                  // Render a row for each sublocation

                  <TableRow
                    key={`${ciplRow.id}`} // Use a unique key for each row
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='right'>{ciplRow.referenceNo}</TableCell>
                    <TableCell align='right'>
                      {ciplRow.repairService ? 'Yes' : 'No'}
                    </TableCell>
                    <TableCell align='right'>{ciplRow.locationName}</TableCell>
                    <TableCell align='right'>{ciplRow.subLocation}</TableCell>
                    <TableCell align='right'>{ciplRow.purchase}</TableCell>
                    <TableCell align='right'>{ciplRow.pn}</TableCell>
                    <TableCell align='right'>{ciplRow.consigneeName}</TableCell>
                    <TableCell align='right'>{ciplRow.transferDate}</TableCell>
                    <TableCell align='right'>{ciplRow.dataType}</TableCell>
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

export default StockReport;
