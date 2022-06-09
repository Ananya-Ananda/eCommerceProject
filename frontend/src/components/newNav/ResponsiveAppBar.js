import * as React from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const categories = [
    "Action",
    "Adventure",
    "Classics",
    "Mystery",
    "Fantasy",
    "Historical Fiction",
    "Horror",
    "Literary Fiction",
    "Romance",
    "Sci-Fi",
    "Thrillers",
    "Non-Fiction",
  ];

  const [anchorElm, setAnchorElm] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const handleClick = (e) => {
    setAnchorElm(e.currentTarget);
    setOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Launch Bookstore
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Button variant="contained" onClick={handleClick}>
            Categories
          </Button>
          <Menu anchorEl={anchorElm} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Romance</MenuItem>
            <MenuItem onClick={handleClose}>Horror</MenuItem>
            <MenuItem onClick={handleClose}>Action</MenuItem>
            <MenuItem onClick={handleClose}>Sci-Fi</MenuItem>
            <MenuItem onClick={handleClose}>Mystery</MenuItem>
            <MenuItem onClick={handleClose}>Biography</MenuItem>
            <MenuItem onClick={handleClose}>History</MenuItem>
          </Menu>
          {/*<FormControl sx={{ width: 100 }}>
            <Select
              labelId="custom-select-label"
              id="custom-select"
              value={categories}
              onChange={() => {}}
            />
            {categories.map((categoriesValue) => {
              return <MenuItem value={categoriesValue}></MenuItem>;
            })}
          </FormControl>
          */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
