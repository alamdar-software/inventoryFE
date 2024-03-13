import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import CountertopsIcon from "@mui/icons-material/Countertops";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DatasetIcon from "@mui/icons-material/Dataset";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from "@mui/icons-material/Description";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import inventory from "../assects/inventory.jpg";
import { Badge, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchItem } from "../redux/slice/ItemSlice";
import { useEffect } from "react";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const theme = createTheme({
  palette: {
    yellow: {
      main: purple[500],
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const Dashboard = () => {
 
  const [isBlinking, setIsBlinking] = React.useState(true);
  const [invCount, setinvCount] = React.useState(0)
  const [locationCount, setlocationCount] = React.useState(0)
  const [itemCount, setitemCount] = React.useState(0)
  const [ciplCount, setciplCount] = React.useState(0)
  const [consumedCount, setconsumedCount] = React.useState(0)
  const [scrappedCount, setscrappedCount] = React.useState(0)
  const [incomingCount, setincomingCount] = React.useState(0)
  const [approvalTotalCount, setapprovalTotalCount] = React.useState(0)
  const [verifierTotalCount, setverifierTotalCount] = React.useState(0)


  useEffect(() => {
    // Toggle blinking every 1 second
    const interval = setInterval(() => {
      setIsBlinking((prevIsBlinking) => !prevIsBlinking);
    }, 900);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;
  const roleSuperAdmin =
    currentUser && currentUser.roles[0] === "ROLE_SUPERADMIN";
  const rolePreparer = currentUser && currentUser.roles[0] === "ROLE_PREPARER";
  const roleVerifier = currentUser && currentUser.roles[0] === "ROLE_VERIFIER";
  const roleApprover = currentUser && currentUser.roles[0] === "ROLE_APPROVER";
  const roleOthers = currentUser && currentUser.roles[0] === "ROLE_OTHER";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItem(currentUser.accessToken));
  }, []);
  useEffect(() => {
    const getinvCount=async()=>{

      const res = await fetch("http://localhost:8080/inventory/count",{
        method:"get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
        const data = await res.json();
        console.log(data.totalCount,"inventorycount");
        setinvCount(data?.totalCount)
    }
    getinvCount();
    const getapprovalTotalCount=async()=>{

      const res = await fetch("http://localhost:8080/incomingstock/approvedTotalCount",{
        method:"get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
        const data = await res.json();
        console.log(data.totalCount,"inventorycount");
        setapprovalTotalCount(data?.totalCount)
    }
    getapprovalTotalCount();
    const getverifierTotalCount=async()=>{

      const res = await fetch("http://localhost:8080/incomingstock/totalCount",{
        method:"get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
        const data = await res.json();
        console.log(data.totalCount,"inventorycount");
        setverifierTotalCount(data?.totalCount)
    }
    getverifierTotalCount();

    const getincomingCount=async()=>{

      const res = await fetch("http://localhost:8080/bulkstock/view",{
        method:"get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
        const data = await res.json();
       
        setincomingCount(data?.totalCount)
    }
    getincomingCount();
   
  }, [])
  useEffect(() => {
    const getconsumedCount=async()=>{

      const res = await fetch("http://localhost:8080/consumeditem/count",{
        method:"get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
        const data = await res.json();
        setconsumedCount(data?.totalCount)
     
    }
    const getScrappedCount=async()=>{

      const res = await fetch("http://localhost:8080/scrappeditem/count",{
        method:"get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
        const data = await res.json();
        setscrappedCount(data?.totalCount)
        
    }
    getconsumedCount();
    getScrappedCount();

   
  }, [])

  useEffect(() => {
    const getciplCount=async()=>{

      const res = await fetch("http://localhost:8080/cipl/count",{
        method:"get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
        const data = await res.json();
        setciplCount(data?.totalCount)
        console.log(invCount,"inventorycount");
    }
    getciplCount();
   
  }, [])
  useEffect(() => {
    const getlocationCount=async()=>{

      const res = await fetch("http://localhost:8080/location/count",{
        method:"get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
        const data = await res.json();
        setlocationCount(data?.totalCount)
        
    }
    getlocationCount();
   
  }, [])
  useEffect(() => {
    const getitemCount=async()=>{

      const res = await fetch("http://localhost:8080/item/count",{
        method:"get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
        const data = await res.json();
        setitemCount(data?.totalCount)
    
    }
    getitemCount();
   
  }, [])
  

  if (currentUser && currentUser.roles) {
    if (roleSuperAdmin) {
      return (
        // Render grid for ROLE_SUPERADMIN
        <Grid
        item xs={12}
          sx={{
            // backgroundImage: `url(${inventory})`, // Use the imported image as the background
            // backgroundSize: 'cover',
            margin: "-7px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", marginTop: -32,paddingBottom:10 }}>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                height:"160px",
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 4,
                borderRadius: 1,
                paddingBottom:5,
                width: "90px !important",

                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-inventoryMoc"}
                style={{ textDecoration: "none", position: "relative" }}
              >
                <CardContent>
                  {/* Your small box */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                     mb:1,
                      backgroundColor: "white", // Set your desired color
                      color: "white", // Set your desired text color
                      padding: 1,
                    }}
                  >
                    {/* <CountertopsIcon
                  fontSize='large'
                  color='primary'
                  sx={{ fontSize: '70px' }}
                /> */}
                  </Box>

                  <CountertopsIcon
                    fontSize="large"
                    color="primary"
                    sx={{
                      fontSize: "50px",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: 'center',
                    }}
                  />

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
        sx={{
          mb: 1.5,
          ml:3,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Moc
      </Typography>
      <Typography
        sx={{
          mb: -6,
        
          ml:3,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'green',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {invCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>

            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 40,
                flex: 1,
                marginTop: 4,
                marginLeft: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/datacount"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DatasetIcon
                    fontSize="large"
                    color="secondary"
                    sx={{ fontSize: "50px" }}
                  />
                  <Typography
                    variant="h5"
                    color="#333"
                    component="div"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Daily Data Count
                  </Typography>
                  
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 1,
                marginTop: 4,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Reports"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <AssessmentIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#ff0000" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Reports
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 1,
                marginTop: 4,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Items"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DescriptionIcon
                    fontSize="50px"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />
                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
        sx={{
          mb: 1.5,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Items
      </Typography>
      <Typography
        sx={{
          mb: -4,
          ml:4,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'green',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {itemCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>
          </div>



          <div style={{ display: "flex", flexDirection: "row", marginTop: 3,marginRight:-20 }}>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                width: "90px !important",
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-location"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                // sx={{,
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'start',
                // }}
                >
                  <LocationOnIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "black" }}
                  />

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginBottom:"-20px" }}>
                  <Typography
        sx={{
          mb: 0,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          mb:1,
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Location/Vessel
      </Typography>
      <Typography
        sx={{
          mb: -20,
          mb: 1.5,
          ml:4,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'green',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {locationCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-inventory"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#64dd17" }}
                  />

                  {/* <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Inventory
                  </Typography> */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
        sx={{
          mb: 1.5,
          ml:10,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Inventory
      </Typography>
      <Typography
        sx={{
          mb: -6,
        
          ml:16,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'green',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {invCount}
      </Typography>
      </div>


                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-transfer"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#9e9e9e", fontSize: "50px" }}
                  />

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
        sx={{
          mb: 1.5,
          ml:6,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Transfer Item
      </Typography>
      <Typography
        sx={{
          mb: -6,
        
          ml:10,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'green',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {ciplCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >



              <Link
                to={"/view-consumeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#795548", fontSize: "50px" }}
                  />

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
        sx={{
          mb: 1.5,
          ml:5,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Consumed Item
      </Typography>
      <Typography
        sx={{
          mb: -6,
        
          ml:10,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'green',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {consumedCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3,paddingBottom:"-5px" }}>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                height:"160px",
                //border: '2px solid yellow',
                minWidth: 20,
                paddingBottom:"-15px" ,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-incoming"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#ff5722", fontSize: "50px" }}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',paddingBottom:"-20px" }}>
                  <Typography
        sx={{
          mb: 1.5,
          ml:5,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Incomming Stock
      </Typography>
      <Typography
        sx={{
          mb: -6,
        
          ml:7,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'green',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {incomingCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                height:"160px",
                minWidth: 20,
                paddingBottom:"-20px",
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-scrappeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#00bcd4", fontSize: "50px" }}
                  />

           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',paddingBottom:"-45px" }}>
                  <Typography
        sx={{
          mb: 6,
          ml:7,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Scrapped Item
      </Typography>
      <Typography
        sx={{
       
        mt:-5,
          ml:7,
         
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'green',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {scrappedCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        </Grid>
      );
    } else if (rolePreparer) {
      return (
        <Grid
          sx={{
            // backgroundImage: `url(${inventory})`, // Use the imported image as the background
            // backgroundSize: 'cover',
            margin: "-30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                width: "100px !important",

                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-inventoryMoc"}
                style={{ textDecoration: "none", position: "relative" }}
              >
                <CardContent>
                  {/* Your small box */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "white", // Set your desired color
                      color: "white", // Set your desired text color
                      padding: 2,
                    }}
                  >
                    {/* <CountertopsIcon
                  fontSize='large'
                  color='primary'
                  sx={{ fontSize: '70px' }}
                /> */}
                  </Box>

                  <CountertopsIcon
                    fontSize="large"
                    color="primary"
                    sx={{
                      fontSize: "50px",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: 'center',
                    }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    MOC
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>

            <Card
              sx={{
                height:"200px",
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 40,
                flex: 1,
                marginTop: 5,
                marginLeft: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/datacount"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DatasetIcon
                    fontSize="large"
                    color="secondary"
                    sx={{ fontSize: "50px" }}
                  />
                  <Typography
                    variant="h5"
                    color="#333"
                    component="div"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Daily Data Count
                  </Typography>
                  
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 1,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Reports"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <AssessmentIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#ff0000" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Reports
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 1,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Items"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DescriptionIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Items
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/locationDashboard"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'start',
                // }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Location/Vessel
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-inventory"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#64dd17" }}
                  />

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
        sx={{
          mb: 1.5,
          ml:10,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Inventory
      </Typography>
      <Typography
        sx={{
          mb: -6,
        
          ml:16,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'green',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {invCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/transfer-item"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#9e9e9e", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Transfer Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Link
                to={"/view-consumeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#795548", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h6"
                    component="div"
                  >
                    Consumed Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,

                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-incoming"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#ff5722", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Incomming Stock
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,

                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-scrappeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#00bcd4", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Scrapped Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
        </Grid>
        // Render grid for ROLE_PREPARER
      );
    } else if (roleVerifier) {
      return (
        <Grid
          sx={{
            // backgroundImage: `url(${inventory})`, // Use the imported image as the background
            // backgroundSize: 'cover',
            margin: "-30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                height:"200px",
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 40,
                flex: 1,
                marginTop: 3,
                marginLeft: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/datacount"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DatasetIcon
                    fontSize="large"
                    color="secondary"
                    sx={{ fontSize: "50px" }}
                  />
                  <Typography
                    variant="h5"
                    color="#333"
                    component="div"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Daily Data Count
                  </Typography>
                  
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 1,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Reports"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <AssessmentIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#ff0000" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Reports
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-inventory"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#64dd17" }}
                  />

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
        sx={{
          mb: 1.5,
          ml:10,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Inventory
      </Typography>
      <Typography
        sx={{
          mb: -6,
        
          ml:16,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'green',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {invCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                width: "100px !important",

                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/need-verfication"}
                style={{ textDecoration: "none", position: "relative" }}
              >
                <CardContent>
                  {/* Your small box */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "white", // Set your desired color
                      color: "white", // Set your desired text color
                      padding: 2,
                    }}
                  >
                    {/* <CountertopsIcon
                fontSize='large'
                color='primary'
                sx={{ fontSize: '70px' }}
              /> */}
                  </Box>

                  <CountertopsIcon
                    fontSize="large"
                    color="primary"
                    sx={{
                      fontSize: "50px",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: 'center',
                    }}
                  />

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
        sx={{
          mb: 1.5,
          ml:3,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
       Need Verification
      </Typography>
      <Typography
        sx={{
          mb: -6,
        
          ml:3,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'red',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {verifierTotalCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/verfied"} style={{ textDecoration: "none" }}>
                <CardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'start',
                // }}
                >
                  <CheckBoxIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Verified
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/verified-rejected"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'start',
                // }}
                >
                  <CancelIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "red" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Verifier Rejected
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>

            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/approver-rejected"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <ThumbDownAltIcon
                    fontSize="large"
                    style={{ color: "red", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Approver Rejected
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Link
                to={"/view-consumeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <DownloadDoneIcon
                    fontSize="large"
                    style={{ color: "#795548", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h6"
                    component="div"
                  >
                    Bulk Verify/Reject Purchase
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
        </Grid>
        // Render grid for ROLE_VERIFIER
      );
    } else if (roleApprover) {
      return (
        <Grid
          sx={{
            // backgroundImage: `url(${inventory})`, // Use the imported image as the background
            // backgroundSize: 'cover',
            margin: "-30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                height:"200px",
                //border: '2px solid yellow',
                minWidth: 40,
                flex: 1,
                marginTop: 3,
                marginLeft: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/datacount"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DatasetIcon
                    fontSize="large"
                    color="secondary"
                    sx={{ fontSize: "50px" }}
                  />
                  <Typography
                    variant="h5"
                    color="#333"
                    component="div"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Daily Data Count
                  </Typography>
               
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 1,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Reports"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <AssessmentIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#ff0000" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Reports
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-inventory"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#64dd17" }}
                  />

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
        sx={{
          mb: 1.5,
          ml:10,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Inventory
      </Typography>
      <Typography
        sx={{
          mb: -6,
        
          ml:16,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'green',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {invCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                width: "100px !important",

                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/need-approval"}
                style={{ textDecoration: "none", position: "relative" }}
              >
                <CardContent>
                  {/* Your small box */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "white", // Set your desired color
                      color: "white", // Set your desired text color
                      padding: 2,
                    }}
                  >
                    {/* <CountertopsIcon
                fontSize='large'
                color='primary'
                sx={{ fontSize: '70px' }}
              /> */}
                  </Box>

                  <CountertopsIcon
                    fontSize="large"
                    color="primary"
                    sx={{
                      fontSize: "50px",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: 'center',
                    }}
                  />

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
        sx={{
          mb: 1.5,
          ml:3,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Need Approval
      </Typography>
      <Typography
        sx={{
          mb: -6,
        
          ml:3,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'red',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {approvalTotalCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 2,
              marginRight: 300,
              marginLeft: 380,
              height: 250,
              paddingBottom: 50,
            }}
          >
            <Card
              sx={{
                height:"200px",
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/approved"} style={{ textDecoration: "none" }}>
                <CardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'start',
                // }}
                >
                  <CheckBoxIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Approved
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                height:"200px",
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/approved-rejected"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'start',
                // }}
                >
                  <CancelIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "red" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Approver Rejected
                  </Typography>
                </CardContent>
              </Link>
            </Card>

           
          </div>
        </Grid>
        // Render grid for ROLE_APPROVER
      );
    } else if (roleOthers) {
      return (
        <Grid
          sx={{
            // backgroundImage: `url(${inventory})`, // Use the imported image as the background
            // backgroundSize: 'cover',
            margin: "-30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                width: "100px !important",

                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-inventoryMoc"}
                style={{ textDecoration: "none", position: "relative" }}
              >
                <CardContent>
                  {/* Your small box */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "white", // Set your desired color
                      color: "white", // Set your desired text color
                      padding: 2,
                    }}
                  >
                    {/* <CountertopsIcon
                  fontSize='large'
                  color='primary'
                  sx={{ fontSize: '70px' }}
                /> */}
                  </Box>

                  <CountertopsIcon
                    fontSize="large"
                    color="primary"
                    sx={{
                      fontSize: "50px",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: 'center',
                    }}
                  />

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
        sx={{
          mb: 1.5,
          ml:10,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Moc
      </Typography>
      <Typography
        sx={{
          mb: -6,
        
          ml:16,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'green',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {invCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>

            <Card
              sx={{
                height:"200px",
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 40,
                flex: 1,
                marginTop: 3,
                marginLeft: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/datacount"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DatasetIcon
                    fontSize="large"
                    color="secondary"
                    sx={{ fontSize: "50px" }}
                  />
                  <Typography
                    variant="h5"
                    color="#333"
                    component="div"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Daily Data Count
                  </Typography>
                 
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 1,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Reports"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <AssessmentIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#ff0000" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Reports
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginLeft: 3,
                borderRadius: 1,
                marginTop: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/Items"} style={{ textDecoration: "none" }}>
                <CardContent>
                  <DescriptionIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    color="#333"
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Items
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/locationDashboard"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'start',
                // }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#c6ff00" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Location/Vessel
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-inventory"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    sx={{ fontSize: "50px", color: "#64dd17" }}
                  />

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
        sx={{
          mb: 1.5,
          ml:10,
          textAlign: "center",
          fontWeight: "bolder",
          fontFamily: "Montserrat",
          color: 'black', // Set the text color to blue
        }}
        variant="h5"
        component="div"
      >
        Inventory
      </Typography>
      <Typography
        sx={{
          mb: -6,
        
          ml:16,
          fontWeight: 'bold', // Set font weight to bold
          animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
          color: 'green',
          textAlign: 'center' // Set the text color to blue
        }}
        variant="h4"
        color="text.secondary"
      >
        {invCount}
      </Typography>
      </div>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/transfer-item"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#9e9e9e", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Transfer Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,
                flex: 1,
                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Link
                to={"/view-consumeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#795548", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h6"
                    component="div"
                  >
                    Consumed Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 3 }}>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,

                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link to={"/view-incoming"} style={{ textDecoration: "none" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#ff5722", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Incomming Stock
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card
              sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                //border: '2px solid yellow',
                minWidth: 20,

                marginRight: 3,
                marginLeft: 3,
                marginTop: 3,
                borderRadius: 1,
                width: "23%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)", // Adjust the scaling factor as needed
                },
              }}
            >
              <Link
                to={"/view-scrappeditem"}
                style={{ textDecoration: "none" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <CountertopsIcon
                    fontSize="large"
                    style={{ color: "#00bcd4", fontSize: "50px" }}
                  />

                  <Typography
                    sx={{
                      mb: 1.5,
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontFamily: "Montserrat",
                    }}
                    color="#333"
                    variant="h5"
                    component="div"
                  >
                    Scrapped Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Count:
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </div>
        </Grid>
        // Render grid for ROLE_OTHER
      );
    }
  }
};

export default Dashboard;
