import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
} from '@mui/material';

import { useEffect } from 'react';
import BrandTable from '../components/BrandTable.js';
import Swal from 'sweetalert2';
// const currency = {
//   currencyName: "",
// };

export default function Brand() {
  const [Brand, setBrand] = useState({
    brandName: '',
  });
  const [Loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
  const [data, setdata] = useState([]);
  console.log(Brand);

  useEffect(() => {
    const getBrand = async () => {
      const res = await fetch('http://localhost:8080/brand/view');

      const data = await res.json();

      console.log(data, 'backdata');
      setdata(data);
    };
    getBrand();
  }, []);
  const handleClick = async () => {
    const { brandName } = Brand;

    if (!brandName) {
      Swal.fire({
        title: 'Please Fill All Fields',
        text: 'Fields are Empty?',
        icon: 'question',
      });
      return;
    }
    const res = await fetch('http://localhost:8080/brand/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Brand),
    });
    const data = await res.json();
    console.log(data);
    window.location.reload();

    // fetch('http://localhost:8080/location/add', {
    //   method: 'POST',
    //   headers: { 'Content-type': 'application/json' },
    //   body: JSON.stringify(formData),
    // }).then(() => {
    //   console.log('Location Added');
    // });
  };
  /*   const handleChange = (e) => {
        setCurrency({
          currencyName: e.target.value,
        });
      }; */
  return (
    <>
      <Grid>
        <Card
          color='secondary'
          sx={{ width: '100%', backgroundColor: 'secondary' }}
        >
          <CardContent>
            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              Create Brand
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Card
        sx={{
          width: '100%',
          mt: '33px',
          pt: '33px',
          borderBottom: '2px solid grey',
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ ml: '11px', justifyContent: 'center' }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              name='name'
              label='Enter Brand'
              variant='outlined'
              /*  value={currency?.currencyName} */
              onChange={(e) =>
                setBrand({
                  brandName: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          variant='contained'
          color='secondary'
          size='large'
          onClick={handleClick}
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
        <div sx={{ margin: '20px' }}>
          <BrandTable data={data} />
        </div>
      </Card>
    </>
  );
}
