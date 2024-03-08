import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewItem = () => {
  const [formData, setformData] = useState({
    itemName: '',
    description: '',
    name: '',
    unitName: '',
    minimumStock: '',
  });
  //   const [itemName, setItemName] = useState();
  //   const [minimumStock, setMinmumStock] = useState();
  //   const [description, setDescription] = useState();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [item, setItem] = useState([]);
  const { currentUser } = useSelector((state) => state.persisted.user);
  useEffect(() => {
    console.log(currentUser.accessToken, 'heyyyy');
    fetch('http://localhost:8080/item/view', {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const itemArray = Object.values(result);
          setItem(itemArray);
        } else {
          console.error('Empty or invalid JSON response');
        }
      });
  }, []); // Make sure to include an empty dependency array if you only want this effect to run once on component mount

  const deleteItem = async (id) => {
 
    console.log(id);
    fetch(`http://localhost:8080/item/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(item),
    })
      .then(() => {
        console.log('item Deleted');
        toast.warn('🦄 Item Deleted Successfully!', {
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
       
      })
      .catch((error) => {
        console.error('Error updating location:', error);
      });
  };
  return (
    <>
      <Card
        color='secondary'
        sx={{
          width: '100%',
          borderBottom: '2px solid #ab47bc',
        }}
      >
        <CardContent>
          <Typography variant='h4' color='secondary' gutterBottom>
            List Of Items
          </Typography>
        </CardContent>
      </Card>

      <Grid sx={{ mt: '33px' }}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: '33px', borderBottom: '2px solid yellow' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Item Name
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Item Description
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Catagory
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  UOM
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Minimum Stock
                </TableCell>
                <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {item
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='right'>{item.itemName}</TableCell>
                    <TableCell align='right'>{item.description}</TableCell>
                    <TableCell align='right'>{item.name}</TableCell>
                    <TableCell align='left'>{item.unitName}</TableCell>
                    <TableCell align='left'>{item.minimumStock}</TableCell>
                    <Link to={`/updateItem/${item.id}`}>
                      <Button sx={{ marginRight: '11px' }} variant='contained'>
                        View Inventory
                      </Button>
                    </Link>

                    <Link
                      sx={{ marginLeft: '11px' }}
                      to={`/updateItem/${item.id}`}
                    >
                      <Button variant='contained'>Update</Button>
                    </Link>
                    <Button
                      sx={{ marginLeft: '11px' }}
                      variant='contained'
                      color='secondary'
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7} align='center'>
                  <hr style={{ width: '100%' }} />
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={item.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{ fontWeight: 'bolder' }}
                    labelRowsPerPage={
                      <span
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        Rows per page:
                      </span>
                    }
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

export default ViewItem;
