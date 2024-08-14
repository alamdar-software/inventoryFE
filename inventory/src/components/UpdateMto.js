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
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchConsignee } from '../redux/slice/ConsigneeSlice';
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

const UpdateMto = () => {
  const [formData, setformData] = useState({
    locationName: '',
    destinationSubLocation: '',
    transferDate: '',
    consigneeName: '',
    status: '',
    repairService: '',
    SubLocation: [],
    description: [],
    sn: [],
    purchase: [],
    quantity: [],
    remarks: [],
    pn: [],
  });

  const [mto, setMto] = useState([]);
  const [subLocations, setSubLocations] = useState([]);
  const [description, setDescription] = useState([]);

  const state = useSelector((state) => state);
  const [item, setItem] = useState([]);
  const [formRows, setFormRows] = useState(1);
  const [formControls, setFormControls] = useState([{ key: 0 }]);
  const { currentUser } = state.persisted.user;
  const [subLocationss, setsubLocationss] = useState([])
  const [partNumbersData, setPartNumbersData] = useState([]);
  const [selectedPartNo, setselectedPartNo] = useState([]);
  const [partNo, setPartNo] = useState(
    Array.from({ length: formRows }, () => [])
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchConsignee(currentUser.accessToken));
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
    dispatch(fetchInventory(currentUser.accessToken));
    dispatch(fetchIncome(currentUser.accessToken));
  }, []);


  const handleSubLocationChange = (e, index) => {
    const selectedSubLocation = e.target.value || ''; // Ensure a default value if undefined

    setformData({
      ...formData,
      SubLocation:[ e.target.value],
    })


    const selectedInventoryData = state.nonPersisted.inventory.data.filter(
      (inventoryItem) => inventoryItem.address?.address === selectedSubLocation
    );


    // Extract item descriptions from the selected inventory data
    const itemDescriptions = selectedInventoryData.map(
      (inventoryItem) => inventoryItem.description
    );


    // Update the item state with the selected item descriptions
    setItem((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = itemDescriptions; // This line is updated
      return updatedItems;
    });
  };
  // console.log(subLocations);
  // console.log(formData);


  let navigate = useNavigate();

  const { id } = useParams();


  useEffect(() => {

    const selectedLocationObj = state?.nonPersisted?.location?.data?.find(
      (location) => location.locationName === mto?.locationName
    );

    setSubLocations(selectedLocationObj ? selectedLocationObj?.addresses : []);


  }, [mto?.locationName])

  useEffect(() => {

    const selectedInventoryData = state?.nonPersisted?.inventory?.data?.filter(
      (inventoryItem) => inventoryItem?.address?.address == mto?.SubLocation && mto?.SubLocation
    );

    // const itemDescriptions = selectedInventoryData.map(
    //   (inventoryItem) => inventoryItem.description
    // );
    // console.log(itemDescriptions,"hhhhhhhhhhhhhhhhhhhhhhhhhh");
  }, [mto])







  useEffect(() => {
    fetch(`http://localhost:8080/mto/get/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {

        setMto(result);
        setformData({
          locationName: result.locationName || '',
          destinationSubLocation: result.destinationSubLocation || '',
          transferDate: result.transferDate || '',
          consigneeName: result.consigneeName || '',
          status: result.status || '',
          repairService: result.repairService || '',
          SubLocation: result.SubLocation || [],
          description: result.description || [],
          sn: result.sn || [],
          purchase: result.purchase || [],
          quantity: result.quantity || [],
          remarks: result.remarks || [],
          pn: result.pn || [],
        });
      });
  }, [id, currentUser.accessToken]);

  const handleDateChange = (transferDate) => {
    console.log(transferDate.format('YYYY-MM-DD'), "kjkjkjkjkj");
    setformData({
      ...formData,
      transferDate: transferDate?.format('YYYY-MM-DD'),
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/mto/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        alert("updated successfully")

        navigate('/viewMto'); // Adjust navigation as needed
      })
      .catch((error) => {
        console.error('Error updating MTO:', error);
      });
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };
  const handleDescriptionChange = (index, description) => {

    setformData({
      ...formData,
      description: [description],
    })
    // Find the corresponding data in state.singleincome for the selected item
    const selectedIncomeData = state.nonPersisted.singleIncome?.data.filter(
      (incomeItem) => incomeItem.description === description.match(/^[^-(]*/)[0].trim()
    );
    console.log(selectedIncomeData, 'selectttttt');
    console.log(description, 'selected item');

    // Extract part numbers from the selected income data
    const partNumbers = selectedIncomeData.map(
      (incomeItem) => incomeItem.pn || []
    );

    // Update the partNumbers state with the selected part numbers
    setPartNo((prevPartNumbers) => {
      const updatedPartNumbers = [...prevPartNumbers];
      updatedPartNumbers[index] = partNumbers.flat(); // Use flat to flatten the nested arrays
      return updatedPartNumbers;
    });
  };
  const handlePartNoChange = async (
    index,
    selectedSubLocation,
    selectedPartNo
  ) => {
    // ... (your existing code)
    setformData({
      ...formData,
      pn: selectedPartNo,
    })
    // Find the corresponding data in state.singleIncome for the selected part number
    const selectedIncomeData = state.nonPersisted.singleIncome?.data.find(
      (incomeItem) => incomeItem.pn === selectedPartNo
    );

    // Extract the necessary data from the selected income data
    const partNumberData = {
      date: selectedIncomeData?.date || '',
      unitPrice: selectedIncomeData?.unitCost || '',

      sn: selectedIncomeData?.sn || '',
      brand: selectedIncomeData?.brandName || '',
    };
    setformData({
      ...formData,
      sn: partNumberData.sn,
    })
    console.log(partNumberData, "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnb ");

    // Update formData with the selected part number data
    setPartNumbersData((prevPartNumbersData) => {
      const updatedPartNumbersData = [...prevPartNumbersData];
      updatedPartNumbersData[index] = partNumberData;
      return updatedPartNumbersData;
    });
  };


  console.log(formData, "heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  console.log(state, "kiki");

  const renderFormControls = () => {
    return formControls.map((control, index) => (
      <div key={control.key} style={{ display: 'flex', marginBottom: '10px' }}>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>SubLocation</InputLabel>

          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            //value={age}
            value={formData.SubLocation}
            label='sublocation'
            sx={{ width: '90%' }}
            onChange={(e) => handleSubLocationChange(e, index)}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 120,
                  maxWidth: 140 // Adjust the height as needed
                },
              },
            }}

          >
            {subLocations.map((address, index) => (
              <MenuItem key={index} value={address?.address}>
                {address?.address}
              </MenuItem>
            ))}

          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>Item Description</InputLabel>

          <Select
            labelId='demo-simple-select-label'
            id='description'
            sx={{ width: '90%' }}
            label='description'
            value={(formData?.description)}


            onChange={(e) =>
              handleDescriptionChange(
                index,
                // selectedSubLocations[index],
                e.target.value
              )
            }
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 120, // Adjust the height as needed
                },
              },
            }}
          //onChange={handleChange}
          >
            {item[index]?.map((filteredItem, itemIndex) => (
              <MenuItem key={itemIndex} value={filteredItem}>
                {filteredItem}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>Part No</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            //value={age}
            label='location'
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 120, // Adjust the height as needed
                },
              },
            }}
            onChange={(e) =>
              handlePartNoChange(index, selectedPartNo[index], e.target.value)
            }
          //onChange={handleChange}
          >
            {partNo[index]?.map((partNo, partIndex) => (
              <MenuItem key={partIndex} value={partNo}>
                {partNo}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'> S/N</InputLabel>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            variant='outlined'
            //   value={partNumbersData[index]?.sn || ''}
            InputProps={{ readOnly: true }}
            value={mto ? mto.sn : ''}
            onChange={(e) => {
              setMto({
                ...mto,
                sn: e.target.value,
              });
              setformData(e.target.value);
            }}

            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>
            {' '}
            Purchase Order(D.O.P)
          </InputLabel>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            variant='outlined'

            value={formData.transferDate}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setMto({
                ...mto,
                purchase: e.target.value,
              });
              setformData(e.target.value);
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'> Quantity</InputLabel>
          <TextField
            sx={{ width: '90%' }}
            id='outlined-basic'
            variant='outlined'

            value={formData.quantity}
            // InputProps={{ readOnly: true }}
            onChange={(e) =>
              setformData({
                ...formData,
                quantity: e.target.value,
              })
            }
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextareaAutosize
            sx={{ width: '90%' }}
            aria-label='Brand'
            placeholder='Enter Remarks'

            minRows={4} // You can adjust the number of rows as needed
            value={mto ? mto.remarks : ''}
            InputProps={{ readOnly: true }}
            onChange={(e) => {
              setMto({
                ...mto,
                remarks: e.target.value,
              });
              setformData(e.target.value);
            }}
          />
        </Grid>


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
              Update Mto
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
            value={mto ? mto.locationName : ''}
            sx={{ width: '490px' }}
            onChange={(e) => {
              setformData({
                ...mto,
                locationName: e.target.value,
              });
              setMto(e.target.value);
            }}
            width={'50%'}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>
            Destination SubLocation
          </InputLabel>

          <Select
            labelId='destinationSubLocation'
            id='destinationSubLocation'
            //value={age}
            sx={{ width: '490px' }}
            value={mto ? mto.destinationSublocation : ''}
            label='location'
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
                destinationSubLocation: e.target.value,
              })
            }

          >


            {subLocations.map((address, index) => (
              <MenuItem key={index} value={address?.address}>
                {address?.address}
              </MenuItem>
            ))}


          </Select>

        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '23px' }}>


        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor='outlined-basic'>Consignee</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            sx={{ width: '490px' }}
            value={formData.consigneeName}
            label='consignee'
            onChange={(e) =>
              setformData({
                ...formData,
                consigneeName: e.target.value,
              })
            }
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200, // Adjust the height as needed
                },
              },
            }}
          >
            {state.nonPersisted.consignee.data?.map((item, index) => (
              <MenuItem key={index} value={item?.consigneeName}>
                {' '}
                {item?.consigneeName}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ width: '90%', mt: '23px' }}>
            <InputLabel id='demo-simple-select-label'>
              Repair/Service
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              value={formData.repairService || ''}
              label='Repair/service'
              sx={{ width: '490px' }}
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
        <Grid item xs={12} sm={6}>
          <InputLabel id='demo-simple-select-label'>Date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={formData?.transferDate ? dayjs(formData.transferDate) : null}
              onChange={(date) => handleDateChange(date)}
              fullWidth
              sx={{ width: '490px' }}
            />
          </LocalizationProvider>
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

export default UpdateMto;
