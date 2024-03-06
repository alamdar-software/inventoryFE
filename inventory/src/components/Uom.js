import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { useState } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import UomTable from './UomTable';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
export const Uom = () => {
  const location = useLocation();
  const [unit, setunit] = useState({
    unitName: '',
  });
  const [Uom, setUom] = useState([]);
  const { currentUser } = useSelector((state) => state.persisted.user);
  console.log(unit);
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  useEffect(() => {
    const getUom = async () => {
      try {
        const res = await fetch('http://localhost:8080/unit/view', {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        });

        const response = await res.json();
        console.log(response.content, 'uom');
        setUom(response.content);
      } catch (error) {
        console.log(error);
      }
    };

    getUom();
  }, []);
  console.log(Uom, 'uuuuuuuuuuuu');

  const handleClick = async () => {
    const res = await fetch('http://localhost:8080/unit/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`
      },
      body: JSON.stringify(unit),
    });
    const data = await res.text();

    toast.success('🦄 Uom Added Successfully!', {
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
   
  };
  const handleChange = (e) => {
    setunit({
      [e.target.id]: e.target.value,
    });
  };
  const handleDelete = async (id) => {
    try {
      // Perform the delete operation
      const response = await fetch(`http://localhost:8080/Uom/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update the state or fetch data again after deletion
        // For simplicity, you can reload the page or fetch data again

       toast.warn('🦄 Uom Deleted Successfully!', {
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
      } else {
        // Handle the error if deletion fails
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('Error during delete:', error);
    }
  };

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
            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              Add UOM
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Card
        sx={{
          width: '100%',
          mt: '33px',
          pt: '33px',
          borderBottom: '2px solid yellow',
          borderRadius: '33px',
        }}
      >
        <Grid container spacing={2} sx={{ ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='unitName'
              label='Unit Name'
              variant='outlined'
              onChange={handleChange}
              //   value={location}
              //   onChange={(e) => setLocation(e.target.value)}
              fullWidth
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
          onClick={handleClick}
        >
          Add
        </Button>
        <div sx={{ margin: '20px' }}>
          <UomTable data={Uom} />
        </div>
      </Card>
    </>
  );
};

export default Uom;
