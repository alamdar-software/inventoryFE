import {
  Button,
  Card,
  CardContent,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchlocation } from "../redux/slice/location";
import { Link } from "react-router-dom";

const Consignee = () => {
  const state = useSelector((state) => state);
  console.log(state, "location data");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchlocation());
  }, []);

  const [formData, setformData] = useState({
    name: "",
    address: "",
    pincode: "",
    email: "",
    phoneNumber: "",
    notifyParty: "",
    deliveryAddress: "",
    locationName: null,
  });
  const [consignee, setConsignee] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      const res = await fetch("http://localhost:8080/consignee/add", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, "resdata");
      window.location.reload();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  useEffect(() => {
    fetch("http://localhost:8080/consignee/view")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setConsignee(result);
      });
  }, []);

  const deleteConsignee = async (id) => {
    console.log(id);
    alert('Deleted Successfully!');
    fetch(`http://localhost:8080/consignee/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(consignee),
    })
      .then(() => {
        console.log('Consignee Updated');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating consignee:', error);
      });
  };
  const handleInputChange = async (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData, "hey");
  return (
    <>
      <Grid>
        <Card
          color="secondary"
          sx={{
            width: "100%",
            backgroundColor: "secondary",
            borderBottom: "2px solid yellow",
          }}
        >
          <CardContent>
            <Typography variant="h4" color="secondary" gutterBottom>
              Create Consignee
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Card
        sx={{
          width: "100%",
          mt: "33px",
          pt: "33px",
          borderBottom: "2px solid yellow",
          borderRadius: "33px",
        }}
      >
        <Grid container spacing={2} sx={{ ml: "13px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Consignee Name"
              variant="outlined"
              onChange={(e) =>
                setformData({
                  ...formData,
                  name: e.target.value,
                })
              }
              //   value={location}
              //   onChange={(e) => setLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="address"
              label="Address "
              variant="outlined"
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ ml: "13px", mt: "21px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Pin Code"
              variant="outlined"
              onChange={(e) =>
                setformData({
                  ...formData,
                  pincode: e.target.value,
                })
              }
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: "21px", ml: "13px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              onChange={(e) =>
                setformData({
                  ...formData,
                  phoneNumber: e.target.value,
                })
              }
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="deliveryAddress"
              label="Delivery Address"
              variant="outlined"
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: "21px", ml: "13px" }}></Grid>
        <Grid container spacing={2} sx={{ mt: "21px", ml: "13px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="notifyParty"
              label="notifyParty"
              variant="outlined"
              onChange={handleInputChange}
              //   value={subLocation}
              //   onChange={(e) => setSubLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={10} sm={6}>
            <InputLabel id="location">Location</InputLabel>
            <Select
              labelId="location"
              id="location"
              value={formData?.locationName || "sgr"}
              label="Location"
              fullWidth
              onChange={(e) =>
                setformData({
                  ...formData,
                  locationName: e.target.value,
                })
              }
            >
              {state.location.data?.map((item, index) => (
                <MenuItem key={index} value={item?.locationName}>
                  {" "}
                  {item?.locationName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          //onClick={handleClick}
          onClick={handleClick}
          sx={{
            mt: "33px",
            mb: "17px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
        >
          Add
        </Button>
      </Card>

      <Grid sx={{ mt: "33px" }}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: "33px", borderBottom: "2px solid yellow" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Address
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Pincode
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Phone Number
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Delivery Address
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Notify Party
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Location
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consignee
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((consignee) => (
                  <TableRow
                    key={consignee.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* <TableCell component='th' scope='row'>
                  {attendence.name}
                </TableCell> */}
                    <TableCell align="right">{consignee.name}</TableCell>
                    <TableCell align="right">{consignee.address}</TableCell>
                    <TableCell align="right">{consignee.pincode}</TableCell>
                    <TableCell align="right">{consignee.email}</TableCell>
                    <TableCell align="right">{consignee.phoneNumber}</TableCell>
                    <TableCell align="right">
                      {consignee.deliveryAddress}
                    </TableCell>
                    <TableCell align="right">{consignee.notifyParty}</TableCell>
                    <TableCell align="right">
                      {consignee.locationName}
                    </TableCell>

                    <Link to={`/updateConsignee/${consignee.id}`}>
                      <Button variant="contained">Update</Button>
                    </Link>

                    <Button
                      sx={{ marginLeft: '11px' }}
                      variant='contained'
                      color='secondary'
                      onClick={() => deleteConsignee(consignee.id)}
                    >
                      Delete
                    </Button>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={consignee.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </>
  );
};

export default Consignee;
