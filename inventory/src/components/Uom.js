import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
export const Uom = () => {
  const [unit, setunit] = useState({
    unitName: "",
  });
  const [Uom, setUom] = useState([]);

  console.log(unit);
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  useEffect(() => {
    const getUom = async () => {
      try {
        const res = await fetch("http://localhost:8080/unit/view");
        const data = await res.json();

        if (Array.isArray(data)) {
          setUom(data);
          console.log(data, "useeffect");
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUom();
  }, []);
  console.log(Uom, "uuuuuuuuuuuu");

  const handleClick = async () => {
    const res = await fetch("http://localhost:8080/unit/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unit),
    });
    const data = await res.text();
  };
  const handleChange = (e) => {
    setunit({
      [e.target.id]: e.target.value,
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
              Add UOM
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
              id="unitName"
              label="Unit Name"
              variant="outlined"
              onChange={handleChange}
              //   value={location}
              //   onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          //onClick={handleClick}
          sx={{
            mt: "33px",
            mb: "17px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
          onClick={handleClick}
        >
          Add
        </Button>
        <div>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, marginLeft: "5px" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Units</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Uom.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <button>Edit</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Card>
    </>
  );
};

export default Uom;
