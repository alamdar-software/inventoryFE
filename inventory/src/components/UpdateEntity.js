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
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// const currency = {
//   currencyName: "",
// };

export default function UpdateEntity() {
  const navigate = useNavigate();
  const [entity, setEntity] = useState({
    entityName: '',
  });
  const [Loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
  const [data, setdata] = useState([]);
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;
  const { id } = useParams();
  console.log(entity);

  useEffect(() => {
    const getEntity = async () => {
      const res = await fetch(`http://localhost:8080/entity/get/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });

      const data = await res.json();

      console.log(data, 'backdata');
      setEntity({
        entityName: data.entityName,
      });
      /* setdata(data); */
    };
    getEntity();
  }, []);
  const handleClick = async () => {
    const res = await fetch(`http://localhost:8080/entity/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },

      body: JSON.stringify(entity),
    });
    const data = await res.text();
    console.log(data);
    toast.success('🦄 Category Added Successfully!', {
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
       
        navigate('/entity');
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
  return (
    <>
      <Grid>
        <Card
          color='secondary'
          sx={{ width: '100%', backgroundColor: 'secondary' }}
        >
          <CardContent>
            <Typography variant='h4' color='secondary' gutterBottom>
              Update Entity
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
              value={entity?.entityName}
              /*  value={currency?.currencyName} */
              onChange={(e) =>
                setEntity({
                  entityName: e.target.value,
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
