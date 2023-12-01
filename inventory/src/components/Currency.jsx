import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import TableComp from "./TableComp.jsx";
// const currency = {
//   currencyName: "",
// };
export const Currency = () => {
  const [currency, setCurrency] = useState({
    currencyName: "",
  });
  const [Loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
  console.log(currency);

  const handleClick = async () => {
    const res = await fetch("http://192.168.0.121:8080/currency/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currency),
    });
    const data = await res.json();
    console.log(data);

    // fetch('http://localhost:8080/location/add', {
    //   method: 'POST',
    //   headers: { 'Content-type': 'application/json' },
    //   body: JSON.stringify(formData),
    // }).then(() => {
    //   console.log('Location Added');
    // });
  };
  /*   const handleChange = (e) => {
    setCurrency({
      currencyName: e.target.value,
    });
  }; */
  return (
    <>
      <Grid>
        <Card
          color="secondary"
          sx={{ width: "100%", backgroundColor: "secondary" }}
        >
          <CardContent>
            <Typography variant="h4" color="secondary" gutterBottom>
              Create Currency
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Card
        sx={{
          width: "100%",
          mt: "33px",
          pt: "33px",
          borderBottom: "2px solid grey",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ ml: "11px", justifyContent: "center" }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              name="currencyName"
              label="Enter Currency"
              variant="outlined"
              /*  value={currency?.currencyName} */
              onChange={(e) =>
                setCurrency({
                  currencyName: e.target.value,
                })
              }
              fullWidth
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
        <div sx={{ margin: "20px" }}>
          <TableComp />
        </div>
      </Card>
    </>
  );
};
