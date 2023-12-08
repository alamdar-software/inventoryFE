import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Shipper = () => {
  const [shipperList, setShipperList] = useState([]);
  const [shipperName, setShipperName] = useState();
  const [address, setAddressName] = useState();
  const [postalCode, setPostalCode] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [email, setEmail] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // You can adjust the number of rows per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!shipperName || !address || !postalCode || !contactNumber || !email) {
      Swal.fire({
        title: "Plese Fill All Fiels",
        text: "Fields are Empty?",
        icon: "question",
      });
      return;
    }
    const formData = {
      shipperName,
      address,
      postalCode,
      contactNumber,
      email,
    };

    console.log(formData);

    fetch("http://localhost:8080/shipper/add", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      console.log("Shipper Added");
      window.location.reload();
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/shipper/view")
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const shippersArray = Object.values(result);
          setShipperList(shippersArray);
        } else {
          console.error("Empty or invalid JSON response");
        }
      })
      .catch((error) => {
        console.error("Error fetching shipper data:", error);
      });
  }, []);

  const deleteShipper = async (id) => {
    console.log(id);
    alert("Deleted Successfully!");
    fetch(`http://localhost:8080/shipper/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(shipperList),
    })
      .then(() => {
        console.log("Shipper Updated");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating shipper:", error);
      });
  };

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
            <Typography
              variant="h4"
              color="secondary"
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              Create Shipper
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
              label="Shipper Name"
              variant="outlined"
              //   value={location}
              value={shipperName}
              onChange={(e) => setShipperName(e.target.value)}
              //   onChange={(e) => setLocation(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Address Name"
              variant="outlined"
              value={address}
              onChange={(e) => setAddressName(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ ml: "13px", mt: "21px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Postal Code"
              variant="outlined"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Contact Number"
              variant="outlined"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: "21px", ml: "13px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ width: "90%" }}
            />
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
                  Name
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Address
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Postal Code
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Contact Number
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Email
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {shipperList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((shipperList) => (
                  <TableRow
                    key={shipperList.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">
                      {shipperList.shipperName}
                    </TableCell>

                    <TableCell align="right">{shipperList.address}</TableCell>
                    <TableCell align="right">
                      {shipperList.postalCode}
                    </TableCell>
                    <TableCell align="right">
                      {shipperList.contactNumber}
                    </TableCell>
                    <TableCell align="right">{shipperList.email}</TableCell>

                    {/* Include your update and delete buttons here */}
                    <Link to={`/updateShipper/${shipperList.id}`}>
                      <Button variant="contained">Update</Button>
                    </Link>
                    <Button
                      sx={{ marginLeft: "11px" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteShipper(shipperList.id)}
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
          count={shipperList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </>
  );
};

export default Shipper;
