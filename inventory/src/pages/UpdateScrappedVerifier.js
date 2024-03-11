import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Select,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TablePagination,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchlocation } from "../redux/slice/location";
import { fetchItem } from "../redux/slice/ItemSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { fetchConsumeItem } from "../redux/slice/ConsumeItemSlice";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";

function UpdateScrappedVerifier() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { currentUser } = useSelector((state) => state.persisted.user);

  const [locationName, setlocationName] = useState();
  const [transferDate, settransferDate] = useState();
  const [Scrapped, setScrapped] = useState([]);
  const [allScrapped, setAllScrapped] = useState([]);
  const [filteredScrapped, setFilteredScrapped] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/scrappeditem/get/${id}`,{
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setScrapped(result);
      });
  }, []);
  console.log(Scrapped, "rupali");
  useEffect(() => {
    dispatch(fetchlocation(currentUser.accessToken));
    dispatch(fetchItem(currentUser.accessToken));
    dispatch(fetchConsumeItem(currentUser.accessToken));
  }, []);
  /*   console.log("Scrapped.SubLocations:", Scrapped?.SubLocations[0]); */

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setformData] = useState({
    item: "",
    transferDate: "",
    locationName: "",
  });
  const [subLocations, setSubLocations] = useState([]);
  const [selectedSubLocations, setSelectedSubLocations] = useState([]);
  const [item, setItem] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/scrappeditem/search", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setFilteredScrapped(data);
      console.log(data, "came from backend");
    } catch (error) {
      console.error("Error while finding consume:", error.message);
      alert("data not found");
    }
  };

  const handleDateChange = (date) => {
    setformData({
      ...formData,
      transferDate: date.format("YYYY-MM-DD"),
    });
  };
  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setformData({
      ...formData,
      locationName: selectedLocation,
      SubLocations: [""], // Reset sublocation when location changes
    });

    const selectedLocationObj = state.nonPersisted.location.data.find(
      (location) => location.locationName === selectedLocation
    );
    setSubLocations(selectedLocationObj && selectedLocationObj?.addresses);
    console.log(selectedLocationObj, "yuuuu");
  };
  const handleSubLocationChange = (e) => {
    const selectedSubLocation = e.target.value || "";

    // Update formData with the selected sublocation
    updateFormDataSubLocations(selectedSubLocation);

    // Ensure a default value if undefined
    setSelectedSubLocations([selectedSubLocation]); // Wrap in an array if it's a single value

    // Find the corresponding item descriptions in the inventory data
    const selectedInventoryData = state.nonPersisted.inventory?.data.filter(
      (inventoryItem) => inventoryItem.address?.address === selectedSubLocation
    );
    console.log(selectedInventoryData, "22");

    // Extract item descriptions from the selected inventory data
    const itemDescriptions = selectedInventoryData.map(
      (inventoryItem) => inventoryItem.description
    );
    console.log(itemDescriptions, "33");

    // Update the item state with the selected item descriptions
    setItem(itemDescriptions);
  };

  const updateFormDataSubLocations = (index, selectedSubLocation) => {
    setformData((prevFormData) => {
      const updatedSubLocations = [...prevFormData.SubLocations];
      updatedSubLocations[index] = selectedSubLocation;
      return {
        ...prevFormData,
        SubLocations: updatedSubLocations,
      };
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
   

    fetch(`http://localhost:8080/scrappeditem/status/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
 
      .then(() => {
        toast.success('🦄 Scrapped Verified Successfully!', {
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
        // navigate('/consignee');
      })
      .catch((error) => {
        console.error('Error updating scrapped:', error);
      });
  };
  console.log(formData,"rashmidesaiii");
  return (
    <div>
      <Grid>
        <Card
          color="secondary"
          sx={{
            width: "100%",
            // background:
            //   'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)',

            borderBottom: "2px solid #ab47bc",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              color="secondary"
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              Update Scrapped Items
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Card
        sx={{
          width: "100%",
          mt: "33px",
          pt: "33px",
          borderBottom: "2px solid #ab47bc",
          borderRadius: "33px",
        }}
      >
        <Grid container spacing={2} sx={{ ml: "33px" }}>
          <Grid item xs={21} sm={6}>
            <FormControl fullWidth sx={{ width: "90%" }}>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Scrapped?.locationName || ""}
                //value={age}
                label="location"
                /* onChange={handleLocationChange} */
                InputProps={{
                  readOnly: true,
                  style: { pointerEvents: "none" },
                }}
                sx={{
                  backgroundColor: "#f2f2f2", // Set your desired background color
                }}
                //onChange={handleChange}
                disabled
              >
                /*{" "}
                {state.nonPersisted.location.data?.map((item, index) => (
                  <MenuItem key={index} value={item?.locationName}>
                    {" "}
                    {item?.locationName}
                  </MenuItem>
                ))}{" "}
                */
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: "90%" }}>
              <InputLabel id="demo-simple-select-label">
                {Scrapped?.SubLocations}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-label"
                value={Scrapped?.SubLocations}
                //value={age}
                label="sublocation"
                onChange={(e) => handleSubLocationChange(e)}
                InputProps={{
                  readOnly: true,
                  style: { pointerEvents: "none" },
                }}
                sx={{
                  backgroundColor: "#f2f2f2", // Set your desired background color
                }}
                //onChange={handleChange}
                disabled
              >
                {subLocations.map((address, index) => (
                  <MenuItem key={index} value={address?.address}>
                    {address?.address}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: "220%" }}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={
                      Scrapped?.transferDate
                        ? dayjs(Scrapped?.transferDate)
                        : null
                    }
                    /* value={
            formData.purchaseDate ? dayjs(formData.purchaseDate) : null
          } */
                    onChange={(newDate) => handleDateChange(newDate)}
                    // onChange={(newDate) => handleDateChange(newDate)}
                    fullWidth
                    sx={{ width: "80%", backgroundColor: "#f2f2f2" }}
                    /* format="yyyy-MM-dd" */
                    InputProps={{
                      readOnly: true,
                      style: {
                        pointerEvents: "none",
                        backgroundColor: "#f2f2f2",
                      },
                    }}
                    disabled
                  />
                </LocalizationProvider>
              </Grid>
            </FormControl>
          </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: '90%' }}>
            <InputLabel id='demo-simple-select-label'>Status</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              //value={age}
              value={Scrapped ? Scrapped.status : ''}
             
              label='Repair/service'
              //onChange={handleChange}
              onChange={(e) =>
                setformData({
                  ...Scrapped,
                  status: e.target.value,
                })
              }
           
            >
              <MenuItem value={'verified'}>Verified</MenuItem>
              <MenuItem value={'rejected'}>Rejected</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid sx={{ mt: "33px", width: "100%", overflowX: "scroll" }}>
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: "33px",
                borderBottom: "2px solid yellow",
                width: "95%",
              }}
            >
              <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Item Description
                    </TableCell>

                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Part No
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Serial No
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Purchase Order(Date)
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Quantity
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Remarks
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {Scrapped ? (
                    <TableRow key={Scrapped.id}>
                      <TableCell align="left">
                        <Typography
                          fontWeight="bold"
                          style={{ color: "black" }}
                        >
                          <TextField
                            value={Scrapped?.item || ""}
                            fullWidth
                            variant="outlined"
                            size="small"
                            InputProps={{
                              readOnly: true,
                              style: { pointerEvents: "none" },
                            }}
                            sx={{
                              backgroundColor: "#f2f2f2", // Set your desired background color
                            }}
                          />
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          value={Scrapped?.partNo || ""}
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{
                            readOnly: true,
                            style: { pointerEvents: "none" },
                          }}
                          sx={{
                            backgroundColor: "#f2f2f2", // Set your desired background color
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          value={Scrapped?.sn || ""}
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{
                            readOnly: true,
                            style: { pointerEvents: "none" },
                          }}
                          sx={{
                            backgroundColor: "#f2f2f2", // Set your desired background color
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          value={Scrapped?.date || ""}
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{
                            readOnly: true,
                            style: { pointerEvents: "none" },
                          }}
                          sx={{
                            backgroundColor: "#f2f2f2", // Set your desired background color
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          value={Scrapped?.quantity || ""}
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{
                            readOnly: true,
                            style: { pointerEvents: "none" },
                          }}
                          sx={{
                            backgroundColor: "#f2f2f2", // Set your desired background color
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          value={Scrapped?.remarks || ""}
                          fullWidth
                          variant="outlined"
                          size="small"
                          InputProps={{
                            readOnly: true,
                            style: { pointerEvents: "none" },
                          }}
                          sx={{
                            backgroundColor: "#f2f2f2", // Set your desired background color
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No incoming data available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={consignee.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
          </Grid>
          <Button
        variant='contained'
        color='secondary'
        size='large'
        onClick={handleUpdate}
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
        </Grid>
      </Card>
    </div>
  );
}

export default UpdateScrappedVerifier;
