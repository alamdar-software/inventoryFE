import {
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
} from '@mui/material';
import React, { useState } from 'react';

const LocationList = () => {
  const [locationName, setLocation] = useState();
  const [address, setSubLocation] = useState();
  const [location, setLocationName] = useState([]);
  React.useEffect(() => {
    fetch('http://localhost:8080/location/getAll')
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLocationName(result);
      });
  }, []);
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
                {location.map((location) => (
                  <TableRow
                    key={location.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {/* <TableCell component='th' scope='row'>
                  {attendence.name}
                </TableCell> */}
                    <TableCell align='left'>{location.locationName}</TableCell>
                    <TableCell align='left'>{location.address}</TableCell>

                    {/* <Link to={`/updateAttendence/${attendence.id}`}>
                  <Button variant='contained'>Update</Button>
                </Link> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default LocationList;
