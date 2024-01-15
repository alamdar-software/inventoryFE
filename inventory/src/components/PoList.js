import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

export const PoList = () => {
  return (
    <>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        height='100vh' // Adjust the height as needed
        sx={{ backgroundColor: '#f0f0f0' }} // Adjust background color
      >
        <Card>
          <CardContent>
            <Typography variant='h5'>View PoList</Typography>
            {/* Add your PoList content here */}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
