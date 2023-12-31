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
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchlocation } from '../redux/slice/location';
import { fetchItem } from '../redux/slice/ItemSlice';
import { fetchCurrency } from '../redux/slice/CurrencySlice';
import { fetchBrand } from '../redux/slice/BrandSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fetchUom } from '../redux/slice/UomSlice';

const BulkIncome = () => {
  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchItem());
    dispatch(fetchCurrency());
    dispatch(fetchBrand());
    dispatch(fetchUom());
  }, []);
  const state = useSelector((state) => state);
  const [subLocations, setSubLocations] = useState([]);
  const [locationName, setLocationName] = useState();
  // const [purchaseOrder, setPurchaseOrder] = useState();
  const [item, setItem] = useState([]);
  const dispatch = useDispatch();
  const [formControls, setFormControls] = useState([]);
  const [unitCost, setUnitCost] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [name, setName] = useState([]);
  const [brandName, setBrandName] = useState([]);
  const [price, setPrice] = useState([]);
  const [unitName, setUnitName] = useState([]);
  const [standardPrice, setStandardPrice] = useState([]);
  const [extendedValue, setExtendedValue] = useState([]);
  const [sn, setSn] = useState([]);
  const [pn, setPn] = useState([]);
  const [entityName, setEntityName] = useState([]);
  const [store, setStore] = useState([]);
  const [impaode, setImpaCode] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setformData] = useState({
    locationName: '',
    address: '',
    description: '',
    purchaseOrder: '',
    remarks: '',
    date: '',
    unitCost: [],
    name: [],
    quantity: [],
    //item: [],
    description: [],
    brandName: [],
    price: [],
    unitName: [],
    standardPrice: [],
    extendedValue: [],
    sn: [],
    pn: [],
    entityName: [],
    storeNo: [],
    impaCode: [],
  });

  const handleDateChange = (date) => {
    setformData({
      ...formData,
      date: date.format('YYYY-MM-DD'),
    });
  };
  console.log(formData);

  const handleUnitCostChange = (index, value) => {
    updateFormDataUnitCost(index, value);
    setUnitCost((prevunitCost) => {
      const updateUnitCost = [...prevunitCost];
      updateUnitCost[index] = value;
      return updateUnitCost;
    });
  };
  const handleClick = (e) => {
    e.preventDefault();

    // const formData = {
    //   locationName,
    // };

    console.log(formData);

    fetch('http://localhost:8080/bulkstock/add', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => {
      console.log('Bulk Added');
      //window.location.reload();
    });
  };

  const updateFormDataUnitCost = (index, value) => {
    setformData((prevFormData) => {
      const updateUnitCost = [...prevFormData.unitCost];
      updateUnitCost[index] = value;
      return {
        ...prevFormData,
        unitCost: updateUnitCost,
      };
    });
  };
  const handleBrandChange = (index, value) => {
    updateFormDataBrand(index, value);
    setBrandName((prevBrand) => {
      const updateBrand = [...prevBrand];
      updateBrand[index] = value;
      return updateBrand;
    });
  };
  console.log(item, 'item');
  console.log(formData);

  const updateFormDataBrand = (index, value) => {
    setformData((prevFormData) => {
      const updateBrand = [...prevFormData.brandName];
      updateBrand[index] = value;
      return {
        ...prevFormData,
        brandName: updateBrand,
      };
    });
  };

  console.log(state, 'formstate');
  const [isItemSelected, setIsItemSelected] = useState(false);

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setformData({
      ...formData,
      locationName: selectedLocation,
      address: [], // Reset sublocation when location changes
    });
    const selectedLocationObj = state.location.data.find(
      (location) => location.locationName === selectedLocation
    );
    setSubLocations(selectedLocationObj ? selectedLocationObj.addresses : []);
  };

  const handleItemChange = (e) => {
    const selectedDescriptions = e.target.value;

    if (selectedDescriptions) {
      const selectedItemsInfo = selectedDescriptions.map((description) => {
        const selectedItem = state.item.data.find(
          (item) => item.description === description
        );
        console.log(
          `Selected Item for Description "${description}":`,
          selectedItem
        );
        return {
          description: description,
          unitName: selectedItem ? selectedItem.unitName : '',
        };
      });

      setFormControls((prevControls) => [
        ...prevControls,
        ...selectedItemsInfo
          .filter(
            (itemInfo) =>
              !prevControls.some(
                (control) => control.description === itemInfo.description
              )
          )
          .map((itemInfo, index) => ({
            key: prevControls.length + index,
            description: itemInfo.description,

            unitName: itemInfo.unitName,
          })),
      ]);

      setformData((prevFormData) => {
        const uniqueDescriptions = new Set([
          ...prevFormData.description,
          ...selectedDescriptions,
        ]);

        const uniqueUnits = selectedItemsInfo.map(
          (itemInfo) => itemInfo.unitName
        );

        return {
          ...prevFormData,
          description: Array.from(uniqueDescriptions),
          unitName: uniqueUnits, // Assign the array directly
        };
      });

      setIsItemSelected(true);
    }
  };

  const handleDescriptionChange = (index, value) => {
    setFormControls((prevControls) => {
      const updatedControls = [...prevControls];
      updatedControls[index] = {
        ...updatedControls[index],
        description: value,
      };
      return updatedControls;
    });

    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = value;
      return updatedSelectedItems;
    });
  };
  console.log(selectedItems, 'aaaa');
  console.log(formData);
  // const handleItemChange = (e) => {
  //   const selectedItem = e.target.value;
  //   setformData({
  //     ...formData,
  //     description: selectedItem,
  //     // Reset sublocation when location changes
  //   });
  //   const selectedDescriptionObj = state.item.data.find(
  //     (item) => item.description === selectedItem
  //   );
  //   setItems(
  //     selectedDescriptionObj ? selectedDescriptionObj?.descriptions : []
  //   );
  // };
  // console.log(subLocations, 'itemmmm');
  // const handleItemChange = (index, value) => {

  const handleCatagoryChange = (index, value) => {
    updateFormDataCatagory(index, value);
    setName((prevCatagory) => {
      const updateCatagory = [...prevCatagory];
      updateCatagory[index] = value;
      return updateCatagory;
    });
  };

  const updateFormDataCatagory = (index, value) => {
    setformData((prevFormData) => {
      const updateCatagory = [...prevFormData.name];
      updateCatagory[index] = value;
      return {
        ...prevFormData,
        name: updateCatagory,
      };
    });
  };
  const handleQuantityChange = (index, value) => {
    updateFormDataQuantity(index, value);
    setQuantity((prevQuantity) => {
      const updateQuantity = [...prevQuantity];
      updateQuantity[index] = value;
      return updateQuantity;
    });
  };

  const updateFormDataQuantity = (index, value) => {
    setformData((prevFormData) => {
      const updateQuantity = [...prevFormData.quantity];
      updateQuantity[index] = value;
      return {
        ...prevFormData,
        quantity: updateQuantity,
      };
    });
  };

  const handleTotalPriceChange = (index, value) => {
    updateFormDataTotalPrice(index, value);
    setPrice((prevPrice) => {
      const updateTotalPrice = [...prevPrice];
      updateTotalPrice[index] = value;
      return updateTotalPrice;
    });
  };

  const updateFormDataTotalPrice = (index, value) => {
    setformData((prevFormData) => {
      const updateTotalPrice = [...prevFormData.price];
      updateTotalPrice[index] = value;
      return {
        ...prevFormData,
        price: updateTotalPrice,
      };
    });
  };

  const handleUomChange = (index, value) => {
    updateFormDataUom(index, value);
    setUnitName((prevUom) => {
      const updateUom = [...prevUom];
      updateUom[index] = value;
      return updateUom;
    });
  };

  const updateFormDataUom = (index, value) => {
    setformData((prevFormData) => {
      const updateUom = [...prevFormData.unitName];
      updateUom[index] = value;
      return {
        ...prevFormData,
        unitName: updateUom,
      };
    });
  };
  console.log(state, 'uom');
  const handleStandardPriceChange = (index, value) => {
    updateFormDataStandardPrice(index, value);
    setStandardPrice((prevStandardPrice) => {
      const updateStandardPrice = [...prevStandardPrice];
      updateStandardPrice[index] = value;
      return updateStandardPrice;
    });
  };

  const updateFormDataStandardPrice = (index, value) => {
    setformData((prevFormData) => {
      const updateStandardPrice = [...prevFormData.standardPrice];
      updateStandardPrice[index] = value;
      return {
        ...prevFormData,
        standardPrice: updateStandardPrice,
      };
    });
  };

  const handleExtendedValueChange = (index, value) => {
    updateFormDataExtendedValue(index, value);
    setExtendedValue((prevExtendedValue) => {
      const updateExtendedValue = [...prevExtendedValue];
      updateExtendedValue[index] = value;
      return updateExtendedValue;
    });
  };

  const updateFormDataExtendedValue = (index, value) => {
    setformData((prevFormData) => {
      const updateExtendedValue = [...prevFormData.extendedValue];
      updateExtendedValue[index] = value;
      return {
        ...prevFormData,
        extendedValue: updateExtendedValue,
      };
    });
  };

  const handleSnChange = (index, value) => {
    updateFormDataSn(index, value);
    setSn((prevSn) => {
      const updateSn = [...prevSn];
      updateSn[index] = value;
      return updateSn;
    });
  };

  const updateFormDataSn = (index, value) => {
    setformData((prevFormData) => {
      const updateSn = [...prevFormData.sn];
      updateSn[index] = value;
      return {
        ...prevFormData,
        sn: updateSn,
      };
    });
  };
  const handlePnChange = (index, value) => {
    updateFormDataPn(index, value);
    setPn((prevPn) => {
      const updatePn = [...prevPn];
      updatePn[index] = value;
      return updatePn;
    });
  };

  const updateFormDataPn = (index, value) => {
    setformData((prevFormData) => {
      const updatePn = [...prevFormData.pn];
      updatePn[index] = value;
      return {
        ...prevFormData,
        pn: updatePn,
      };
    });
  };

  const handleEntityChange = (index, value) => {
    updateFormDataEntity(index, value);
    setEntityName((prevEntity) => {
      const updateEntity = [...prevEntity];
      updateEntity[index] = value;
      return updateEntity;
    });
  };

  const updateFormDataEntity = (index, value) => {
    setformData((prevFormData) => {
      const updateEntity = [...prevFormData.entityName];
      updateEntity[index] = value;
      return {
        ...prevFormData,
        entityName: updateEntity,
      };
    });
  };
  const handleStoreChange = (index, value) => {
    updateFormDataStore(index, value);
    setStore((prevStore) => {
      const updateStore = [...prevStore];
      updateStore[index] = value;
      return updateStore;
    });
  };

  const updateFormDataStore = (index, value) => {
    setformData((prevFormData) => {
      const updateStore = [...prevFormData.storeNo];
      updateStore[index] = value;
      return {
        ...prevFormData,
        storeNo: updateStore,
      };
    });
  };
  const handleImpaChange = (index, value) => {
    updateFormDataImpa(index, value);
    setImpaCode((prevImpa) => {
      const updateImpa = [...prevImpa];
      updateImpa[index] = value;
      return updateImpa;
    });
  };

  const updateFormDataImpa = (index, value) => {
    setformData((prevFormData) => {
      const updateImpa = [...prevFormData.impaCode];
      updateImpa[index] = value;
      return {
        ...prevFormData,
        impaCode: updateImpa,
      };
    });
  };

  const handleDeleteClick = (index) => {
    // Create a copy of the formControls array and remove the item at the specified index
    const updatedFormControls = [...formControls];
    updatedFormControls.splice(index, 1);

    // Create a copy of the formData object and remove the corresponding item values
    const updatedFormData = { ...formData };
    Object.keys(updatedFormData).forEach((key) => {
      if (Array.isArray(updatedFormData[key])) {
        updatedFormData[key].splice(index, 1);
      }
    });

    // Update the state with the new formControls and formData
    setFormControls(updatedFormControls);
    setformData(updatedFormData);

    // Log the updated formData to the console
    console.log(updatedFormData);
  };
  const renderFormControls = () => {
    return formControls.map((control, index) => (
      <div
        key={control.key}
        fullWidth
        style={{ display: 'flex', marginBottom: '10px' }}
      >
        <FormControl fullWidth sx={{ width: '90%', marginRight: '10px' }}>
          <TextField
            id='outlined-basic'
            label='Item description'
            variant='outlined'
            fullWidth
            sx={{ width: '100%' }}
            value={control.description}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ width: '90%', marginRight: '10px' }}>
          <TextField
            id='outlined-basic'
            label='Catagory'
            variant='outlined'
            fullWidth
            sx={{ width: '100%' }}
            // value={formData.name}
            onChange={(e) => handleCatagoryChange(index, e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ width: '100%' }}>
          <InputLabel id='brandName'>brandName</InputLabel>
          <Select
            labelId='brandName'
            id='brandName'
            //value={age}
            label='brandName'
            // onChange={(e) =>
            //   setformData({
            //     ...formData,
            //     brandName: e.target.value,
            //   })
            // }
            onChange={(e) => handleBrandChange(index, e.target.value)}

            //onChange={handleChange}
          >
            {state.brand.data?.map((item, index) => (
              <MenuItem key={index} value={item?.brandName}>
                {' '}
                {item?.brandName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ width: '90%', marginLeft: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-basic'
              label='Unit Cost'
              variant='outlined'
              type='number'
              fullWidth
              sx={{ width: '90%' }}
              /*   onChange={(e) =>
              setformData({
                ...formData,
                unitCost: e.target.value,
              })
            } */
              onChange={(e) => handleUnitCostChange(index, e.target.value)}
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '90%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Quantity'
              variant='outlined'
              type='number'
              // value={locationName}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '90%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Total Price'
              variant='outlined'
              type='number'
              // value={locationName}
              onChange={(e) => handleTotalPriceChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        {/* <FormControl fullWidth sx={{ width: '70%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <Select
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Uom'
              variant='outlined'
              // value={locationName}
              onChange={(e) => handleUomChange(index, e.target.value)}
              fullWidth
            />
            {state.uom?.data.content?.map((item, index) => (
              <MenuItem key={index} value={item?.unitName}>
                {' '}
                {item?.unitName}
              </MenuItem>
            ))}
          </Grid>
        </FormControl> */}
        {/* <FormControl fullWidth sx={{ width: '70%', marginRight: '10px' }}>
          <InputLabel id='unitName'>UOM</InputLabel>
          <Select
            labelId='unitName'
            id='unitName'
            //value={age}
            label='unitName'
            // onChange={(e) =>
            //   setformData({
            //     ...formData,
            //     brandName: e.target.value,
            //   })
            // }
            onChange={(e) => handleUomChange(index, e.target.value)}
            //onChange={handleChange}
          >
            {state.Uom?.data.content?.map((item, index) => (
              <MenuItem key={index} value={item?.unitName}>
                {' '}
                {item?.unitName}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <FormControl fullWidth sx={{ width: '70%', marginRight: '10px' }}>
          <Grid item xs={21} sm={6}>
            <TextField
              id='outlined-basic'
              label='Unit of Measure'
              variant='outlined'
              fullWidth
              sx={{ width: '90%' }}
              InputProps={{
                readOnly: true,
              }}
              value={control.unitName || ''}
              // onChange={(e) =>
              //   setformData({
              //     ...formData,
              //     unitName: e.target.value,
              //   })
              // }
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '90%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Standard Price'
              variant='outlined'
              type='number'
              // value={locationName}
              onChange={(e) => handleStandardPriceChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '100%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Extended Value'
              variant='outlined'
              type='number'
              // value={locationName}
              onChange={(e) => handleExtendedValueChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>

        <FormControl fullWidth sx={{ width: '70%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='S/N'
              variant='outlined'
              // value={sn}
              onChange={(e) => handleSnChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '70%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='P/N'
              variant='outlined'
              // value={sn}
              onChange={(e) => handlePnChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '90%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Entity'
              variant='outlined'
              onChange={(e) => handleEntityChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '90%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='Store No'
              variant='outlined'
              // value={sn}
              onChange={(e) => handleStoreChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <FormControl fullWidth sx={{ width: '90%', marginRight: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: '90%' }}
              id='outlined-basic'
              label='IMPA Code'
              variant='outlined'
              // value={sn}
              onChange={(e) => handleImpaChange(index, e.target.value)}
              fullWidth
            />
          </Grid>
        </FormControl>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button>
            <DeleteIcon
              onClick={() => handleDeleteClick(index)}
              style={{ color: 'red' }}
            />
          </Button>
        </div>
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
            backgroundColor: 'secondary',
            borderBottom: '2px solid yellow',
          }}
        >
          <CardContent>
            <Typography variant='h4' color='secondary' gutterBottom>
              Bulk Incoming Stock
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '33px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Location</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='location'
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 120,
                  },
                },
              }}
              onChange={handleLocationChange}
              //onChange={handleChange}
            >
              {state.location.data?.map((item, index) => (
                <MenuItem key={index} value={item?.locationName}>
                  {' '}
                  {item?.locationName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Sub Location</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              label='sublocation'
              onChange={(e) =>
                setformData({
                  ...formData,
                  address: e.target.value,
                })
              }
              //onChange={handleChange}
            >
              {subLocations.map((address, index) => (
                <MenuItem key={index} value={address?.address}>
                  {address?.address}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '33px' }}>
        <Grid item xs={21} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              Item Description
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              label='Description'
              multiple
              value={formData.description}
              //onChange={handleChange}
              onChange={handleItemChange}
            >
              {state.item.data?.map((item, index) => (
                <MenuItem key={index} value={item?.description}>
                  {' '}
                  {item?.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='purchaseOrder'
            label='Purchase Order'
            variant='outlined'
            fullWidth
            sx={{ width: '90%' }}
            value={formData.purchaseOrder}
            onChange={(e) =>
              setformData({ ...formData, purchaseOrder: e.target.value })
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: '33px' }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>
              {' '}
              Select Currency
            </InputLabel>
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
              //onChange={handleChange}
            >
              {state.currency.data?.currencyList?.map((item, index) => (
                <MenuItem key={index} value={item?.currencyName}>
                  {' '}
                  {item?.currencyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='outlined-basic'
            label='Remarks'
            variant='outlined'
            fullWidth
            sx={{ width: '90%' }}
            onChange={(e) =>
              setformData({ ...formData, remarks: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={formData.date}
              onChange={(newDate) => handleDateChange(newDate)}
              fullWidth
              sx={{ width: '90%' }}
            />
          </LocalizationProvider>
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
      <div
        sx={{
          marginTop: '5px',

          flexWrap: 'wrap',
          width: '80%',
        }}
      >
        {isItemSelected && (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Grid
                sx={{ overflowX: 'scroll', width: '100%', flexWrap: 'wrap' }}
              >
                <Card
                  color='secondary'
                  sx={{
                    width: '211%',
                    marginTop: '20px',
                    backgroundColor: 'secondary',
                  }}
                >
                  <CardContent
                    fullWidth
                    sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}
                  >
                    {renderFormControls()}
                  </CardContent>
                </Card>
              </Grid>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BulkIncome;
