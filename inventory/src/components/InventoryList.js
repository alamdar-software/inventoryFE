import {
  Box,
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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InventoryList = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedInventory, setSelectedInventory] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(selectedInventory, "heyyy");
  const [formData, setformData] = useState({
    description: "",
    locationName: "",
    address: "",
    quantity: "",
    consumedItem: "",
    scrappedItem: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/inventory/view")
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const inventoryArray = Object.values(result);
          setInventoryData(inventoryArray);
        } else {
          console.error("Empty or invalid JSON response");
        }
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  }, []);
  const deleteInventory = async (id) => {
    console.log(id);
    fetch(`http://localhost:8080/inventory/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(InventoryList),
    })
      .then(() => {
        console.log("Location Updated");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating location:", error);
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
              View Inventory
            </Typography>
          </CardContent>
        </Card>
      </Grid>
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
                  Location
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  SubLocation
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Item Description
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Quantity
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Consumed Quantity
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Scrapped Quantity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((inventory) => (
                  <TableRow
                    key={inventory.consigneeName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* <TableCell component='th' scope='row'>
                  {attendence.name}
                </TableCell> */}

                    <TableCell align="right">
                      {inventory.locationName}
                    </TableCell>
                    <TableCell align="right">
                      {inventory?.address?.address || ""}
                    </TableCell>
                    <TableCell align="right">{inventory.description}</TableCell>
                    <TableCell align="right">{inventory.quantity}</TableCell>
                    <TableCell align="right">
                      {inventory.consumedItem}
                    </TableCell>
                    <TableCell align="right">
                      {inventory.scrappedItem}
                    </TableCell>
                    <Box>
                      <Link to={`/updateInventory/${inventory.id}`}>
                        <Button variant="contained">Update</Button>
                      </Link>

                      <Button
                        sx={{ marginLeft: "11px" }}
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteInventory(inventory.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={inventoryData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
    </>
  );
};

export default InventoryList;
