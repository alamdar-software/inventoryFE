import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const Inventory = () => {
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
              Inventory
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid container spacing={2} sx={{ mt: '33px' }}>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Location</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              label='location'
              //onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Sub Location</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              label='sublocation'
              //onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: '33px' }}>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Item Description
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              label='location'
              //onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='outlined-basic'
            label='Quantity'
            variant='outlined'
            type='number'
            //   onChange={(e) =>
            //     setformData({
            //       ...formData,
            //       name: e.target.value,
            //     })
            //   }

            fullWidth
            sx={{ width: '90%' }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '33px' }}>
        <Grid item xs={21} sm={6}>
          <TextField
            id='outlined-basic'
            label='Consumed Quantity'
            variant='outlined'
            type='number'
            //   onChange={(e) =>
            //     setformData({
            //       ...formData,
            //       name: e.target.value,
            //     })
            //   }

            fullWidth
            sx={{ width: '90%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='outlined-basic'
            label='Scrapped Quantity'
            variant='outlined'
            type='number'
            //   onChange={(e) =>
            //     setformData({
            //       ...formData,
            //       name: e.target.value,
            //     })
            //   }

            fullWidth
            sx={{ width: '90%' }}
          />
        </Grid>
      </Grid>
      <Button
        variant='contained'
        color='secondary'
        size='large'
        //onClick={handleClick}

        sx={{
          mt: '33px',
          mb: '17px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
        }}
      >
        Add
      </Button>
    </>
  );
};

export default Inventory;
