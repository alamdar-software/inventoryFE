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
export const ViewCipl = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [itemDescription, setitemDescription] = useState();
  const [locationName, setlocationName] = useState();
  const [transferDate, settransferDate] = useState();
  const [cipl, setcipl] = useState([]);

  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchItem());
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setformData] = useState({
    itemDescription: "",
    date: "",
    location: "",
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(formData, "heyyy");
  // const handleClick = () => {
  //   try {
  //     const formData = {
  //       pickupAddress,
  //       pIC,
  //       companyName,
  //       countryCode,
  //       contactNumber,
  //     };

  //     console.log(formData);

  //     fetch('http://localhost:8080/pickup/add', {
  //       method: 'POST',
  //       headers: { 'Content-type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     }).then(() => {
  //       console.log('Pickup Added');
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  /*  const handleClick = (e) => {
    e.preventDefault();
    const attendence = {
      pickupAddress,
      pic,
      companyName,
      countryCode,
      contactNumber,
    };
    console.log(attendence);

    fetch("http://localhost:8080/pickup/add", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(attendence),
    }).then(() => {
      console.log("Pickup Added");
      window.location.reload();
    });
  };
  useEffect(() => {
    fetch('http://localhost:8080/pickup/view')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setPickUp(result);
      })
      .catch((error) => {
        console.error('Error fetching pickup data:', error);
      });
  }, []);

  const deletePickup = async (id) => {
    alert("Deleted Successfully!");
    console.log(id);
    fetch(`http://localhost:8080/pickup/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(Pickup),
    })
      .then(() => {
        console.log("Pickup Deleted");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating pickup:", error);
      });
  }; */
  useEffect(() => {
    fetch("http://localhost:8080/cipl/view")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setcipl(result);
      })
      .catch((error) => {
        console.error("Error fetching pickup data:", error);
      });
  }, []);
  const handleDateChange = (date) => {
    setformData({
      ...formData,
      date: date.format("YYYY-MM-DD"),
    });
  };
  return (
    <>
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
              View Cipl
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
        <Grid container spacing={2} sx={{ ml: "13px" }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Item Desc</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="itemName"
                label="itemName"
                onChange={(e) => {
                  setformData({
                    ...formData,
                    itemDescription: e.target.value,
                  });
                }}
                /* onChange={(e) =>
                  handleItemChange(
                    index,
                    selectedSubLocations[index],
                    e.target.value
                  )
                } */
              >
                {state.item.data?.map((item, index) => (
                  <MenuItem key={index} value={item?.description}>
                    {" "}
                    {item?.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: "90%" }}>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={age}

                label="location"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 120, // Adjust the height as needed
                    },
                  },
                }}
                onChange={(e) => {
                  setformData({
                    ...formData,
                    locationName: e.target.value,
                  });
                }}

                //onChange={handleChange}
              >
                {state.location.data?.map((item, index) => (
                  <MenuItem key={index} value={item?.locationName}>
                    {" "}
                    {item?.locationName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: "90%" }}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    /* value={
                formData.purchaseDate ? dayjs(formData.purchaseDate) : null
              } */
                    onChange={(newDate) => handleDateChange(newDate)}
                    // onChange={(newDate) => handleDateChange(newDate)}
                    fullWidth
                    sx={{ width: "90%" }}
                    /* format="yyyy-MM-dd" */
                  />
                </LocalizationProvider>
              </Grid>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            mt: "33px",
            mb: "17px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
        >
          Search
        </Button>
      </Card>
      <Grid sx={{ mt: "33px", width: "100%", overflowX: "scroll" }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "33px",
            borderBottom: "2px solid yellow",
            width: "110%",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Source Location
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  SubLocations
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Shipper
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Consignee
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Ref Number
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Transfer Date
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Select Print
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Print
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cipl
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cipl) => (
                  <TableRow
                    key={cipl.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* <TableCell component='th' scope='row'>
                {attendence.name}
              </TableCell> */}
                    <TableCell align="right">{cipl.locationName}</TableCell>
                    <TableCell align="right">{cipl.SubLocations}</TableCell>
                    <TableCell align="right">{cipl.shipperName}</TableCell>
                    <TableCell align="right">{cipl.consigneeName}</TableCell>

                    <Box>
                      <Link to={`/updateConsignee/${cipl.id}`}>
                        <Button variant="contained">Update</Button>
                      </Link>

                      <Button
                        sx={{ marginLeft: "11px" }}
                        variant="contained"
                        color="secondary"
                        /*  onClick={() => deleteConsignee(consignee.id)} */
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cipl.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </>
  );
};

export default ViewCipl;
