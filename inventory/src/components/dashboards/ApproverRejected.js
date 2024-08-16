import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CountertopsIcon from '@mui/icons-material/Countertops';
import DatasetIcon from '@mui/icons-material/Dataset';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';

import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchItem } from '../../redux/slice/ItemSlice';
import { useEffect } from 'react';
const bull = (
  <Box
    component='span'
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
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
      main: '#f44336',
    },
  },
});

const ApproverRejected = () => {
  const [isBlinking, setIsBlinking] = React.useState(true);
  useEffect(() => {
    // Toggle blinking every 1 second
    const interval = setInterval(() => {
      setIsBlinking((prevIsBlinking) => !prevIsBlinking);
    }, 900);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);
  const [ciplCount, setciplCount] = React.useState(0)
  const [mto, setmto] = React.useState(0)
  const [scrappedcount, setscrappedcount] = React.useState(0)
  const [consumedCount, setconsumedCount] = React.useState(0)
  const [incomingcount, setincomingcount] = React.useState(0)
  const [itcount, setitcount] = React.useState(0)
  const state = useSelector((state) => state);
  const { currentUser } = state.persisted.user;

  const roleVerifier = currentUser && currentUser.roles[0] === 'ROLE_VERIFIER';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItem(currentUser.accessToken));
  }, []);


  useEffect(() => {
    dispatch(fetchItem(currentUser.accessToken));
  }, []);


  useEffect(() => {
    const getciplCount = async () => {

      const res = await fetch("http://localhost:8080/cipl/approverrejectedCount", {
        method: "get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
      const data = await res.json();
      console.log(data, "inventorycount");
      setciplCount(data?.totalCount || 0)
    }
    getciplCount();
    const getitCount = async () => {

      const res = await fetch("http://localhost:8080/internaltransfer/approverrejectedCount", {
        method: "get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
      const data = await res.json();
      console.log(data, "inventorycount");
      setitcount(data?.totalCount || 0)
    }
    getitCount();
    const getincomingCount = async () => {

      const res = await fetch("http://localhost:8080/bulkstock/approverrejectedCount", {
        method: "get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
      const data = await res.json();
      console.log(data, "inventorycount");
      setincomingcount(data?.totalCount || 0)
    }
    getincomingCount();
    const getscrappedCount = async () => {

      const res = await fetch("http://localhost:8080/scrappeditem/approverrejectedCount", {
        method: "get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
      const data = await res.json();
      console.log(data, "inventorycount");
      setscrappedcount(data?.totalCount || 0)
    }
    getscrappedCount();
    const getconsumedCount = async () => {

      const res = await fetch("http://localhost:8080/consumeditem/approverrejectedCount", {
        method: "get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
      const data = await res.json();
      console.log(data, "inventorycount");
      setconsumedCount(data?.totalCount || 0)
    }
    getconsumedCount();
    const getmtoCount = async () => {

      const res = await fetch("http://localhost:8080/mto/approverrejectedCount", {
        method: "get",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      })
      const data = await res.json();
      console.log(data.totalCount, "inventorycounttt");
      setmto(data?.totalCount || 0)
    }
    getmtoCount();

  }, [])
  if (currentUser && currentUser.roles) {
    if (roleVerifier) {
      return (
        <>
          {/* <img src={inv}></img> */}
          <Grid
            sx={{
              // backgroundImage: `url(${inventory})`, // Use the imported image as the background
              // backgroundSize: 'cover',
              margin: '-30px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 15,
                marginRight: 25,
              }}
            >
              <Card
                sx={{
                  flex: 1,
                  marginRight: 3,
                  marginLeft: 3,
                  marginTop: 3,
                  borderRadius: 5,
                  width: '80px !important',
                  height:"200px",

                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)', // Adjust the scaling factor as needed
                  },
                }}
              >
                <Link
                  to={'/approvalCiplRejected'}
                  style={{ textDecoration: 'none', position: 'relative' }}
                >
                  <CardContent>
                    {/* Your small box */}
                    <Box
                      sx={{
                        height:"200px",
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundColor: 'white', // Set your desired color
                        color: 'white', // Set your desired text color
                        padding: 2,
                      }}
                    >
                      {/* <CountertopsIcon
                  fontSize='large'
                  color='primary'
                  sx={{ fontSize: '70px' }}
                /> */}
                    </Box>

                    <SummarizeIcon
                      fontSize='large'
                      color='primary'
                      sx={{
                        fontSize: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        // justifyContent: 'center',
                      }}
                    />

                    <Typography
                      sx={{
                        mb: 1.5,
                        textAlign: 'center',
                        fontWeight: 'bolder',
                        fontSize:20,
                        fontFamily: 'Montserrat',
                      }}
                      color='#333'
                      variant='h5'
                      component='div'
                    >
                      Approver Rejected Cipl
                    </Typography>
                    <Typography
                      sx={{
                        mb: -6,

                        ml: 3,
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
                  </CardContent>
                </Link>
              </Card>

              <Card
                sx={{
                  //border: '2px solid yellow',
                  minWidth: 40,
                  width: '80px !important',
                  height:"200px",
                  flex: 1,
                  marginTop: 3,
                  marginLeft: 3,
                  borderRadius: 8,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)', // Adjust the scaling factor as needed
                  },
                }}
              >
                <Link to={'/approvalMtoRejected'} style={{ textDecoration: 'none' }}>
                  <CardContent>
                    <ArticleIcon
                      fontSize='large'
                      color='secondary'
                      sx={{ fontSize: '50px' }}
                    />
                    <Typography
                      variant='h5'
                      color='#333'
                      component='div'
                      sx={{
                        mb: 1.5,
                        fontSize:20,
                        textAlign: 'center',
                        fontWeight: 'bolder',
                        fontFamily: 'Montserrat',
                      }}
                    >
                      Approver Rejected Mto
                    </Typography>
                    <Typography
                      sx={{
                        mb: -6,
                        
                        ml: 3,
                        fontWeight: 'bold', // Set font weight to bold
                        animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
                        color: 'green',
                        textAlign: 'center' // Set the text color to blue
                      }}
                      variant="h4"
                      color="text.secondary"
                    >
                      {mto}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
              <Card
                sx={{
                  //border: '2px solid yellow',
                  minWidth: 20,
                  flex: 1,
                  marginLeft: 3,
                  borderRadius: 8,
                  marginTop: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)', // Adjust the scaling factor as needed
                  },
                }}
              >
                <Link to={'/approvalItRejected'} style={{ textDecoration: 'none' }}>
                  <CardContent>
                    <SummarizeIcon
                      fontSize='large'
                      sx={{ fontSize: '50px', color: '#ff0000' }}
                    />
                    <Typography
                      variant='h5'
                      component='div'
                      color='#333'
                      sx={{
                        mb: 1.5,
                        fontSize:20,
                        textAlign: 'center',
                        fontWeight: 'bolder',
                        fontFamily: 'Montserrat',
                      }}
                    >
                      Approver Rejected It
                    </Typography>
                    <Typography
                      sx={{
                        mb: -6,

                        ml: 3,
                        fontWeight: 'bold', // Set font weight to bold
                        animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
                        color: 'green',
                        textAlign: 'center' // Set the text color to blue
                      }}
                      variant="h4"
                      color="text.secondary"
                    >
                      {itcount}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
              <Card
                sx={{
                  //border: '2px solid yellow',
                  minWidth: 20,
                  flex: 1,
                  marginLeft: 3,
                  borderRadius: 8,
                  marginTop: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)', // Adjust the scaling factor as needed
                  },
                }}
              >
                <Link to={'/approvalIncomingRejected'} style={{ textDecoration: 'none' }}>
                  <CardContent>
                    <ArticleIcon
                      fontSize='large'
                      sx={{ fontSize: '50px', color: '#c6ff00' }}
                    />
                    <Typography
                      variant='h5'
                      component='div'
                      
                      color='#333'
                      sx={{
                        mb: 1.5,
                        textAlign: 'center',
                        fontWeight: 'bolder',
                        fontSize:20,
                        fontFamily: 'Montserrat',
                      }}
                    >
                      Approver Rejected Incoming Stock
                    </Typography>
                    <Typography
                      sx={{
                        mb: -6,
                       
                        ml: 3,
                        fontWeight: 'bold', // Set font weight to bold
                        animation: isBlinking ? 'blinkingText 1s infinite' : 'none', // Apply blinking animation
                        color: 'green',
                        textAlign: 'center' // Set the text color to blue
                      }}
                      variant="h4"
                      color="text.secondary"
                    >
                      {incomingcount}
                    </Typography>


                  </CardContent>
                </Link>
              </Card>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 5,
                paddingRight: 560,
              }}
            >
              <Card
                sx={{
                  //border: '2px solid yellow',
                  minWidth: 70,
                  width: '100px !important',
                  height:"200px",
                  flex: 1,
                  marginRight: 3,
                  marginLeft: 3,
                  marginTop: 3,
                  borderRadius: 8,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)', // Adjust the scaling factor as needed
                  },
                }}
              >
                <Link
                  to={'/approvalScrapRejected'}
                  style={{ textDecoration: 'none' }}
                >
                  <CardContent
                  // sx={{
                  //   display: 'flex',
                  //   flexDirection: 'column',
                  //   alignItems: 'start',
                  // }}
                  >
                    <ArticleIcon
                      fontSize='large'
                      sx={{ fontSize: '50px', color: '#c6ff00' }}
                    />

                    <Typography
                      sx={{
                        fontSize:20,
                        mb: 1.5,
                        textAlign: 'center',
                        fontWeight: 'bolder',
                        fontFamily: 'Montserrat',
                      }}
                      color='#333'
                      variant='h5'
                      component='div'
                    >
                      Approver Rejected Scrapped Stock
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
        {scrappedcount}
      </Typography>
                  </CardContent>
                </Link>
              </Card>
              <Card
                sx={{
                  //border: '2px solid yellow',
                  minWidth: 10,
                  flex: 1,
                  marginRight: 3,
                  marginLeft: 3,
                  marginTop: 3,
                  borderRadius: 8,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)', // Adjust the scaling factor as needed
                  },
                }}
              >
                <Link to={'/approvalConsumeRejected'} style={{ textDecoration: 'none' }}>
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'start',
                    }}
                  >
                    <SummarizeIcon
                      fontSize='large'
                      sx={{ fontSize: '50px', color: '#64dd17' }}
                    />

                    <Typography
                      sx={{
                        mb: 1.5,
                        fontSize:20,
                        textAlign: 'center',
                        fontWeight: 'bolder',
                        fontFamily: 'Montserrat',
                      }}
                      color='#333'
                      variant='h5'
                      component='div'
                    >
                      Approver Rejected Consumed Stock
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
        {consumedCount}
      </Typography>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </Grid>
        </>
      );
    }
  }
};

export default ApproverRejected;
