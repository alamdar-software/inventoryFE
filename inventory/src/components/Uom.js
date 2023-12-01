import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import { useState } from "react";

export const Uom = async () => {
  const [unit, setunit] = useState({
    name: "",
  });

  console.log(unit);

  const handleClick = async () => {
    const res = await fetch("http://192.168.0.121:8080/unit/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unit),
    });
    const data = await res.json();
    console.log(data);
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
            <Typography variant="h4" color="secondary" gutterBottom>
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
              id="name"
              label="Unit Name"
              variant="outlined"
              onChange={(e) =>
                setunit({
                  name: e.target.value,
                })
              }
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
      </Card>
    </>
  );
};

export default Uom;
