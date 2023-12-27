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
} from "@mui/material";
import { Link } from "react-router-dom";
const ViewCipl = () => {
  const [itemDescription, setitemDescription] = useState();
  const [locationName, setlocationName] = useState();
  const [transferDate, settransferDate] = useState();

  const [cipl, setcipl] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    fetch("http://localhost:8080/pickup/view")
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
        console.error("Error fetching pickup data:", error);
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
              Add PickUp
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
                /* onChange={(e) =>
                  handleItemChange(
                    index,
                    selectedSubLocations[index],
                    e.target.value
                  )
                } */
              >
                {item[index]?.map((filteredItem, itemIndex) => (
                  <MenuItem key={itemIndex} value={filteredItem}>
                    {filteredItem}
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
                value={formData.locationName || ""}
                label="location"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 120, // Adjust the height as needed
                    },
                  },
                }}
                onChange={handleLocationChange}
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
        </Grid>

        <Button
          variant="contained"
          color="secondary"
          size="large"
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
                  PickupAddress
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Pic
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  CompanyName
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  CountryCode
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  ContactNumber
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pickup
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((pickup) => (
                  <TableRow
                    key={pickup.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* <TableCell component='th' scope='row'>
                  {attendence.name}
                </TableCell> */}
                    <TableCell align="right">{pickup.pickupAddress}</TableCell>
                    <TableCell align="right">{pickup.pic}</TableCell>
                    <TableCell align="right">{pickup.companyName}</TableCell>
                    <TableCell align="right">{pickup.countryCode}</TableCell>
                    <TableCell align="right">{pickup.contactNumber}</TableCell>

                    <Link to={`/updatePickup/${pickup.id}`}>
                      <Button variant="contained">Update</Button>
                    </Link>
                    <Button
                      sx={{ marginLeft: "11px" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => deletePickup(pickup.id)}
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
          count={pickup.length}
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
