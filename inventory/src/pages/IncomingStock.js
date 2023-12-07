import React from 'react';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
const IncomingStock = () => {
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
            Incoming Stock
          </Typography>
        </CardContent>
      </Card>
      <Grid sx={{ display: 'flex', justifyContent: 'center', mt: '23px' }}>
        <Link to='/singleIncome' style={{ textDecoration: 'none' }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: '70px',
              }}
            >
              <TransferWithinAStationIcon
                sx={{ fontSize: '60px', color: '#DD7071' }}
              />
              <Typography
                variant='h5'
                component='div'
                sx={{ fontWeight: 'bolder' }}
              >
                Single Income
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>

        <Link to='/bulkIncome' style={{ textDecoration: 'none' }}>
          <Card sx={{ minWidth: 275, ml: '23px' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: '70px',
              }}
            >
              <EditNoteIcon sx={{ fontSize: '60px', color: '#15A4C3' }} />
              <Typography
                variant='h5'
                component='div'
                sx={{ fontWeight: 'bolder' }}
              >
                Bulk Income
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>
      </Grid>
    </>
  );
};

export default IncomingStock;
