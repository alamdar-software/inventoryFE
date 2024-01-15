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
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// const currency = {
//   currencyName: "",
// };

export default function UpdateBrand() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState({
    brandName: '',
  });
  const [Loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
  const [data, setdata] = useState([]);
  const { id } = useParams();
  console.log(brand);

  useEffect(() => {
    const getBrand = async () => {
      const res = await fetch(`http://localhost:8080/brand/get/${id}`);

      const data = await res.json();

      console.log(data, 'backdata');
      setBrand({
        brandName: data.brandName,
      });
      /* setdata(data); */
    };
    getBrand();
  }, []);
  const handleClick = async () => {
    const res = await fetch(`http://localhost:8080/brand/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(brand),
    });
    const data = await res.text();
    console.log(data);
    navigate('/brand');

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
            <Typography variant='h4' color='secondary' gutterBottom>
              Update Currency
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
              name='currencyName'
              variant='outlined'
              value={brand.brandName}
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
          Update
        </Button>
      </Card>
    </>
  );
}
