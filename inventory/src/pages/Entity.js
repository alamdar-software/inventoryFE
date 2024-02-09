import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import { useEffect } from "react";
import EntityTable from "../components/EntityTable.js";
import { useSelector } from "react-redux";
// const currency = {
//   currencyName: "",
// };

export default function Entity() {
  const { currentUser } = useSelector((state) => state.persisted.user);
  const [entity, setEntity] = useState({
    entityName: "",
  });
  const [Loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
  const [data, setdata] = useState([]);
  console.log(entity);

  useEffect(() => {
    const getCurrency = async () => {
      const res = await fetch("http://localhost:8080/entity/view", {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });

      const data = await res.json();

      console.log(data, "backdata");
      setdata(data);
    };
    getCurrency();
  }, []);
  const handleClick = async () => {
    const res = await fetch("http://localhost:8080/entity/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entity),
    });
    const data = await res.json();
    console.log(data);
    window.location.reload();

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
            <Typography
              variant="h4"
              color="secondary"
              gutterBottom
              style={{ fontFamily: "'EB Garamond'" }}
            >
              Create Entity
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
              label="Enter Entity"
              variant="outlined"
              /*  value={currency?.currencyName} */
              onChange={(e) =>
                setEntity({
                  entityName: e.target.value,
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
          <EntityTable data={data} />
        </div>
      </Card>
    </>
  );
}
