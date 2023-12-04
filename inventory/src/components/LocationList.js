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
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LocationList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust as needed

  const [location, setLocationName] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/location/getAll')
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLocationName(result);
      });
  }, []);

  const deleteLocation = async (id) => {
    alert('Deleted Successfully!');
    console.log(id);
    fetch(`http://localhost:8080/location/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(LocationList),
    })
      .then(() => {
        console.log('Class Updated');
      })
      .catch((error) => {
        console.error('Error updating class:', error);
      });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
            <Typography variant='h4' color='secondary' gutterBottom>
              Location/Vessel List
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
                  <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                    LocationName
                  </TableCell>
                  <TableCell align='left' sx={{ fontWeight: 'bold' }}>
                    Sub Location
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {location
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((location) => (
                    <TableRow
                      key={location.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align='left'>
                        {location.locationName}
                      </TableCell>
                      <TableCell align='left'>{location.address}</TableCell>
                      <Link to={`/updateLocation/${location.id}`}>
                        <Button variant='contained' color='secondary'>
                          Update
                        </Button>
                      </Link>
                      <Button
                        sx={{ marginLeft: '11px' }}
                        variant='contained'
                        color='secondary'
                        onClick={() => deleteLocation(location.id)}
                      >
                        Delete
                      </Button>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={location.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default LocationList;
