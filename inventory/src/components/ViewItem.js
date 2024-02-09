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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const ViewItem = () => {
  const [formData, setformData] = useState({
    itemName: "",
    description: "",
    name: "",
    unitName: "",
    minimumStock: "",
  });
  //   const [itemName, setItemName] = useState();
  //   const [minimumStock, setMinmumStock] = useState();
  //   const [description, setDescription] = useState();
  const [item, setItem] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/item/view")
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const itemArray = Object.values(result);
          setItem(itemArray);
        } else {
          console.error("Empty or invalid JSON response");
        }
      });
    //   .then((result) => {
    //     console.log(result);
    //     setItem(result);
    //   });
  }, []);
  const deleteItem = async (id) => {
    alert("Deleted Successfully!");
    console.log(id);
    fetch(`http://localhost:8080/item/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(item),
    })
      .then(() => {
        console.log("item Deleted");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating location:", error);
      });
  };
  return (
    <>
      <Card
        color="secondary"
        sx={{
          width: "100%",
          borderBottom: "2px solid #ab47bc",
        }}
      >
        <CardContent>
          <Typography variant="h4" color="secondary" gutterBottom>
            List Of Items
          </Typography>
        </CardContent>
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
                  Item Name
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Item Description
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Catagory
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  UOM
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Minimum Stock
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {item.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{item.itemName}</TableCell>
                  <TableCell align="right">{item.description}</TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="left">{item.unitName}</TableCell>
                  <TableCell align="left">{item.minimumStock}</TableCell>
                  <Link to={`/updateItem/${item.id}`}>
                    <Button sx={{ marginRight: "11px" }} variant="contained">
                      View Inventory
                    </Button>
                  </Link>

                  <Link
                    sx={{ marginLeft: "11px" }}
                    to={`/updateItem/${item.id}`}
                  >
                    <Button variant="contained">Update</Button>
                  </Link>
                  <Button
                    sx={{ marginLeft: "11px" }}
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </Button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default ViewItem;
