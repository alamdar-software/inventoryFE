import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DashboardIcon from "@mui/icons-material/Dashboard";
import IsoIcon from "@mui/icons-material/Iso";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddCardIcon from "@mui/icons-material/AddCard";
import CategoryIcon from "@mui/icons-material/Category";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RingVolumeIcon from "@mui/icons-material/RingVolume";
import ReportIcon from "@mui/icons-material/Report";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/slice/UserSlice";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  /* backgroundColor: "#090979+", */
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar({ children }) {
  const { currentUser } = useSelector((state) => state.persisted.user);
  console.log(currentUser.roles[0], "kyahhai");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const roleSuperAdmin =
    currentUser && currentUser.roles[0] === "ROLE_SUPERADMIN";
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    {
      text: "Location/Vessel",
      icon: <LocationOnIcon />,
      submenu: [{ text: "Add Location" }, { text: "View Location" }],
    },
    { text: "Pick up", icon: <IsoIcon /> },
    { text: "Entity", icon: <AddCardIcon /> },
    { text: "Currency", icon: <CurrencyRupeeIcon /> },
    { text: "UOM", icon: <DriveFileRenameOutlineIcon /> },
    { text: "Shipper", icon: <LocalShippingIcon /> },
    { text: "Consignee", icon: <AddCardIcon /> },
    { text: "Category", icon: <CategoryIcon /> },
    { text: "Brand", icon: <BrandingWatermarkIcon /> },
    { text: "Item", icon: <Inventory2Icon /> },
    {
      text: "Inventory",
      icon: <TransferWithinAStationIcon />,
      submenu: [{ text: "Add Inventory" }, { text: "View Inventory" }],
    },
    /* { text: "Transfer Item", icon: <WhatshotIcon /> }, */
    {
      text: "Transfer Item",
      icon: <WhatshotIcon />,
      submenu: [
        {
          text: "transfer-item",
          icon: <AddCardIcon />,
        },
        { text: "View Transfer" },
      ],
    },
    {
      text: "Consume Item",
      icon: <HighlightOffIcon />,
      submenu: [
        {
          text: "Add ConsumedItem",
          icon: <AddCardIcon />,
        },
        { text: "View ConsumedItem" },
      ],
    },
    {
      text: "Scrapped Item",
      icon: <LocationOnIcon />,
      submenu: [
        {
          text: "Add ScrappedItem",
          icon: <AddCardIcon />,
        },
        { text: "View ScrappedItem" },
      ],
    },
    {
      text: "Incoming Stock",
      icon: <RingVolumeIcon />,
      submenu: [{ text: "Add Incoming" }, { text: "View Incoming" }],
    },

    { text: "Reports", icon: <ReportIcon /> },
  ];
  if (roleSuperAdmin) {
    menuItems.push({
      text: "Users",
      icon: <RingVolumeIcon />,
      submenu: [{ text: "Add User" }, { text: "View User" }],
    });
  }
  const [openSubMenu, setOpenSubMenu] = React.useState(null);

  const handleSubMenuClick = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(signoutSuccess());
    navigate("/login");
    window.location.reload();
    // Implement your logout logic here
    // For example, dispatch a logout action or redirect the user
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background:
            "linear-gradient(90deg, #090979 0%, #090979 35%, #00d4ff 100%)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ fontFamily: "'Roboto Serif', serif" }}
          >
            INVENTORY
          </Typography>

          {/* User Dropdown */}
          <div style={{ marginLeft: "auto" }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              aria-controls="user-menu"
              aria-haspopup="true"
              aria-label="user-menu"
            >
              <div
                style={{
                  fontSize: "18px",
                  marginRight: "8px",
                  backgroundColor: "blue",
                  padding: "4px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  borderRadius: "20px",
                }}
              >
                {currentUser.roles[0].split("_")[1]}
              </div>
              <AccountCircleIcon style={{ fontSize: 50 }} />
              {currentUser && (
                <Typography
                  variant="body1"
                  style={{
                    fontSize: 18,
                    marginLeft: "8px",
                    fontWeight: "bold",
                  }}
                >
                  {currentUser.username} <br></br>
                  {/* Assuming the user object has a 'name' property */}
                </Typography>
              )}
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {/* Display user information */}
              <MenuItem disabled>{/* Add user info here */}</MenuItem>
              <MenuItem onClick={() => navigate("/change-password")}>
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{}}>
        <DrawerHeader
          sx={{
            // backgroundImage: `url(${sidebar})`,
            backgroundSize: "cover",
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            // backgroundImage: `url(${sidebar})`,
            backgroundSize: "cover",
          }}
        >
          {menuItems.map((item, index) => (
            <div key={item.text}>
              <ListItem disablePadding>
                <Link
                  to={
                    item.submenu
                      ? "#" // Change this to handle submenu click
                      : `/${item.text.toLowerCase().replace(" ", "-")}`
                  }
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => handleSubMenuClick(index)}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                    {item.submenu && (
                      <IconButton
                        sx={{
                          marginLeft: "auto",
                          visibility: open ? "visible" : "hidden",
                        }}
                      >
                        {openSubMenu === index ? (
                          <ChevronLeftIcon />
                        ) : (
                          <ChevronRightIcon />
                        )}
                      </IconButton>
                    )}
                  </ListItemButton>
                </Link>
              </ListItem>
              {item.submenu && openSubMenu === index && (
                <List>
                  {item.submenu.map((subitem) => (
                    <ListItem
                      key={subitem.text}
                      disablePadding
                      sx={{
                        display: "block",
                        paddingLeft: theme.spacing(4),
                      }}
                    >
                      <Link
                        to={
                          subitem.link
                            ? `/${subitem.link}`
                            : `/${subitem.text.toLowerCase().replace(" ", "-")}` // Use the subitem's text for the link
                        }
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                        >
                          <ListItemText
                            primary={subitem.text}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Grid spacing={3} sx={{}}>
          {/* Add some content or debug info */}

          {children}
        </Grid>
      </Box>
    </Box>
  );
}
