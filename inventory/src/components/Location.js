import { Button } from '@mui/base';
import {
  AppBar,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

export const Location = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' sx={{ backgroundColor: 'teal' }}>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Location/Vessel
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid>
        <Card sx={{ minWidth: 275, pt: '11px' }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              Word of the Day
            </Typography>

            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              adjective
            </Typography>
            <Typography variant='body2'>
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};
