import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import IsoIcon from '@mui/icons-material/Iso';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddCardIcon from '@mui/icons-material/AddCard';
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import ReportIcon from '@mui/icons-material/Report';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Location/Vessel', icon: <LocationOnIcon /> },
    { text: 'Pick up', icon: <IsoIcon /> },
    { text: 'Currency', icon: <CurrencyRupeeIcon /> },
    { text: 'UOM', icon: <DriveFileRenameOutlineIcon /> },
    { text: 'Shipper', icon: <LocalShippingIcon /> },
    { text: 'Consignee', icon: <AddCardIcon /> },
    { text: 'Category', icon: <CategoryIcon /> },
    { text: 'Brand', icon: <BrandingWatermarkIcon /> },
    { text: 'Item', icon: <Inventory2Icon /> },
    { text: 'Inventory', icon: <TransferWithinAStationIcon /> },
    { text: 'Transfer Item', icon: <WhatshotIcon /> },
    { text: 'Consume Item', icon: <HighlightOffIcon /> },
    { text: 'Scrapped Item', icon: <LocationOnIcon /> },
    { text: 'Incoming Stock', icon: <RingVolumeIcon /> },
    { text: 'User', icon: <PersonIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Reports', icon: <ReportIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open} sx={{ backgroundColor: 'teal' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Grid
          container
          spacing={3}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Grid item xs={12} sm={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant='h5' component='div'>
                  items
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                  adjective
                </Typography>
                <Typography variant='body2'>
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small'>Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant='h5' component='div'>
                  items
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                  adjective
                </Typography>
                <Typography variant='body2'>
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small'>Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant='h5' component='div'>
                  items
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                  adjective
                </Typography>
                <Typography variant='body2'>
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small'>Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant='h5' component='div'>
                  items
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                  adjective
                </Typography>
                <Typography variant='body2'>
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small'>Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
