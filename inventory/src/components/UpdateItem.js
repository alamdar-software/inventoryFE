import {
  Box,
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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCategory } from '../redux/slice/CategorySlice';
import { fetchUom } from '../redux/slice/UomSlice';
import { toast } from 'react-toastify';

const UpdateItem = () => {
  const [item, setItem] = useState();
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory(currentUser.accessToken));
    dispatch(fetchUom(currentUser.accessToken));
  }, []);

  const [formData, setformData] = useState({
    itemName: '',
    minimumStock: '',
    description: '',
    name: '',
    unitName: '',
  });
  //   const [itemName, setItemName] = useState();

  let navigate = useNavigate();

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:8080/item/get/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result,"pappu pass");
        setItem(result);
      })
      .catch((error) => {
        console.error('Error fetching item data:', error);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const update = {
      item,
    };
    console.log(update);

    fetch(`http://localhost:8080/item/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(item),
    })
      .then(() => {
        toast.success('🦄 Item Updated Successfully!', {
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
            
            navigate('/Items');
        }, 3000);
      })
      .catch((error) => {
        console.error('Error updating class:', error);
      });
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
            <Typography variant='h4' color='secondary' gutterBottom>
              Update Item
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
              id='itemName'
              label='Item'
              variant='outlined'
              value={item ? item.itemName : ''}
              onChange={(e) => {
                setItem({
                  ...item,
                  itemName: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='description'
              label='Item Description'
              variant='outlined'
              value={item ? item.description : ''}
              onChange={(e) => {
                setItem({
                  ...item,
                  description: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ ml: '13px', mt: '21px' }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='Catagory'>Catagory</InputLabel>
              <Select
                labelId='Catagory'
                id='name'
                value={item?.name}
                //value={age}
                label='Catagory'
                onChange={(e) =>
                  setformData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                //onChange={handleChange}
              >
                {state.nonPersisted.category.data?.content.map(
                  (item, index) => (
                    <MenuItem key={index} value={item?.name}>
                      {' '}
                      {item?.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='demo-simple-select-label'>UOM</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='unitName'
                value={item?.unitName}
                //value={age}
                label='UOM'
                onChange={(e) =>
                  setformData({
                    ...formData,
                    unitName: e.target.value,
                  })
                }
                //onChange={handleChange}
              >
                {state.nonPersisted.Uom.data?.content.map((item, index) => (
                  <MenuItem key={index} value={item?.unitName}>
                    {' '}
                    {item?.unitName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '21px', ml: '13px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='minimumStock'
              label='Minimum Stock'
              variant='outlined'
              value={item ? item.minimumStock : ''}
              onChange={(e) => {
                setItem({
                  ...item,
                  minimumStock: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            marginTop: '11px',
            display: 'flex',
            justifyContent: 'center',
            mb: '23px',
          }}
        >
          <Button variant='contained' color='secondary' onClick={handleClick}>
            Update
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default UpdateItem;
