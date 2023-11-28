import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Rating,
  Toolbar,
  Typography,
} from '@mui/material';

const Home = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Inventory
            </Typography>
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Home;
