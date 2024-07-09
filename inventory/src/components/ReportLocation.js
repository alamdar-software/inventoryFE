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
} from '@mui/material';
import { Link } from 'react-router-dom';
//import { fetchlocation } from '../../redux/slice/location';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { CSVLink } from 'react-csv';

import {

  TablePagination,

  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { styled } from '@mui/system';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { fetchlocation } from '../redux/slice/location';
const ReportLocation = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [item, setitem] = useState();
  const [locationName, setlocationName] = useState();
  const [transferDate, settransferDate] = useState();
  const [cipl, setcipl] = useState([]);
  const [allCipl, setAllCipl] = useState([]);
  const [filteredCipl, setFilteredCipl] = useState([]);
  const { currentUser } = state.persisted.user;
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
  }, []);
  useEffect(() => {
    // Update totalRows when locationData or itemData changes
    setTotalRows(filteredCipl.length);
  },);
  console.log(state, 'nowory');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setformData] = useState({
    locationName: '',
    address: '',
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
  console.log(formData, "lolololo");


  // useEffect(() => {
  //   fetch('http://localhost:8080/location/viewAll')
    
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       setFilteredCipl(result);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching pickup data:', error);
  //     });
  // }, []);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('http://localhost:8080/inventory/view', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        });
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const result = await res.json();
        setFilteredCipl(result);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };
  
    fetchLocations();
  }, [currentUser.accessToken]);
  

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/location/searchByInventory', {
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
      console.log(data, 'came from backend');
      setFilteredCipl(data);
    } catch (error) {
      console.error('Error while adding inventory:', error.message);
      alert('data not found');
    }
  };
  
  console.log(filteredCipl,'searchhhh')

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
  console.log(state, 'hey');
  const generateCsvData = () => {
    // Your logic to create CSV data based on search parameters
    const csvData = [
      ['Serial No', 'Location/Vessel', 'SubLocation'], // Header row
      ...filteredCipl.flatMap((ciplRow, rowIndex) =>
        ciplRow.addresses?.map((subLocation, subIndex) => [
          rowIndex * ciplRow.addresses.length + subIndex + 1,
          ciplRow.locationName,
          subLocation.address,
        ])
      ),
    ];

    return csvData;
  };

  const handleDownloadCsv = () => {
    const boldStyle = { bold: true };
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Add header row
    worksheet.addRow(['Serial No', 'Location/Vessel', 'SubLocation']).font =
      boldStyle;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(2).width = 30;
    // Add data rows
    filteredCipl.forEach((ciplRow, rowIndex) => {
      ciplRow.addresses?.forEach((subLocation, subIndex) => {
        const rowData = [
          rowIndex * ciplRow.addresses.length + subIndex + 1,
          ciplRow.locationName,
          subLocation.address,
        ];
        worksheet.addRow(rowData);
      });
    });

    // Create a blob from the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'excel_file.xlsx';
      link.click();
    });
  };

  console.log(filteredCipl, 'fillll');
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
              Inventory Location Report
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
<Grid container spacing={2} sx={{ ml: '13px', alignItems: 'center' }}>
  <Grid item xs={12} sm={6} sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
    <FormControl fullWidth sx={{ width: '90%' }}>
      <InputLabel id='demo-simple-select-label'>
        Location
      </InputLabel>
      <Select
        labelId='locationName'
        id='locationName'
        value={formData.locationName}
        label='location'
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 120,
            },
          },
        }}
        onChange={(e) => setformData({
          ...formData,
          locationName: e.target.value
        })}
      >
        {state?.nonPersisted?.location?.data?.map((item, index) => (
          <MenuItem key={index} value={item?.locationName}>
            {item?.locationName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
  <Grid item xs={12} sm={6} sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
    <FormControl fullWidth sx={{ width: '90%' }} >
      <InputLabel id='demo-simple-select-label'>
        Sub Location
      </InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='itemName'
        label='itemName'
        onChange={(e) => {
          setformData({
            ...formData,
            address: e.target.value,
          });
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 120,
            },
          },
        }}
      >
        {state.nonPersisted.location.data?.map((location) =>
          location.addresses.map((address) => (
            <MenuItem key={address.id} value={address.address}>
              {address.address}
            </MenuItem>
          ))
        )}
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

          {/* <CSVLink
            data={generateCsvData()}
            filename={'search_parameters.csv'}
            target='_blank'
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant='contained'
              color='secondary'
              size='large'
              sx={{ marginRight: '8px' }}
            >
              Download CSV
            </Button>
          </CSVLink> */}


          <Button
            variant='contained'
            color='secondary'
            size='large'
            onClick={handleDownloadCsv}
          >
            Download Excel
          </Button>
        </Box>
      </Card>
      <Grid sx={{ mt: '33px', width: '100%', overflowX: 'scroll' }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '33px',
            borderBottom: '2px solid yellow',
            width: '100%',
          }}
        >
          <Table sx={{ minWidth: 100 }} aria-label='simple table'>
            <TableHead>
            <TableRow>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Location
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  SubLocation
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Item Description
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Quantity
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Consumed Quantity
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Scrapped Quantity
                </TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCipl &&
                filteredCipl
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((ciplRow) =>
                    // Render a row for each sublocation
                   
                      <TableRow
                        key={`${ciplRow.id}`} // Use a unique key for each row
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell align='left' sx={{ paddingLeft: '40px' }}>
                          {ciplRow.locationName}
                        </TableCell>
                        <TableCell align='left'>
                          {ciplRow.address?.address || ''}
                        </TableCell>
                        <TableCell align='left'>
                          {ciplRow.description.match(/^[^-(]*/)[0].trim()}
                        </TableCell>
                        <TableCell align='left'>
                          {ciplRow.quantity}
                        </TableCell>
                        <TableCell align='left'>
                          {ciplRow.consumedItem}
                        </TableCell>
                        <TableCell align='left'>
                          {ciplRow.scrappedItem}
                        </TableCell>
                      </TableRow>
                 
                  )}
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
    box-shadow: 0px 4px 16px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : grey[200]
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


export default ReportLocation;
