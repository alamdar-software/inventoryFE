import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const columns = [
  { id: 'Entity Name', label: 'Entity Name', minWidth: 200 },
  { id: 'Actions', label: 'Actions', minWidth: 100 },
];

export default function EntityTable({ data }) {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  /*  const [datas, setdatas] = useState([]); */
  /*   setdatas(data); */
  console.log(data, 'tableeeeeeeeee');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  console.log(Array.isArray(data), 'yesss');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(5);
    setPage(0);
  };
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;
  const handleDelete = async (id) => {
    try {
      // Perform the delete operation
      const response = await fetch(
        `http://localhost:8080/entity/delete/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      );

      if (response.ok) {
        // Update the state or fetch data again after deletion
        // For simplicity, you can reload the page or fetch data again
        toast.warn('🦄 Entity Deleted Successfully!', {
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
  return (
    <Paper sx={{ width: '100%', margin: '0 auto', maxWidth: '1000px' }}>
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
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align='center'>
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                    <TableCell>{row.entityName}</TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Link to={`/entity/update/${row.id}`}>
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
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
