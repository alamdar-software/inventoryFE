import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { styled } from '@mui/system';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { toast } from 'react-toastify';
import { fetchBrand } from '../redux/slice/BrandSlice';
const columns = [
  { id: 'Brand', label: 'Brands', minWidth: 200 },
  { id: 'Actions', label: 'Actions', minWidth: 100 },
];

export default function BrandTable({ data }) {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [totalRows,setTotalRows] = useState(0);
  /*  const [datas, setdatas] = useState([]); */
  /*   setdatas(data); */

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  console.log(Array.isArray(data), 'yesss');
  console.log(data, 'brandtable');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(5);
    setPage(0);
  };


  useEffect(() => {
    // Update totalRows when locationData or itemData changes
    
      setTotalRows(data.length);
    
  },);
  const[brand,setBrand]=useState([]);
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;
  const dispatch= useDispatch()
  
  const [formData, setformData] = useState({
    brandName: '',
    
  });
  useEffect(() => {
    dispatch(fetchBrand(currentUser.accessToken));
  
  }, []);

  const handleDelete = async (id) => {
    try {
      // Perform the delete operation
      const response = await fetch(`http://localhost:8080/brand/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });

      if (response.ok) {
        // Update the state or fetch data again after deletion
        // For simplicity, you can reload the page or fetch data again
        toast.warn('🦄 Brand Deleted Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",

        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        // Handle the error if deletion fails
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('Error during delete:', error);
    }
  };
  useEffect(() => {
    const getBrand = async () => {
      console.log(currentUser.accessToken, 'heyyyy');
      const res = await fetch('http://localhost:8080/brand/view', {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });

      const data = await res.json();

      console.log(data, 'backdata');
      setBrand(data);
    };
    getBrand();
  }, []);
  const handleSearch = () => {
    console.log('Form Data:', formData);

    fetch('http://localhost:8080/brand/search', {
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
          setBrand(result);
        } else {
          console.error('Received data does not contain an array:', result);
          setBrand([]);
        }
      })
      .catch((error) => {
        console.error('Error searching data:', error);
        setBrand([]);
      });
  };
  console.log(formData,"jujuju");
  return (
    <Paper sx={{ width: '100%', margin: '0 auto', maxWidth: '1000px' }}>
<Box>
        <Card 
          color='secondary'
          sx={{
            width: '100%',
            backgroundColor: 'secondary',
            borderBottom: '2px solid yellow',
            mb: '31px',
            mt:'31px'
          }}
        >
          <CardContent >
            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              View Entity
            </Typography>
          </CardContent>
        </Card>
        {/* <Chip
          sx={{ mb: '11px', fontWeight: 'bolder' }}
          //label={`Total Incoming Stock: ${totalCount}`}
          variant='outlined'
        /> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='demo-simple-select-label'>
                Brand Name
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='entityName'
                onChange={(e) =>
                  setformData({
                    ...formData,
                    brandName: e.target.value,
                  })
                }
              >
                {state.nonPersisted.brand.data?.map((item, index) => (
                  <MenuItem key={index} value={item?.brandName}>
                    {' '}
                    {item?.brandName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
        </Grid>
       
      </Box>

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table
          stickyHeader
          aria-label='sticky table'
          sx={{
            mx: '5',
            mt: '5',
            border: 1,
            borderColor: 'grey.300',
            borderStyle: 'solid',
          }}
        >
          <TableHead sx={{ backgroundColor: '#f3f3f3' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {brand.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align='center'>
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              brand
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                    <TableCell>{row.brandName}</TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Link to={`/brand/edit/${row.id}`}>
                          <Button variant='contained' color='primary'>
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant='contained'
                          color='secondary'
                          sx={{ marginLeft: '8px !important' }}
                          onClick={() => handleDelete(row.id)}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))
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
    </Paper>
  );
}

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

