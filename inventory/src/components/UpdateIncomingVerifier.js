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
import { fetchBrand } from '../redux/slice/BrandSlice';
import { toast } from 'react-toastify';

const UpdateIncomingVerifier = () => {
  const [formData, setformData] = useState({});
  const [incoming, setIncoming] = useState();
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    dispatch(fetchBrand(currentUser.accessToken));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/bulkstock/getBoth/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const filteredResult = { ...result };
        delete filteredResult.dataType;
        console.log(filteredResult, 'bulkiiiiiiiii');
        setIncoming(filteredResult);
      });
  }, []);

  console.log(incoming, 'after verify');
  console.log(formData, 'formkdata');

  const handleClick = (e) => {
    e.preventDefault();
    const update = {
      incoming,
    };
    console.log(update);
    console.log(formData,"julsaaaaaaaaaa");
console.log(incoming.status,"status dekho");
    fetch(`http://localhost:8080/bulkstock/status/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        toast.success('🦄 Incoming Verified Successfully!', {
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
            
          
        }, 3000);
      })
      .catch((error) => {
        console.error('Error updating consignee:', error);
      });
  };
  console.log(incoming, 'formkdata');
  const brandName = incoming?.brandName[0];
  console.log(formData, 'formkdata2');
  return (
    <>
      <Box>
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
              Update Incoming Stock
            </Typography>
          </CardContent>
        </Card>
        <Grid container spacing={2} sx={{ mt: '33px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Location'
              variant='outlined'
              InputProps={{
                readOnly: true,
              }}
              value={incoming ? incoming.locationName : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  locationName: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='SubLocation'
              variant='outlined'
              InputProps={{
                readOnly: true,
              }}
              value={incoming ? incoming.address : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  address: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Item Description'
              variant='outlined'
              InputProps={{
                readOnly: true,
              }}
              value={incoming ? incoming.description : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  description: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Catagory'
              variant='outlined'
              InputProps={{
                readOnly: true,
              }}
              value={incoming ? incoming.name : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  name: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Unit Of Measure'
              variant='outlined'
              InputProps={{
                readOnly: true,
              }}
              value={incoming ? incoming.unitName : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  unitName: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Extended Value'
              variant='outlined'
              InputProps={{
                readOnly: true,
              }}
              value={incoming ? incoming.extendedValue : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  extendedValue: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Quantity'
              variant='outlined'
              InputProps={{
                readOnly: true,
              }}
              value={incoming ? incoming.quantity : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  quantity: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Unit Cost'
              variant='outlined'
              value={incoming ? incoming.unitCost : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  unitCost: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Total Price'
              variant='outlined'
              InputProps={{
                readOnly: true,
              }}
              value={incoming ? incoming.price : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  price: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Standard Price'
              variant='outlined'
              value={incoming ? incoming.standardPrice : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  standardPrice: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Purchase Date'
              variant='outlined'
              InputProps={{
                readOnly: true,
              }}
              value={incoming ? incoming.date : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  date: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Purchase Order'
              variant='outlined'
              value={incoming ? incoming.purchaseOrder : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  purchaseOrder: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='P/N'
              variant='outlined'
              value={incoming ? incoming.pn : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  pn: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='S/N'
              variant='outlined'
              value={incoming ? incoming.sn : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  sn: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='brandName'>brandName</InputLabel>
              <Select
                labelId='brandName'
                id='brandName'
                label='brandName'
                value={incoming?.brandName[0]}

                //onChange={(e) => handleBrandChange(index, e.target.value)}
              >
                {state.nonPersisted.brand.data?.map((item, index) => (
                  <MenuItem key={index}> {item?.brandName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='demo-simple-select-label'> Currency</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                //value={age}
                label='currency'
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 120, // Adjust the height as needed
                    },
                  },
                }}
                onChange={(e) =>
                  setformData({
                    ...formData,
                    currencyName: e.target.value,
                  })
                }
              >
                {state.nonPersisted.currency.data?.currencyList?.map(
                  (item, index) => (
                    <MenuItem key={index} value={item?.currencyName}>
                      {' '}
                      {item?.currencyName}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Remarks'
              variant='outlined'
              value={incoming ? incoming.remarks : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  remarks: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Entity'
              variant='outlined'
              value={incoming ? incoming.entityName : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  entityName: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: '23px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='IMPA Code'
              variant='outlined'
              value={incoming ? incoming.impaCode : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  impaCode: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Store Number'
              variant='outlined'
              value={incoming ? incoming.storeNo : ''}
              onChange={(e) => {
                setIncoming({
                  ...incoming,
                  storeNo: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              sx={{ width: '90%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
              <InputLabel id='demo-simple-select-label'>Status</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                //value={age}
                value={incoming ? incoming.status : ''}
                label='Repair/service'
                //onChange={handleChange}
                onChange={(e) =>
                  setformData({
                    ...incoming,
                    status: e.target.value,
                  })
                }
              >
                <MenuItem value={'verified'}>Verified</MenuItem>
                <MenuItem value={'verifierRejected'}>Rejected</MenuItem>
              </Select>
            </FormControl>
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
      </Box>
    </>
  );
};

export default UpdateIncomingVerifier;
