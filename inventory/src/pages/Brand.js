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
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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
  const { currentUser } = useSelector((state) => state.persisted.user);

  useEffect(() => {
    const getBrand = async () => {
      console.log(currentUser.accessToken, 'heyyyy');
      const res = await fetch('http://localhost:8080/brand/view', {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });

      const data = await res.json();

      console.log(data, 'backdata');
      setdata(data);
    };
    getBrand();
  }, []);
  const handleClick = async () => {
    const { brandName } = Brand;

    const res = await fetch('http://localhost:8080/brand/add', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Brand),
    });
    const data = await res.json();
    console.log(data);
    toast.success('🦄 Brand Added Successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });
      setTimeout(() => {
        window.location.reload();
    }, 3000);

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
  console.log(currentUser.accessToken, 'rashmi');
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
