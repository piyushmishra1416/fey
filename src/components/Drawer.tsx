import * as React from "react";
import {
  styled,
  Theme,
  CSSObject,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { alpha, Button, InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px", // Fully rounded corners
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  borderRadius: "25px", // Fully rounded corners
  "& .MuiInputBase-input": {
    padding: "1%", // Using percentage padding for responsiveness
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%", // Ensure it takes the full width
    [theme.breakpoints.up("sm")]: {
      width: "50%", // Adjust the width for small screens
    },
    [theme.breakpoints.up("md")]: {
      width: "70%", // Adjust the width for medium screens
    },
    [theme.breakpoints.up("lg")]: {
      width: "80%", // Adjust the width for large screens
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const drawerWidth = 60; // Standard drawer width

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
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
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#000000",
  boxShadow: "none",
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
  backgroundColor: "#000000",
  color: "#FFFFFF",
  boxShadow: "none",
  "& .MuiDrawer-paper": {
    boxShadow: "none",
    borderRight: "none",
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "#000000",
      color: "#FFFFFF",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "#000000",
      color: "#FFFFFF",
    },
  }),
}));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BB86FC",
    },
    background: {
      default: "#161515",
      paper: "#121212",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#121212",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.text.primary,
  borderRadius: "20px",
  textTransform: "none",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "#333333",
  },
}));

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(true);
  const [currentDate, setCurrentDate] = useState("");

  // Use the theme hook

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ height: "15vh", justifyContent: "center", paddingX: "6%" }}
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
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <span style={{ fontWeight: "bold" }}>Hello, Jane</span> <br />
              <span style={{ color: "#959595" }}>{currentDate}</span>
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "flex" },
                gap: 1,
                ml: "auto",
              }}
            >
              <StyledButton
                variant="contained"
                color="primary"
                sx={{ color: "#959595" }}
                startIcon={<ExploreOutlinedIcon />}
              >
                For you
              </StyledButton>
              <StyledButton
                variant="contained"
                color="secondary"
                sx={{ color: "#959595" }}
                startIcon={<TvOutlinedIcon />}
              >
                Screener
              </StyledButton>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#959595" }} fontSize="large" />
                </SearchIconWrapper>
                <StyledInputBase inputProps={{ "aria-label": "search" }} />
              </Search>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton>
              <svg
                width="18"
                height="29"
                viewBox="0 0 18 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.0023 4.86847C14.0023 4.27515 13.7658 3.70609 13.3447 3.2863L11.7281 1.67969L2.31641 11.0521C1.84958 11.5162 1.47921 12.0673 1.22652 12.674C0.973819 13.2808 0.84375 13.9312 0.84375 14.588C0.84375 15.2448 0.973819 15.8952 1.22652 16.502C1.47921 17.1087 1.84958 17.6598 2.31641 18.1238L3.89702 19.7011C3.69238 18.727 3.73484 17.7175 4.02053 16.7639C4.30622 15.8102 4.82614 14.9425 5.53327 14.2393L13.3447 6.45065C13.7658 6.03086 14.0023 5.4618 14.0023 4.86847ZM13.3424 11.0375C13.7649 11.4609 14.0022 12.0347 14.0022 12.6329C14.0022 13.2312 13.7649 13.805 13.3424 14.2284L9.38858 18.1839C8.8241 18.7451 8.37672 19.4129 8.07241 20.1486C7.76811 20.8842 7.61295 21.673 7.61595 22.4692C7.61692 22.8845 7.65997 23.2986 7.74446 23.7053L6.18599 22.1033C5.23793 21.1533 4.70544 19.8658 4.70544 18.5235C4.70544 17.1811 5.23793 15.8936 6.18599 14.9437L11.7279 9.40254L13.3424 11.0375ZM13.3021 22.7473C13.5238 22.9594 13.7 23.2126 13.8202 23.492C13.9405 23.7714 14.0024 24.0714 14.0024 24.3745C14.0024 24.6776 13.9405 24.9776 13.8202 25.257C13.7 25.5365 13.5238 25.7896 13.3021 26.0017L11.6954 27.5671L10.0621 25.9692C9.16557 25.092 8.63499 23.9208 8.57339 22.6831C8.51179 21.4454 8.92357 20.2295 9.72873 19.2716L13.3021 22.7473Z"
                  fill="white"
                ></path>
              </svg>
            </IconButton>
          </DrawerHeader>
          <List sx={{ marginTop: "30vh" }}>
            {[
              { text: "Home", icon: <HomeIcon /> },
              { text: "Analysis", icon: <TroubleshootIcon /> },
              { text: "Bookmarks", icon: <BookmarkBorderIcon /> },
              { text: "Resources", icon: <ImportContactsIcon /> },
            ].map((item, _index) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  display: "block",
                  "&:hover": {
                    borderRight: "2px solid #1B538D", // Add right border on hover
                  },
                }}
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
                      "&:hover": {
                        color: "#1B538D", // Change color on hover
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
