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
import CategoryTable from '../components/CategoryTable';
import { useSelector } from 'react-redux';

// const currency = {
//   currencyName: "",
// };

export default function Category() {
  const [category, setCategory] = useState({
    name: '',
  });
  const [Loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
  const [data, setdata] = useState([]);
  const { currentUser } = useSelector((state) => state.persisted.user);

  console.log(category);

  useEffect(() => {
    const getCategory = async () => {
      console.log(currentUser.accessToken, 'heyyyy');
      const res = await fetch('http://localhost:8080/category/view', {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });

      const data = await res.json();

      console.log(data, 'backdata');
      setdata(data);
    };
    getCategory();
  }, []);
  const handleClick = async () => {
    const res = await fetch('http://localhost:8080/category/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(category),
    });
    const data = await res.text();
    console.log(data, 'add data');
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
              Create Category
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
              label='Enter Category'
              variant='outlined'
              /*  value={currency?.currencyName} */
              onChange={(e) =>
                setCategory({
                  name: e.target.value,
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
          <CategoryTable data={data} />
        </div>
      </Card>
    </>
  );
}
