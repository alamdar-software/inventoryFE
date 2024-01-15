import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUom = () => {
  const [formData, setformData] = useState({
    unitName: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getUOM = async () => {
      const res = await fetch(`http://localhost:8080/unit/get/${id}`);

      const data = await res.json();

      console.log(data, 'backdata');
      setformData({
        unitName: data.unitName,
      });
      /* setdata(data); */
    };
    getUOM();
  }, []);
  const handleClick = async () => {
    const res = await fetch(`http://localhost:8080/unit/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(formData),
    });
    const data = await res.text();
    console.log(data);
    navigate('/uom');
  };
  return (
    <>
      <Card
        color='secondary'
        sx={{
          width: '100%',
          backgroundColor: 'secondary',
          borderBottom: '2px solid yellow',
        }}
      >
        <CardContent>
          <Typography
            variant='h4'
            color='secondary'
            gutterBottom
            style={{ fontFamily: "'EB Garamond'" }}
          >
            Update UOM
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ ml: '13px', mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            id='unitName'
            label='Unit Name'
            variant='outlined'
            value={formData.unitName}
            onChange={(e) =>
              setformData({
                ...formData,
                unitName: e.target.value,
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
    </>
  );
};

export default UpdateUom;
