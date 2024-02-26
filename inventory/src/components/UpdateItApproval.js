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
  TextareaAutosize,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fetchInventory } from '../redux/slice/InventorySlice';
import { fetchIncome } from '../redux/slice/SingleIncomeSlice';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
const UpdateItApproval = () => {
  const [formData, setformData] = useState({
    locationName: '',
    transferDate: '',
    destination: '',

    SubLocation: [],
    description: [],
    sn: [],
    partNumber: [],
    purchase: [],
    quantity: [],
    remarks: [],
  });
  const dispatch = useDispatch();
  const [subLocations, setSubLocations] = useState([]);
  const [description, setDescription] = useState([]);
  const [internal, setInternal] = useState([]);
  const [sn, setSn] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const state = useSelector((state) => state);
  const [formControls, setFormControls] = useState([{ key: 0 }]);
  const [item, setItem] = useState([]);
  const [formRows, setFormRows] = useState(1);

  const { currentUser } = state.persisted.user;
  const [selectedSubLocations, setSelectedSubLocations] = useState([]);

  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
    dispatch(fetchInventory(currentUser.accessToken));
    dispatch(fetchIncome(currentUser.accessToken));
  }, []);
  console.log(state);

  const handleClick = (e) => {
    e.preventDefault();
    const update = {
      internal,
    };
    console.log(update);

    fetch(`http://localhost:8080/internaltransfer/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        console.log('Internal Transfer Updated');
        // navigate('/consignee');
      })
      .catch((error) => {
        console.error('Error updating consignee:', error);
      });
  };
  let navigate = useNavigate();

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    console.log(currentUser.accessToken, 'heyyyy');
    fetch(`http://localhost:8080/internaltransfer/get/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setInternal(result);
      });
  }, []);

  console.log(formData);
  const handleDateChange = (transferDate) => {
    setformData({
      ...formData,
      transferDate: transferDate.format('YYYY-MM-DD'),
    });
  };

  const renderFormControls = () => {
    return formControls.map((control, index) => (
      <div key={control.key} style={{ display: 'flex', marginBottom: '10px' }}>
        <Grid item xs={12} sm={6} sx={{ minWidth: '200px' }}>
          <InputLabel htmlFor='outlined-basic'>SubLocation</InputLabel>
          <TextField
            id='outlined-basic'
            // label={<InputLabel sx={{ width: '120px' }}>SubLocation</InputLabel>}
            variant='outlined'
            value={internal ? internal.SubLocation : ''}
            sx={{ width: '100%' }}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setInternal({
                ...internal,
                SubLocation: e.target.value,
              });
              setformData(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>Item Description</InputLabel>
          <TextField
            id='outlined-basic'
            variant='outlined'
            value={internal ? internal.description : ''}
            sx={{ width: '100px', marginRight: '23px', marginLeft: '23px' }}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setInternal({
                ...internal,
                idescription: e.target.value,
              });
              setformData(e.target.value);
            }}
            width={'100%'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>Part No</InputLabel>
          <TextField
            id='outlined-basic'
            variant='outlined'
            value={internal ? internal.partNumber : ''}
            sx={{ width: '100px', marginRight: '23px' }}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setInternal({
                ...internal,
                partNumber: e.target.value,
              });
              setformData(e.target.value);
            }}
            width={'100%'}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>S/N</InputLabel>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            variant='outlined'
            //   value={partNumbersData[index]?.sn || ''}
            InputProps={{ readOnly: true }}
            value={internal ? internal.sn : ''}
            onChange={(e) => {
              setInternal({
                ...internal,
                sn: e.target.value,
              });
              setformData(e.target.value);
            }}
            //   onChange={(e) => handleSnChange(index, e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>
            Purchase Order(D.O.P)
          </InputLabel>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            variant='outlined'
            //   value={partNumbersData[index]?.date || ''}
            // onChange={(e) => setLocation(e.target.value)}
            //   onChange={(e) => handlePurchaseChange(index, e.target.value)}
            value={internal ? internal.purchase : ''}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setInternal({
                ...internal,
                purchase: e.target.value,
              });
              setformData(e.target.value);
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>Quantity</InputLabel>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            variant='outlined'
            // value={locationName}
            // onChange={(e) => setLocation(e.target.value)}
            //   onChange={(e) => handleQuantityChange(index, e.target.value)}
            value={internal ? internal.quantity : ''}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setInternal({
                ...internal,
                quantity: e.target.value,
              });
              setformData(e.target.value);
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextareaAutosize
            sx={{ width: '90%' }}
            aria-label='Brand'
            placeholder='Enter Remarks'
            // value={brandValue} // You can set the value and handle changes as needed
            // onChange={(e) => handleBrandChange(e.target.value)}
            //   onChange={(e) => handleRemarksChange(index, e.target.value)}
            minRows={4} // You can adjust the number of rows as needed
            value={internal ? internal.remarks : ''}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setInternal({
                ...internal,
                remarks: e.target.value,
              });
              setformData(e.target.value);
            }}
          />
        </Grid>
      </div>
    ));
  };
  console.log(state, 'statesss');
  return (
    <>
      <Grid>
        <Card
          color='secondary'
          sx={{
            width: '100%',
            backgroundColor: 'secondary',
            borderBottom: '2px solid yellow',
            mb: '33px',
          }}
        >
          <CardContent>
            <Typography
              variant='h4'
              color='secondary'
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              Update Internal Transfer
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>Location/Vessel</InputLabel>
          <TextField
            id='outlined-basic'
            variant='outlined'
            value={internal ? internal.locationName : ''}
            sx={{ width: '570px' }}
            onChange={(e) => {
              setformData({
                ...internal,
                locationName: e.target.value,
              });
              setInternal(e.target.value);
            }}
            width={'50%'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>Date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={internal?.transferDate ? dayjs(internal?.date) : null}
              /* value={
            formData.purchaseDate ? dayjs(formData.purchaseDate) : null
          } */
              //   value={cipl ? cipl.date : ''}
              onChange={(date) => handleDateChange(date)}
              fullWidth
              sx={{ width: '90%' }}
              /* format="yyyy-MM-dd" */
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '33px' }}>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>
            Destination SubLocation
          </InputLabel>
          <TextField
            id='outlined-basic'
            variant='outlined'
            value={internal ? internal.destination : ''}
            sx={{ width: '590px' }}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setInternal({
                ...internal,
                destination: e.target.value,
              });
              setformData(e.target.value);
            }}
            width={'100%'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%', mt: '23px' }}>
            <InputLabel id='demo-simple-select-label'>Status</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              value={internal ? internal.status : ''}
              InputProps={{ readOnly: true }}
              label='Repair/service'
              //onChange={handleChange}
              onChange={(e) =>
                setformData({
                  ...internal,
                  status: e.target.value,
                })
              }
            >
              <MenuItem value={'approved'}>Approved</MenuItem>
              <MenuItem value={'rejected'}>Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <div
        sx={{
          marginTop: '5px',

          flexWrap: 'wrap',
          width: '80%',
        }}
      >
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Grid sx={{ overflowX: 'scroll', width: '100%', flexWrap: 'wrap' }}>
              <Card
                color='secondary'
                sx={{
                  width: '111%',
                  marginTop: '20px',
                  backgroundColor: 'secondary',
                }}
              >
                <CardContent
                  sx={{ minWidth: '100%', display: 'flex', flexWrap: 'wrap' }}
                >
                  {renderFormControls()}
                </CardContent>
              </Card>
            </Grid>
          </div>
        </>
      </div>
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

export default UpdateItApproval;
