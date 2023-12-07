import { Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

const User = () => {
  return (
    <>
      <Grid>
        <Card
          color='secondary'
          sx={{
            width: '100%',
            backgroundColor: 'secondary',
            borderBottom: '2px solid yellow',
          }}
        >
          <CardContent>
            <Typography variant='h4' color='secondary' gutterBottom>
              Add User
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid sx={{ mt: '23px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='User Name'
              variant='outlined'
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label=' Name'
              variant='outlined'
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Email'
              variant='outlined'
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label=' Phone Number'
              variant='outlined'
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Password'
              variant='outlined'
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label=' Conferm Password'
              variant='outlined'
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Role(/s)'
              variant='outlined'
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default User;
