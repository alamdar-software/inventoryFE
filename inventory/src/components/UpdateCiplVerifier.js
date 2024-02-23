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
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchConsignee } from '../redux/slice/ConsigneeSlice';
import { fetchItem } from '../redux/slice/ItemSlice';
import { fetchlocation } from '../redux/slice/location';
import { fetchShipper } from '../redux/slice/ShipperSlice';
import { fetchCurrency } from '../redux/slice/CurrencySlice';
import { fetchPickup } from '../redux/slice/PickUpSlice';

const UpdateCiplVerifier = () => {
  const [formData, setformData] = useState({
    itemName: '',
    repairService: '',
    transferDate: '',
    shipperName: '',
    consigneeName: '',
    locationName: '',
    pickupAddress: '',
    currencyName: '',
    status: '',
    SubLocations: [],
    item: [],
    hs: [],
    cor: [],
    dimension: [],
    weights: [],
    sn: [],
    purchase: [],
    unitPrice: [],
    quantity: [],
    amount: [],
    brand: [],
    remarks: [],
    packageName: [],
    po: '',
    totalWeight: '',
    totalPackage: '',
    totalAmount: '',
    partNo: [],
    date: [],
    currencyRate: '',
  });

  const [cipl, setCipl] = useState();
  const [subLocations, setSubLocations] = useState([]);
  const { currentUser } = useSelector((state) => state.persisted.user);
  const [formControls, setFormControls] = useState([{ key: 0 }]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
    dispatch(fetchConsignee(currentUser.accessToken));
    dispatch(fetchShipper(currentUser.accessToken));
    dispatch(fetchPickup(currentUser.accessToken));
    dispatch(fetchCurrency(currentUser.accessToken));
  }, []);

  const handleDateChange = (date) => {
    setformData({
      ...formData,
      date: date.format('YYYY-MM-DD'),
    });
  };
  let navigate = useNavigate();

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    console.log(currentUser.accessToken, 'heyyyy');
    fetch(`http://localhost:8080/cipl/get/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCipl(result);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const update = {
      cipl,
    };
    console.log(update);

    fetch(`http://localhost:8080/cipl/status/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        console.log('Cipl Updated');
        // navigate('/consignee');
      })
      .catch((error) => {
        console.error('Error updating consignee:', error);
      });
  };
  console.log(formData, 'aaaaaa');
  const renderweightandTotal = () => {
    return (
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={4}>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            label='Total Weight'
            variant='outlined'
            //   value={partNumbersData[index]?.brand || ''}

            // onChange={(e) => setLocation(e.target.value)}
            //   onChange={(e) => handleBrandChange(index, e.target.value)}

            value={cipl ? cipl.totalWeight : ''}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setCipl({
                ...cipl,
                totalWeight: e.target.value,
              });
              setformData(e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            label='Total Package'
            variant='outlined'
            value={cipl ? cipl.totalPackage : ''}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setCipl({
                ...cipl,
                totalPackage: e.target.value,
              });
              setformData(e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            label='Total Amount'
            variant='outlined'
            value={cipl ? cipl.totalAmount : ''}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setCipl({
                ...cipl,
                totalAmount: e.target.value,
              });
              setformData(e.target.value);
            }}
          />
        </Grid>
      </Grid>
    );
  };

  const renderFormControls = () => {
    console.log(formControls, 'yayerfgyu');
    return formControls?.map((control, index) => (
      <div key={control.key} style={{ display: 'flex', marginBottom: '10px' }}>
        {/* <FormControl fullWidth sx={{ width: '90%' }}>
          <InputLabel id='demo-simple-select-label'>Sub Location</InputLabel>

          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={cipl ? cipl.SubLocations : ''}
            label='sublocation'
            onChange={(e) => {
              setCipl({
                ...cipl,
                SubLocations: e.target.value,
              });
              setformData(e.target.value);
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 120, // Adjust the height as needed
                },
              },
            }}
          >
            {subLocations.map((SubLocations, index) => (
              <MenuItem key={index} value={SubLocations?.SubLocations}>
                {SubLocations?.SubLocations}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <Grid item xs={12} sm={6}>
          <TextField
            id='outlined-basic'
            label='SubLocation'
            variant='outlined'
            value={cipl ? cipl.SubLocations : ''}
            sx={{ width: '100px', marginRight: '23px' }}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setCipl({
                ...cipl,
                SubLocations: e.target.value,
              });
              setformData(e.target.value);
            }}
            width={'100%'}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%', marginRight: '100px' }}>
            <InputLabel id='demo-simple-select-label'>
              Item Description
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='description'
              value={cipl ? cipl.description : ''}
              label='description'
              onChange={(e) => {
                setCipl({
                  ...cipl,
                  description: e.target.value,
                });
                setformData(e.target.value);
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120, // Adjust the height as needed
                  },
                },
              }}
              //onChange={handleChange}
            >
              {state.nonPersisted.item.data?.map((item, index) => (
                <MenuItem key={index} value={item?.description}>
                  {' '}
                  {item?.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <TextField
            id='outlined-basic'
            label='Item Description'
            variant='outlined'
            value={cipl ? cipl.item : ''}
            sx={{ width: '100px', marginRight: '23px' }}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setCipl({
                ...cipl,
                item: e.target.value,
              });
              setformData(e.target.value);
            }}
            width={'100%'}
          />
        </Grid>
        <FormControl fullWidth sx={{ width: '70%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '100%' }}
              id='outlined-basic'
              label='Package Name'
              variant='outlined'
              value={cipl ? cipl.packageName : ''}
              InputProps={{ readOnly: true }}
              // value={locationName}
              onChange={(e) => {
                setCipl({
                  ...cipl,
                  packageName: e.target.value,
                });
                setformData(e.target.value);
              }}
              //   onChange={(e) => handlePackageChange(index, e.target.value)}
              fullWidth
              //   sx={{ width: '90%' }}
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '30%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Hs'
              variant='outlined'
              value={cipl ? cipl.hs : ''}
              InputProps={{ readOnly: true }}
              // value={sn}
              //   onChange={(e) => handleHsChange(index, e.target.value)}
              onChange={(e) => {
                setCipl({
                  ...cipl,
                  hs: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='Country Of Origin'
              label='Country Of Origin'
              variant='outlined'
              value={cipl ? cipl.cor : ''}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setCipl({
                  ...cipl,
                  cor: e.target.value,
                });
                setformData(e.target.value);
              }}
              //   onChange={(e) =>
              //     handleCountryOfOriginChange(index, e.target.value)
              //   }
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Dimension(CM)'
              variant='outlined'
              value={cipl ? cipl.dimension : ''}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setCipl({
                  ...cipl,
                  dimension: e.target.value,
                });
                setformData(e.target.value);
              }}
              //   onChange={(e) => handleDimensionChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '40%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Weights(Kg)'
              variant='outlined'
              value={cipl ? cipl.weights : ''}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setCipl({
                  ...cipl,
                  weights: e.target.value,
                });
                setformData(e.target.value);
              }}
              //   onChange={(e) => handleWeightsChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>

        <Grid item xs={12} sm={6}>
          <TextField
            id='outlined-basic'
            label='Part No'
            variant='outlined'
            value={cipl ? cipl.partNo : ''}
            sx={{ width: '100px', marginRight: '23px' }}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setCipl({
                ...cipl,
                partNo: e.target.value,
              });
              setformData(e.target.value);
            }}
            width={'100%'}
          />
        </Grid>
        <FormControl fullWidth sx={{ width: '30%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='S/N'
              variant='outlined'
              //   value={partNumbersData[index]?.sn || ''}
              InputProps={{ readOnly: true }}
              value={cipl ? cipl.sn : ''}
              onChange={(e) => {
                setCipl({
                  ...cipl,
                  sn: e.target.value,
                });
                setformData(e.target.value);
              }}
              //   onChange={(e) => handleSnChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '90%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Purchase Order(D.O.P)'
              variant='outlined'
              //   value={partNumbersData[index]?.date || ''}
              // onChange={(e) => setLocation(e.target.value)}
              //   onChange={(e) => handlePurchaseChange(index, e.target.value)}
              value={cipl ? cipl.purchase : ''}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setCipl({
                  ...cipl,
                  purchase: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '60%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Unit Price'
              variant='outlined'
              //   value={partNumbersData[index]?.unitPrice || ''}
              value={cipl ? cipl.unitPrice : ''}
              //   onChange={(e) => handleUnitPriceChange(index, e.target.value)}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setCipl({
                  ...cipl,
                  unitPrice: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Quantity'
              variant='outlined'
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              //   onChange={(e) => handleQuantityChange(index, e.target.value)}
              value={cipl ? cipl.quantity : ''}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setCipl({
                  ...cipl,
                  quantity: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '80%' }}
              id='outlined-basic'
              label='Amount'
              variant='outlined'
              //   value={formData.amount[index] || ''}
              // value={locationName}
              // onChange={(e) => setLocation(e.target.value)}
              /* onChange={(e) => handleAmountChange(index, e.target.value)} */
              value={cipl ? cipl.amount : ''}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setCipl({
                  ...cipl,
                  amount: e.target.value,
                });
                setformData(e.target.value);
              }}
              fullWidth
              readOnly
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Brand'
              variant='outlined'
              //   value={partNumbersData[index]?.brand || ''}

              // onChange={(e) => setLocation(e.target.value)}
              //   onChange={(e) => handleBrandChange(index, e.target.value)}

              value={cipl ? cipl.brand : ''}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setCipl({
                  ...cipl,
                  brand: e.target.value,
                });
                setformData(e.target.value);
              }}
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '50%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextareaAutosize
              sx={{ width: '90%' }}
              aria-label='Brand'
              placeholder='Enter Remarks'
              // value={brandValue} // You can set the value and handle changes as needed
              // onChange={(e) => handleBrandChange(e.target.value)}
              //   onChange={(e) => handleRemarksChange(index, e.target.value)}
              minRows={4} // You can adjust the number of rows as needed
              value={cipl ? cipl.remarks : ''}
              InputProps={{ readOnly: true }}
              onChange={(e) => {
                setCipl({
                  ...cipl,
                  remarks: e.target.value,
                });
                setformData(e.target.value);
              }}
            />
          </Grid>
        </FormControl>

        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '60px',
          }}
        >
          <button>
            <AddIcon onClick={handleAddClick} />
          </button>
          <Button onClick={() => handleDeleteClick(index)}>
            <DeleteIcon style={{ color: 'red' }} />
          </Button>
        </div> */}

        {/* Repeat similar blocks for other form controls */}
      </div>
    ));
  };

  return (
    <>
      <Grid>
        <Card
          color='secondary'
          sx={{
            width: '100%',
            // background:
            //   'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)',

            borderBottom: '2px solid #ab47bc',
            marginBottom: '23px',
          }}
        >
          <CardContent>
            <Typography variant='h4' color='secondary' gutterBottom>
              Update Cipl
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Location</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              //   value={formData.locationName || ''}
              value={cipl ? cipl.locationName : ''}
              label='location'
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120, // Adjust the height as needed
                  },
                },
              }}
              //   onChange={handleLocationChange}
              //onChange={handleChange}
            >
              {state.nonPersisted.location.data?.map((item, index) => (
                <MenuItem key={index} value={item?.locationName}>
                  {' '}
                  {item?.locationName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Shipper</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              label='shipper'
              value={cipl ? cipl.shipperName : ''}
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
                  shipperName: e.target.value,
                })
              }
              //onChange={handleChange}
            >
              {state.nonPersisted.shipper.data?.map((item, index) => (
                <MenuItem key={index} value={item?.shipperName}>
                  {' '}
                  {item?.shipperName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}

        <Grid item xs={12} sm={6}>
          <TextField
            id='outlined-basic'
            label='Shipper'
            variant='outlined'
            value={cipl ? cipl.shipperName : ''}
            sx={{ width: '590px' }}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setCipl({
                ...cipl,
                shipperName: e.target.value,
              });
              setformData(e.target.value);
            }}
            // width={'100%'}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={cipl?.transferDate ? dayjs(cipl?.date) : null}
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
        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Consignee</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              label='consignee'
              //   value={cipl ? cipl.consigneeName : ''}
              value={cipl ? cipl.consigneeName : ''}
              //onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // Adjust the height as needed
                  },
                },
              }}
              onChange={(e) =>
                setformData({
                  ...formData,
                  consigneeName: e.target.value,
                })
              }
            >
              {state.nonPersisted.consignee.data?.map((item, index) => (
                <MenuItem key={index} value={item?.consigneeName}>
                  {' '}
                  {item?.consigneeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <TextField
            id='outlined-basic'
            label='Consignee'
            variant='outlined'
            value={cipl ? cipl.consigneeName : ''}
            sx={{ width: '590px' }}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setCipl({
                ...cipl,
                consigneeName: e.target.value,
              });
              setformData(e.target.value);
            }}
            // width={'100%'}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Pickup Address
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              value={cipl ? cipl.pickupAddress : ''}
              //   value={cipl ? cipl.pickupAddress : ''}
              label='pickupAddress'
              //onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 150, // Adjust the height as needed
                  },
                },
              }}
              onChange={(e) =>
                setformData({
                  ...cipl,
                  pickupAddress: e.target.value,
                })
              }
            >
              {state.nonPersisted.pickup.data?.map((item, index) => (
                <MenuItem key={index} value={item?.pickupAddress}>
                  {' '}
                  {item?.pickupAddress}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <TextField
            id='outlined-basic'
            label='Pickup Address'
            variant='outlined'
            value={cipl ? cipl.pickupAddress : ''}
            sx={{ width: '590px' }}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setCipl({
                ...cipl,
                pickupAddress: e.target.value,
              });
              setformData(e.target.value);
            }}
            // width={'100%'}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Select Currency
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              value={cipl ? cipl.currencyName : ''}
              label='selectCurrency'
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
              //onChange={handleChange}
            >
              {state.nonPersisted.currency.data?.currencyList.map(
                (item, index) => (
                  <MenuItem key={index} value={item?.currencyName}>
                    {' '}
                    {item?.currencyName}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid> */}

        <Grid item xs={12} sm={6}>
          <TextField
            id='outlined-basic'
            label='Pickup Address'
            variant='outlined'
            value={cipl ? cipl.currencyName : ''}
            sx={{ width: '590px' }}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setCipl({
                ...cipl,
                currencyName: e.target.value,
              });
              setformData(e.target.value);
            }}
            // width={'100%'}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            label='Currency Rate'
            variant='outlined'
            value={cipl ? cipl.currencyRate : ''}
            // onChange={(e) => setLocation(e.target.value)}
            onChange={(e) =>
              setformData({
                ...formData,
                currencyRate: e.target.value,
              })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Repair/Service
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              value={formData.repairService || ''}
              label='Repair/service'
              //onChange={handleChange}
              onChange={(e) =>
                setformData({
                  ...formData,
                  repairService: e.target.value,
                })
              }
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Status</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              value={cipl ? cipl.status : ''}
             
              label='Repair/service'
              //onChange={handleChange}
              onChange={(e) =>
                setformData({
                  ...cipl,
                  status: e.target.value,
                })
              }
           
            >
              <MenuItem value={'verified'}>Verified</MenuItem>
              <MenuItem value={'rejected'}>Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Grid sx={{ overflowX: 'scroll', width: '100%', flexWrap: 'wrap' }}>
          <Card
            color='secondary'
            sx={{
              width: '180%',
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
        {renderweightandTotal()}
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

export default UpdateCiplVerifier;
