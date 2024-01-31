import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
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
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchlocation } from "../redux/slice/location";
import { fetchItem } from "../redux/slice/ItemSlice";
import { fetchentity } from "../redux/slice/entitySlice";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const ScrappedReport = () => {
  const [filteredCipl, setFilteredCipl] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setformData] = useState({
    item: "",
    locationName: "",
    startDate: "",
    endDate: "",
  });

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchlocation());
    dispatch(fetchItem());
    dispatch(fetchentity());
  }, [dispatch]);
  const handleDateChange = (date) => {
    setformData({
      ...formData,
      startDate: date.format("YYYY-MM-DD"),
    });
  };
  console.log(formData);
  const handleDateChangeTo = (dateTo) => {
    setformData({
      ...formData,
      endDate: dateTo.format("YYYY-MM-DD"),
    });
  };
  console.log(formData);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:8080/scrappeditem/searchReport",
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      // Always set the filteredCipl state to the new data or an empty array
      setFilteredCipl(data || []);

      if (data.length === 0) {
        setFilteredCipl([]);
        alert("No data found");
      } else {
        console.log(data, "came from backend");
      }
    } catch (error) {
      console.error("Error while adding inventory:", error.message);
      setFilteredCipl([]);
      alert("No data found");
    }
  };

  const handleDownloadCsv = () => {
    const boldStyle = { bold: true };
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add header row
    worksheet.addRow([
      "S/No",
      "Item Description",
      "Location/Vessel",
      "SubLocation",

      "Quantity",
      "Date",

      "Remarks",
    ]).font = boldStyle;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 30;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 20;

    let serialNumber = 1;
    // Add data rows
    filteredCipl.forEach((ciplRow, rowIndex) => {
      const rowData = [
        serialNumber++,
        Array.isArray(ciplRow.item) ? ciplRow.item.join(", ") : ciplRow.item,
        ciplRow.locationName,
        Array.isArray(ciplRow.subLocations)
          ? ciplRow.subLocations.join(", ")
          : ciplRow.item,
        Array.isArray(ciplRow.quantity)
          ? ciplRow.quantity.join(", ")
          : ciplRow.quantity,
        Array.isArray(ciplRow.date) ? ciplRow.date.join(", ") : ciplRow.date,
        Array.isArray(ciplRow.remarks)
          ? ciplRow.remarks.join(", ")
          : ciplRow.remarks,
      ];

      worksheet.addRow(rowData);
    });

    // Create a blob from the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "MasterReport.xlsx";
      link.click();
    });
  };
  const handleDownloadPdf = () => {
    const input = document.getElementById("cipl-table");

    html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape" });

      // Divide the canvas into multiple sections if needed
      const imgHeight = (canvas.height * 208) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      const marginTop = 20;

      // Add each section to the PDF
      pdf.setFont("helvetica", "bold");

      pdf.text("Scrapped Item Report", 110, 10);

      while (heightLeft >= 0) {
        pdf.addImage(imgData, "PNG", 0, position + marginTop, 297, imgHeight);
        heightLeft -= 208;
        position -= 297;
        if (heightLeft >= 0) {
          pdf.addPage();
        }
      }

      pdf.save("Scrapped.pdf");
    });
  };

  return (
    <>
      <Card
        color="secondary"
        sx={{
          width: "100%",
          backgroundColor: "secondary",
          borderBottom: "2px solid yellow",
          mb: "33px",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            color="secondary"
            gutterBottom
            style={{ fontFamily: "'EB Garamond'" }}
          >
            Scrapped Item Report
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={21} sm={6}>
              <FormControl fullWidth sx={{ width: "90%" }}>
                <InputLabel id="demo-simple-select-label">
                  Item Description
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="description"
                  //value={age}
                  label="description"
                  onChange={(e) =>
                    setformData({
                      ...formData,
                      item: e.target.value,
                    })
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
                  label="location"
                  onChange={(e) =>
                    setformData({
                      ...formData,
                      locationName: e.target.value,
                    })
                  }
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 120,
                      },
                    },
                  }}
                  //onChange={handleLocationChange}
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
          <Grid container spacing={2} sx={{ mt: "21px" }}>
            <Grid item xs={12} sm={6}>
              <InputLabel id="date-picker-label">From date</InputLabel>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  //value={formData.date}
                  onChange={(newDate) => handleDateChange(newDate)}
                  fullWidth
                  sx={{ width: "90%" }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="date-picker-label">To Date</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  //value={formData.date}
                  onChange={(newDate) => handleDateChangeTo(newDate)}
                  fullWidth
                  sx={{ width: "90%" }}
                />
              </LocalizationProvider>
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
              onClick={handleDownloadCsv}
              sx={{ marginRight: "8px" }}
            >
              Dwnload Excel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleDownloadPdf}
            >
              Download Pdf
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Grid sx={{ mt: "33px", width: "100%", overflowX: "scroll" }}>
        <TableContainer
          id="cipl-table"
          component={Paper}
          sx={{
            borderRadius: "33px",

            borderBottom: "1px solid black",
            borderTop: "1px solid black",
            width: "98%",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Item Description
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Location
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  SubLocation
                </TableCell>

                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Quantity
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Remarks
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCipl
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ciplRow) => (
                  // Render a row for each sublocation

                  <TableRow
                    key={`${ciplRow.id}`} // Use a unique key for each row
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{ciplRow.item}</TableCell>

                    <TableCell align="right">{ciplRow.locationName}</TableCell>

                    <TableCell align="right">{ciplRow.subLocations}</TableCell>
                    <TableCell align="right">{ciplRow.quantity}</TableCell>
                    <TableCell align="right">{ciplRow.date}</TableCell>
                    <TableCell align="right">{ciplRow.remarks}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={pickup.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Grid>
    </>
  );
};

export default ScrappedReport;
