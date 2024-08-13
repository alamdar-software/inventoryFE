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
  TableFooter,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { styled } from '@mui/system';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

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
  const [totalRows, setTotalRows] = useState(0);
  const [referenceNo, setreferenceNo] = useState("");
  const [uniqueRefNos, setUniqueRefNos] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setformData] = useState({
    item: '',
    transferDate: '',
    locationName: '',
    referenceNunber: "",
    status: ""
  });

  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
  }, [dispatch, currentUser.accessToken]);

  useEffect(() => {
    fetch('http://localhost:8080/cipl/view', {
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
        // Extract unique reference numbers
        const uniqueRefs = [...new Set(result.map(cipl => cipl.referenceNo))];
        setUniqueRefNos(uniqueRefs);
      })
      .catch((error) => {
        console.error('Error fetching pickup data:', error);
      });
  }, [currentUser.accessToken]);

  useEffect(() => {
    setTotalRows(filteredCipl.length);
  }, [filteredCipl]);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDateChange = (date) => {
    setformData({
      ...formData,
      transferDate: date.format('YYYY-MM-DD'),
    });
  };

  const handledeleteCipl = async (id) => {
    alert('Deleted Successfully!');
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

  const generatePDF = async (rowData, index) => {
    console.log('Generate PDF clicked');
  };

  return (
    <>
      <Grid>
        <Card
          color='secondary'
          sx={{
            width: '100%',
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
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 120,
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
                {state.nonPersisted.location.data?.map((item, index) => (
                  <MenuItem key={index} value={item?.locationName}>
                    {' '}
                    {item?.locationName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{mt:"23px"}}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Ref No</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='referenceNo'
                label='referenceNo'
                onChange={(e) => {
                  setformData({
                    ...formData,
                    referenceNumber: e.target.value,
                  });
                }}
              >
                {uniqueRefNos.map((refNo, index) => (
                  <MenuItem key={index} value={refNo}>
                    {refNo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <InputLabel shrink>Request Date</InputLabel>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(newDate) => handleDateChange(newDate)}
                  fullWidth
                  sx={{ width: '90%' }}
                />
              </LocalizationProvider>
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
          onClick={handleClick}
          sx={{
            mt: '22px',
            mb: '22px',
            ml: '33px',
            borderRadius: '33px',
            width: '22%',
          }}
        >
          Search
        </Button>
      </Card>

      <Box
        sx={{
          mt: '22px',
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Sr.No</TableCell>
                <TableCell align='center'>Location Name</TableCell>
                <TableCell align='center'>Item Description</TableCell>
                <TableCell align='center'>Request Date</TableCell>
                <TableCell align='center'>Reference No</TableCell>
                <TableCell align='center'>Status</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredCipl.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredCipl
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell align='center'>{row.locationName}</TableCell>
                  <TableCell align='center'>{row.item}</TableCell>
                  <TableCell align='center'>{row.transferDate}</TableCell>
                  <TableCell align='center'>{row.referenceNo}</TableCell>
                  <TableCell align='center'>{row.status}</TableCell>
                  <TableCell align='center'>
                    <IconButton
                      component={Link}
                      to={`/cipl/createpdf/${row.id}`}
                      onClick={() => generatePDF(row.id, index)}
                    >
                      <PictureAsPdfIcon />
                    </IconButton>
                    <IconButton
                      component={Link}
                      to={`/updateCipl/${row.id}`}
                      aria-label='edit'
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label='delete'
                      onClick={() => handledeleteCipl(row.id)}
                    >
                      {/* Add a delete icon */}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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
      </Box>
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

export default ViewCipl;
