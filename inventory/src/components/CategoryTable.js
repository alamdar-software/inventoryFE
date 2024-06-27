import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, CardContent, FormControl, Grid, InputLabel, Select, Typography, MenuItem } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { toast } from 'react-toastify';
import { fetchCategory } from '../redux/slice/CategorySlice';
import { styled } from '@mui/system';

const columns = [
  { id: 'Category', label: 'Category', minWidth: 200 },
  { id: 'Actions', label: 'Actions', minWidth: 100 },
];

export default function CategoryTable() {
  const [formData, setFormData] = useState({ name: "" });
  const { currentUser } = useSelector((state) => state.persisted.user);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory(currentUser.accessToken));
  }, [dispatch, currentUser.accessToken]);

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/category/delete/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      );

      if (response.ok) {
        toast.warn('🦄 Category Deleted Successfully!', {
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
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('Error during delete:', error);
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch('http://localhost:8080/category/view', {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch category data');
        }
        const data = await res.json();
        setData(data);
        setTotalRows(data.length);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };
    getCategory();
  }, [currentUser.accessToken]);

  const handleSearch = async () => {
    try {
      const res = await fetch('http://localhost:8080/category/search', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setData(data);
      setTotalRows(data.length);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  return (
    <Paper sx={{ width: '100%', margin: '0 auto', maxWidth: '1000px' }}>
      <CardContent>
        <Typography
          variant='h4'
          color='secondary'
          gutterBottom
          style={{ fontFamily: "'EB Garamond'", textAlign: 'center', marginBottom: "60px" }}
        >
          View Category
        </Typography>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '50%', display: "flex", margin: "auto" }}>
            <InputLabel id='demo-simple-select-label'>Category</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='category'
              label='Category'
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120,
                  },
                },
              }}
              onChange={(e) => setFormData({ name: e.target.value })}
            >
              {state.nonPersisted.category.data?.map((item, index) => (
                <MenuItem key={index} value={item?.name}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
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
              onClick={handleSearch}
            >
              Search
            </Button>
          </FormControl>
        </Grid>
      </CardContent>
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
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Link to={`/category/edit/${row.id}`}>
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
            rowsPerPage={rowsPerPage}
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
