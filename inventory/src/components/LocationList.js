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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { fetchlocationsearch } from "../redux/slice/location";

const LocationList = () => {
  const [formData, setformData] = useState({
    locationName: "",
    address: ""
  });

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { currentUser } = useSelector((state) => state.persisted.user);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust as needed
  const [error, setError] = useState(null);
  const [location, setLocationName] = useState([]);
  const [selectedLocation, setselectedLocation] = useState("");
  const [selectedLocationId, setselectedLocationId] = useState(null);
  const [showError, setShowError] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    dispatch(fetchlocationsearch(currentUser.accessToken));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/location/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify({}) // If you need to send any initial data
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLocationName(result);
        console.log(result, "jumajiiiiiiiiiiiiii");
      });
  }, []);

  const handleSearch = async () => {
    console.log("I am here");
    console.log(formData, "lllllllllllllllllllllllllzz");
    try {
      const res = await fetch("http://localhost:8080/location/search", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      const response = await res.json();
      console.log(response,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuz");
      setLocationName(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLocation = async (id) => {
    console.log(id);
    fetch(`http://localhost:8080/location/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(LocationList),
    })
      .then(() => {
        console.log("Location deleted");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating location:", error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdateClick = (locationId) => {
    if (!locationId) {
      console.log("error happens");
      setShowError(true);
    } else {
      setShowError(false);
      window.location.href = `/updateLocation/${locationId}`;
    }
  };

  console.log(state, "heyyyy");
  return (
    <>
      <Grid>
        <Card
          color="secondary"
          sx={{
            width: "100%",
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
              Location/Vessel List
            </Typography>
          </CardContent>
        </Card>

        <Grid sx={{ mt: "33px" }}>
          <TableContainer
            component={Paper}
            sx={{ borderRadius: "33px", borderBottom: "2px solid yellow" }}
          >
            <div sx={{ backgroundColor: blue }}>

              <div style={{ display: 'flex', margin: "40px", gap: "30px" }}>
                <FormControl fullWidth sx={{ width: '70%' }}>
                  <InputLabel id='demo-simple-select-label'>Location</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={formData.locationName}
                    label='location'
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 120,
                        },
                      },
                    }}
                    onChange={(e) => setformData({
                      ...formData,
                      locationName: e.target.value
                    })}
                  >
                    {state?.nonPersisted?.location?.data?.map((item, index) => (
                      <MenuItem key={index} value={item?.locationName}>
                        {item?.locationName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ width: '70%' }}>
                  <InputLabel id='demo-simple-select-label'>Sub Location</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={formData.address}
                    label='address'
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 120,
                        },
                      },
                    }}
                    onChange={(e) => setformData({
                      ...formData,
                      address: e.target.value
                    })}
                  >
                    {state?.nonPersisted?.location?.data?.map((item, index) => (
                      <MenuItem key={index} value={item?.address}>
                        {item?.address}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                >
                  Search
                </Button>
              </div>
            </div>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    LocationName
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Sub Location
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {location
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((location, index) => (
                    <React.Fragment key={location.id}>
                      <TableRow
                        key={location.name}
                      >
                        <TableCell align="left">
                          {location?.locationName}
                        </TableCell>
                        <TableCell align="left">
                          {location?.address}
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/updateLocation/${location.id}`}
                          >
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={(e) => {
                                e.preventDefault();
                                handleUpdateClick(location.id);
                              }}
                            >
                              Update
                            </Button>
                          </Link>
                          <Button
                            sx={{ marginLeft: "11px" }}
                            variant="contained"
                            color="secondary"
                            onClick={() => deleteLocation(location.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={location.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <TableRow>
              <TableCell colSpan={5} align="center">
                <CustomTablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={totalRows}
                  rowsPerPage={5}
                  page={page}
                  slotProps={{
                    select: {
                      'aria-label': 'Rows per page',
                    },
                    actions: {
                      showFirstButton: true,
                      showLastButton: true,
                      slots: {
                        firstPageIcon: FirstPageRoundedIcon,
                        lastPageIcon: LastPageRoundedIcon,
                        nextPageIcon: ChevronRightRoundedIcon,
                        backPageIcon: ChevronLeftRoundedIcon,
                      },
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableCell>
            </TableRow>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

const blue = {
  200: '#A5D8FF',
  400: '#3399FF',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    width: 100%;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    box-shadow: 0px 4px 16px ${
      theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : grey[200]
    };
    border-radius: 12px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    overflow: hidden;
  }

  td,
  th {
    padding: 16px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)(
  ({ theme }) => `
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    font-family: 'IBM Plex Sans', sans-serif;
    padding: 2px 0 2px 4px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 6px; 
    background-color: transparent;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 100ms ease;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      border-color: ${blue[400]};
    }
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.actions} {
    display: flex;
    gap: 6px;
    border: transparent;
    text-align: center;
  }

  & .${classes.actions} > button {
    display: flex;
    align-items: center;
    padding: 0;
    border: transparent;
    border-radius: 50%; 
    background-color: transparent;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition: all 100ms ease;

    > svg {
      font-size: 22px;
    }

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      border-color: ${blue[400]};
    }

    &:disabled {
      opacity: 0.3;
      &:hover {
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
        background-color: transparent;
      }
    }
  }
  `,
);

export default LocationList;
