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
  FormLabel,
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

export const StockReport = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [item, setitem] = useState();
  const [locationName, setlocationName] = useState();
  const [transferDate, settransferDate] = useState();
  const [cipl, setcipl] = useState([]);
  const [allCipl, setAllCipl] = useState([]);
  const [filteredCipl, setFilteredCipl] = useState([]);

  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchItem());
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setformData] = useState({
    FromDate: "",
    ToDate: "",
    entity: "",
    repairService: "",
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

  /*   const handleClick = (e) => {
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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/cipl/search", {
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
      setFilteredCipl(data);
      console.log(data, "came from backend");
    } catch (error) {
      console.error("Error while adding inventory:", error.message);
      alert("data not found");
    }
  };
  const handleDateChange = (date) => {
    setformData({
      ...formData,
      FromDate: date.format("YYYY-MM-DD"),
    });
  };
  const handleToDateChange = (date) => {
    setformData({
      ...formData,
      ToDate: date.format("YYYY-MM-DD"),
    });
  };

  /*   const generatePDF = async (rowData, index) => {
    console.log("Generate PDF clicked");
    const pdf = new jsPDF();

    const tableRow = document.getElementById(`${rowData.id}-${index}`);
    if (tableRow) {
      const canvas = await html2canvas(tableRow);
      const imgData = canvas.toDataURL("image/png");

      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("table.pdf");
    }
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
              Stock Report
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
            <FormControl fullWidth sx={{ width: "100%" }}>
              <FormLabel>From Date</FormLabel>
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ width: "100%" }}>
              <FormLabel>To Date</FormLabel>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    /* value={
          formData.purchaseDate ? dayjs(formData.purchaseDate) : null
        } */
                    onChange={(newDate) => handleToDateChange(newDate)}
                    // onChange={(newDate) => handleDateChange(newDate)}
                    fullWidth
                    sx={{ width: "90%" }}
                    /* format="yyyy-MM-dd" */
                  />
                </LocalizationProvider>
              </Grid>
            </FormControl>
          </Grid>
          <Grid container spacing={2} sx={{ ml: "5px", mt: "20px" }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ width: "100%" }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ width: "90%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Entity
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //value={age}
                      value={formData?.entity}
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
                          entity: e.target.value,
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
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ width: "45%" }}>
                <InputLabel id="demo-simple-select-label">
                  Repair/Service
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData?.repairService}
                  //value={age}

                  label="Repair/service"
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
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            mt: "33px",
            mb: "17px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleClick}
            sx={{ marginRight: "8px" }}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleClick}
            sx={{ marginRight: "8px" }}
          >
            Dwnload Excel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleClick}
          >
            Download Pdf
          </Button>
        </Box>
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
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Reference No
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Repair/Service
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Source Location
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  SubLocation
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Item
                </TableCell>

                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Purchase
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  P/N
                </TableCell>

                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Consignee
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Entity
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Transfer Date
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCipl
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ciplRow) =>
                  // Render a row for each sublocation
                  ciplRow.SubLocations.map((subLocation, index) => (
                    <TableRow
                      key={`${ciplRow.id}-${index}`} // Use a unique key for each row
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">
                        {ciplRow.locationName}
                      </TableCell>
                      <TableCell align="right">{subLocation}</TableCell>
                      <TableCell align="right">{ciplRow.shipperName}</TableCell>
                      <TableCell align="right">
                        {ciplRow.consigneeName}
                      </TableCell>
                      <TableCell align="right">
                        {ciplRow.consigneeName}
                      </TableCell>
                      <TableCell align="right">
                        {ciplRow.transferDate}
                      </TableCell>
                      <TableCell align="right">
                        {ciplRow.transferDate}
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/cipl/createpdf/${ciplRow.id}`}>
                          <Button
                            variant="contained"
                            color="primary"
                            /*  onClick={() => generatePDF(ciplRow.id, index)} */
                          >
                            {<PictureAsPdfIcon />}
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
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

export default StockReport;
