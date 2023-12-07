import React from 'react';

import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StoreIcon from '@mui/icons-material/Store';
import DatasetIcon from '@mui/icons-material/Dataset';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const DailyDataCount = () => {
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
            Todays Dashboard
          </Typography>
        </CardContent>
      </Card>
      <Grid sx={{ display: 'flex', justifyContent: 'center', mt: '23px' }}>
        <Link to='/singleIncome' style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              minWidth: 275,
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <LocalShippingIcon color='secondary' sx={{ fontSize: '70px' }} />
              <Typography
                color='text.secondary'
                component='div'
                sx={{ fontWeight: 'bolder' }}
              >
                Todays incoming Stock
              </Typography>
              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                Count:
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>

        {/* <Link to='/singleIncome' style={{ textDecoration: 'none' }}> */}
        <Card sx={{ minWidth: 275, ml: '17px' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <StorefrontIcon
              fontSize='large'
              color='primary'
              sx={{ fontSize: '70px' }}
            />
            <Typography
              color='text.secondary'
              component='div'
              sx={{ fontWeight: 'bolder' }}
            >
              Todays Consumed Item
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              Count:
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
        {/* </Link> */}
        {/* <Link to='/singleIncome' style={{ textDecoration: 'none' }}> */}
        <Card sx={{ minWidth: 275, ml: '17px' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <StoreIcon style={{ color: '64dd17', fontSize: '70px' }} />
            <Typography
              color='text.secondary'
              component='div'
              sx={{ fontWeight: 'bolder' }}
            >
              Todays Scrapped Items
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              Count:
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
        {/* </Link> */}

        {/* <Link to='/singleIncome' style={{ textDecoration: 'none' }}> */}
        <Card sx={{ minWidth: 275, ml: '17px' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <DatasetIcon style={{ color: '#E0B92E', fontSize: '70px' }} />
            <Typography
              color='text.secondary'
              component='div'
              sx={{ fontWeight: 'bolder' }}
            >
              Todays CIPL
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              Count:
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
        {/* </Link> */}
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'center', mt: '23px' }}>
        {/* <Link to='/singleIncome' style={{ textDecoration: 'none' }}> */}
        <Card sx={{ minWidth: 275, ml: '17px' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <EditNoteIcon
              fontSize='large'
              style={{ color: '#C41B25', fontSize: '70px' }}
            />
            <Typography
              color='text.secondary'
              component='div'
              sx={{ fontWeight: 'bolder' }}
            >
              Todays MTO
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              Count:
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
        {/* </Link> */}
        {/* <Link to='/singleIncome' style={{ textDecoration: 'none' }}> */}
        <Card sx={{ minWidth: 275, ml: '17px' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TransferWithinAStationIcon
              fontSize='large'
              color='secondary'
              sx={{ fontSize: '70px' }}
            />
            <Typography
              color='text.secondary'
              component='div'
              sx={{ fontWeight: 'bolder' }}
            >
              Todays It
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              Count:
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
        {/* </Link> */}
      </Grid>
    </>
  );
};

export default DailyDataCount;
