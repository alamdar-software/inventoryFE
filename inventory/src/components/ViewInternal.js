import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import { Link } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { styled } from '@mui/system';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ViewInternal = () => {
  const [formData, setformData] = useState({
    description: '',
    locationName: '',
    transferDate: '',
  });
  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
  }, []);
  const state = useSelector((state) => state);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);
  const [internal, setInternal] = useState([]);
  const { currentUser } = state.persisted.user;
  const [totalRows,setTotalRows] = useState(0);
  const [ref,setRef]=useState([]);
  const handleDateChange = (transferDate) => {
    setformData({
      ...formData,
      transferDate: transferDate.format('YYYY-MM-DD'),
    });
  };
  console.log(formData);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCompanyChange = (rowId, event) => {
    const { value, checked } = event.target;
    if (checked) {
      setformData(prevState => ({
        ...prevState,
        selectedCompanyName: value // Update state with the selected company name
      }));
    }
  };

  useEffect(() => {
    // Update totalRows when locationData or itemData changes
    
      setTotalRows(internal.length);
    
  },);


  // useEffect(() => {
  //   fetch('http://localhost:8080/internaltransfer/view', {
  //     headers: {
  //       Authorization: `Bearer ${currentUser.accessToken}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((result) => {
  //       if (result.mtoList && Array.isArray(result.mtoList)) {
  //         setInternal(result.mtoList);
  //         setTotalCount(result.totalCount);
  //       } else {
  //         console.error('Invalid data structure:', result);
  //         // Handle the situation where the expected data is not available
  //         setInternal([]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching internal transfer data:', error);
  //       // Handle the error by setting an empty array or showing an error message
  //       setInternal([]);
  //     });
  // }, []);
  useEffect(() => {
    fetch('http://localhost:8080/internaltransfer/view', {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        if (result.mtoList && Array.isArray(result.mtoList)) {
          setInternal(result.mtoList);
          setTotalCount(result.totalCount);
          setRef(result.mtoList.map(item => item.referenceNo)); // Set reference numbers
        } else {
          console.error('Invalid data structure:', result);
          setInternal([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching internal transfer data:', error);
        setInternal([]);
      });
  }, [currentUser.accessToken]);


  const handleSearch = () => {
    fetch('http://localhost:8080/internaltransfer/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setInternal(result);
        } else {
          console.error('Received data does not contain an array:', result);
          setInternal([]);
        }
      })
      .catch((error) => {
        console.error('Error searching data:', error);
        setInternal([]);
      });
  };

  const handledeleteIt = async (id) => {
    alert('Deleted Successfully!');
    console.log(id);
    fetch(`http://localhost:8080/internaltransfer/delete/${id}`, {
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
  console.log(internal);
  return (
    <>
      <Box>
        <Card
          color='secondary'
          sx={{
            width: '100%',
            backgroundColor: 'secondary',
            borderBottom: '2px solid yellow',
            mb: '31px',
          }}
        >
          <CardContent>
            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              View Internal Transfer
            </Typography>
          </CardContent>
        </Card>
        <Chip
          sx={{ mb: '11px', fontWeight: 'bolder' }}
          label={`Total Incoming Stock: ${totalCount}`}
          variant='outlined'
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='demo-simple-select-label'>
                Item Description
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Description'
                onChange={(e) =>
                  setformData({
                    ...formData,
                    description: e.target.value,
                  })
                }
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
                // onChange={handleLocationChange}
                onChange={(e) =>
                  setformData({
                    ...formData,
                    locationName: e.target.value,
                  })
                }
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={formData.transferDate}
                onChange={(newDate) => handleDateChange(newDate)}
                fullWidth
                sx={{ width: '90%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='demo-simple-select-label'>Ref No</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='referenceNumber'
                //value={age}
                label='referenceNumber'
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 120, // Adjust the height as needed
                    },
                  },
                }}
                //onChange={handleLocationChange}
                onChange={(e) =>
                  setformData({
                    ...formData,
                    referenceNumber: e.target.value,
                  })
                }
              >
                {ref.map((referenceNo, index) => (
                  <MenuItem key={index} value={referenceNo}>
                    {' '}
                    {referenceNo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
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
        <Button
          variant='contained'
          color='secondary'
          size='large'
          onClick={handleSearch}
          sx={{
            mt: '33px',
            mb: '17px',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
          }}
        >
          Search
        </Button>
      </Box>
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
                  Location
                </TableCell>

                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  SubLocation
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Destination Location
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Destination SubLocation
                </TableCell>

                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Ref Number
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Transfer Date
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Select Print
                </TableCell>
               
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Item Description
                </TableCell>

                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Print
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {internal.length > 0 ? (
                internal
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((internal) => (
                    <TableRow key={internal.id}>
                      <TableCell align='right'>
                        {internal.locationName}
                      </TableCell>
                      <TableCell align='right'>
                        {internal.SubLocation}
                      </TableCell>
                      <TableCell align='right'>
                        {internal.locationName}
                      </TableCell>
                      <TableCell align='right'>
                        {internal.destination}
                      </TableCell>
                      <TableCell align='right'>
                        {internal.referenceNo}
                      </TableCell>
                      <TableCell align='right'>
                        {internal.transferDate}
                      </TableCell>


                      <TableCell align='right'>
                      <FormControl component="fieldset">
                          <RadioGroup
                            aria-label='company'
                            name={`company-${internal.id}`}
                            value={formData.selectedCompanyName}
                            onChange={(event) => handleCompanyChange(internal.id, event)}
                          >
                            <FormControlLabel
                              value='PT. Satrya Maritim Indonesia'
                              control={<Radio />}
                              label='Indonesia'
                            />
                            <FormControlLabel
                              value='Bourbon'
                              control={<Radio />}
                              label='Bourbon'
                            />
                          </RadioGroup>
                        </FormControl>

                      </TableCell>
                      <TableCell align='right'>
                        {internal.description}
                      </TableCell>
                      <TableCell align='right'>
                        {/* <Link to={`/internal/createpdf/${internal.id}`}> */}
                        <Link to={`/internal/createpdf/${internal.id}/${encodeURIComponent(formData.selectedCompanyName)}`}>
                          <Button
                            variant='contained'
                            color='primary'
                            /*  onClick={() => generatePDF(ciplRow.id, index)} */
                            onClick={(e) => {
                              if (!formData.selectedCompanyName) {
                                e.preventDefault(); // Prevent navigation
                                alert('Please select a company before printing.');
                              }
                            }}
                          >
                            {<PictureAsPdfIcon />}
                          </Button>
                        </Link>

                      </TableCell>

                     <Box display="flex" alignItems="center">
      <IconButton
        component={Link}
        to={`/updateIt/${internal.id}`}
        aria-label='edit'
      >
        <EditIcon />
      </IconButton>
      <IconButton
        aria-label='delete'
        onClick={() => handledeleteIt(internal.id)}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
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
            <TableFooter>
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
            </TableFooter>
          </Table>
        </TableContainer>
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

export default ViewInternal;
