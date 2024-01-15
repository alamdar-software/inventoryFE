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
import { fetchlocation } from "../../redux/slice/location";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
const LocationReport = () => {
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
  }, []);
  console.log(state, "nowory");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setformData] = useState({
    address: "",
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
      const res = await fetch("http://localhost:8080/location/search", {
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
      console.log(data, "came from backend");
      setFilteredCipl(data);
    } catch (error) {
      console.error("Error while adding inventory:", error.message);
      alert("data not found");
    }
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
  console.log(state, "hey");
  const generateCsvData = () => {
    // Your logic to create CSV data based on search parameters
    const csvData = [
      ["Serial No", "Location/Vessel", "SubLocation"],
      ...filteredCipl.flatMap((ciplRow, rowIndex) =>
        ciplRow.addresses?.map((subLocation, subIndex) => [
          rowIndex * ciplRow.addresses.length + subIndex + 1,
          ciplRow.locationName,
          subLocation.address,
        ])
      ),
    ];

    return csvData;
  };
  const handleDownloadCsv = () => {
    const boldStyle = { bold: true };
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add header row
    worksheet.addRow(["Serial No", "Location/Vessel", "SubLocation"]).font =
      boldStyle;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(2).width = 30;
    // Add data rows
    filteredCipl.forEach((ciplRow, rowIndex) => {
      ciplRow.addresses?.forEach((subLocation, subIndex) => {
        const rowData = [
          rowIndex * ciplRow.addresses.length + subIndex + 1,
          ciplRow.locationName,
          subLocation.address,
        ];
        worksheet.addRow(rowData);
      });
    });

    // Create a blob from the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "excel_file.xlsx";
      link.click();
    });
  };

  console.log(filteredCipl, "fillll");
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
              Inventory Report
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
        <Grid container spacing={2} sx={{ ml: "13px", alignItems: "center" }}>
          <Grid item xs={12} sm={4} sx={{ marginLeft: "400px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sub Location
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="itemName"
                label="itemName"
                onChange={(e) => {
                  setformData({
                    ...formData,
                    address: e.target.value,
                  });
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 120, // Adjust the height as needed
                    },
                  },
                }}
                /* onChange={(e) =>
                  handleItemChange(
                    index,
                    selectedSubLocations[index],
                    e.target.value
                  )
                } */
              >
                {state.location.data?.map((location) =>
                  location.addresses.map((address) => (
                    <MenuItem key={address.id} value={address.address}>
                      {address.address}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
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

          <CSVLink
            data={generateCsvData()}
            filename={"search_parameters.csv"}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ marginRight: "8px" }}
              hidden
            >
              Download Excel
            </Button>
          </CSVLink>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleDownloadCsv}
          >
            Download Excel
          </Button>
        </Box>
      </Card>
      <Grid sx={{ mt: "33px", width: "100%", overflowX: "scroll" }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "33px",
            borderBottom: "2px solid yellow",
            width: "100%",
          }}
        >
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{ fontWeight: "bold", paddingLeft: "40px" }}
                >
                  Location/Vessel
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  SubLocation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCipl &&
                filteredCipl
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((ciplRow) =>
                    // Render a row for each sublocation
                    ciplRow?.addresses?.map((subLocation, index) => (
                      <TableRow
                        key={`${ciplRow.id}-${index}`} // Use a unique key for each row
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left" sx={{ paddingLeft: "40px" }}>
                          {ciplRow.locationName}
                        </TableCell>
                        <TableCell align="left">
                          {subLocation.address}
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

export default LocationReport;
