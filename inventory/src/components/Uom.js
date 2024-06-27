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

import { useState, useEffect } from 'react';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchUom } from '../redux/slice/UomSlice';
import UomTable from './UomTable';

const Uom = () => {
  const [unit, setUnit] = useState({
    unitName: '',
  });
  const [Uom, setUom] = useState([]);
  const [searchUnit, setSearchUnit] = useState('');
  const { currentUser } = useSelector((state) => state.persisted.user);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUom(currentUser.accessToken));
  }, [dispatch, currentUser.accessToken]);

  useEffect(() => {
    const getUom = async () => {
      try {
        const res = await fetch('http://localhost:8080/unit/view', {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        });

        const response = await res.json();
        setUom(response);
      } catch (error) {
        console.log(error);
      }
    };

    getUom();
  }, [currentUser.accessToken]);

  const handleSearch = async () => {
    try {
      const res = await fetch('http://localhost:8080/unit/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify({ unitName: searchUnit }),
      });

      const response = await res.json();
      setUom(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    const res = await fetch('http://localhost:8080/unit/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(unit),
    });
    const data = await res.text();

    toast.success('🦄 Uom Added Successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleChange = (e) => {
    setUnit({
      [e.target.id]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/Uom/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.warn('🦄 Uom Deleted Successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
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
              style={{ fontFamily: "'EB Garamond'",textAlign: 'center' }}
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
        <Grid container spacing={2} sx={{ marginLeft:"200px"}}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='unitName'
              label='Unit Name'
              variant='outlined'
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button
          variant='contained'
          color='secondary'
          size='large'
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
      </Card>

      <Grid>
        <Card
          color='secondary'
          sx={{
            width: '100%',
            backgroundColor: 'secondary',
            borderBottom: '2px solid yellow',
            marginTop: '60px',
            paddingBottom:"40px"
          }}
        >
          <CardContent>
            <div  sx={{ marginBottom:"80px" }}>

            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'", textAlign: 'center',marginBottom:"60px" }}
            >
              View UOM
            </Typography>
            </div>
            <div sx={{ marginTop:"80px" }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ width: '50%',display:"flex",margin:"auto"  }}>
                  <InputLabel id='demo-simple-select-label'>UOM</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='unitName'
                    label='UOM'
                    onChange={(e) => setSearchUnit(e.target.value)}
                  >
                    {state.nonPersisted.Uom.data?.map((item, index) => (
                      <MenuItem key={index} value={item?.unitName}>
                        {item?.unitName}
                      </MenuItem>
                    ))}
                  </Select>

                  <Button
                    variant='contained'
                    color='secondary'
                    size='large'
                    sx={{
                      mt: '33px',
                      mb: '17px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      display: 'block',
                    }}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </FormControl>
              </Grid>
            </div>
          </CardContent>
          <div sx={{ margin: '80px' }}>
            <UomTable data={Uom} />
          </div>
        </Card>
      </Grid>
    </>
  );
};

export default Uom;
