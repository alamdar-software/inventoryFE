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
  TableRow,
  Typography,
  TablePagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LocationList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust as needed
  const [error, setError] = useState(null);
  const [location, setLocationName] = useState([]);
  const [selectedLocation, setselectedLocation] = useState("");
  const [selectedLocationId, setselectedLocationId] = useState(null);
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8080/location/getAll")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLocationName(result);
        /*  if (result.length > 0 && result[0].addresses.length > 0) {
          setselectedLocation(result[0].addresses[0].address);
          setselectedLocationId(result[0].addresses[0].id);
        } */
        if (result.length > 0 && result[0].addresses.length > 0) {
          setselectedLocationId(result[0].addresses[0].id);
        }
      });
  }, []);

  const deleteLocation = async (id) => {
    console.log(id);
    fetch(`http://localhost:8080/location/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(LocationList),
    })
      .then(() => {
        console.log("Location deleted");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating location:", error);
      });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(selectedLocation, "heyyy");
  const handleUpdateClick = (locationId) => {
    if (!selectedLocation) {
      setShowError(true);
    } else {
      // Reset the error if a sublocation is selected
      setShowError(false);
      // Redirect to the update page
      window.location.href = `/updateLocation/${locationId}/addresses/${selectedLocationId}`;
    }
  };

  return (
    <>
      <Grid>
        <Card
          color="secondary"
          sx={{
            width: "100%",
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
              Location/Vessel List
            </Typography>
          </CardContent>
        </Card>

        <Grid sx={{ mt: "33px" }}>
          <TableContainer
            component={Paper}
            sx={{ borderRadius: "33px", borderBottom: "2px solid yellow" }}
          >
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    LocationName
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Sub Location
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {location
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((location, index) => (
                    <React.Fragment key={location.id}>
                      <TableRow
                        key={location.name}
                        /*  sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }} */
                      >
                        <TableCell align="left">
                          {location.locationName}
                        </TableCell>

                        <TableCell align="left">
                          <FormControl fullWidth sx={{ width: "20rem" }}>
                            <InputLabel id="subLocation">
                              View Sub Location
                            </InputLabel>
                            <Select
                              labelId="subLocation"
                              id="subLocation"
                              label="Sub Location"
                              defaultValue={selectedLocation || ""}
                              /* value={formData?.name} */
                              //value={age}
                              value={selectedLocation}
                              onChange={(e) => {
                                setselectedLocation(e.target.value);
                                // Assuming each address has a unique ID, use it here
                                const selectedAddress =
                                  location?.addresses.find(
                                    (address) =>
                                      address?.address === e.target.value
                                  );
                                setselectedLocationId(
                                  selectedAddress ? selectedAddress.id : null
                                );
                              }}
                              style={{ width: "60%" }}

                              //onChange={handleChange}
                            >
                              {location?.addresses.map((adress) => (
                                <MenuItem key={index} value={adress?.address}>
                                  {" "}
                                  {adress?.address}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/updateLocation/${location.id}/addresses/${selectedLocationId}`}
                          >
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={(e) => {
                                e.preventDefault();
                                handleUpdateClick(location.id);
                              }}
                            >
                              Update
                            </Button>
                          </Link>
                          <Button
                            sx={{ marginLeft: "11px" }}
                            variant="contained"
                            color="secondary"
                            onClick={() => deleteLocation(location.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
              </TableBody>
              {showError && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ color: "red" }}>
                    Please select a sublocation
                  </TableCell>
                </TableRow>
              )}
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={location.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default LocationList;
