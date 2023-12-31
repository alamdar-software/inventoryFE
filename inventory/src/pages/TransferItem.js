import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { Link } from 'react-router-dom';
const TransferItem = () => {
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
          <Typography
            variant='h4'
            color='secondary'
            gutterBottom
            style={{ fontFamily: "'EB Garamond'" }}
          >
            Transfer Item Dashboard
          </Typography>
        </CardContent>
      </Card>
      <Grid sx={{ display: 'flex', justifyContent: 'center', mt: '23px' }}>
        <Link to='/cipl' style={{ textDecoration: 'none' }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TransferWithinAStationIcon
                sx={{ fontSize: '70px', color: '#DD7071' }}
              />
              <Typography component='div' sx={{ fontWeight: 'bolder' }}>
                CIPL
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>
        <Link to='/mto' style={{ textDecoration: 'none' }}>
          <Card sx={{ minWidth: 275, ml: '31px' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <EditNoteIcon sx={{ fontSize: '70px', color: '#15A4C3' }} />
              <Typography component='div' sx={{ fontWeight: 'bolder' }}>
                MTO
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>
        <Link to='/it' style={{ textDecoration: 'none' }}>
          <Card sx={{ minWidth: 275, ml: '31px' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <FlipCameraIosIcon sx={{ fontSize: '70px', color: '#91E96B' }} />
              <Typography component='div' sx={{ fontWeight: 'bolder' }}>
                Internal Transfer
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>
      </Grid>
    </>
  );
};

export default TransferItem;
