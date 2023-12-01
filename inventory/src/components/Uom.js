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

const Uom = () => {
  const [unit, setunit] = useState();
  const handleChange = (e) => {
    setunit(e.target.value);
  };
  console.log(unit);

  const handleClick = (e) => {
    try {
      const formData = { unit };
      console.log(formData);
    } catch (error) {}
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
              id="outlined-basic"
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
      </Card>
    </>
  );
};

export default Uom;
