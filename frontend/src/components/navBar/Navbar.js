import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { AppBar } from "@mui/material";
import "./Navbar";
import { ThemeProvider, createMuiTheme } from '@mui/material'
import {Helmet} from "react-helmet";
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const Navbar = (props) => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Rubik',
        'Libre Baskerville',
      ].join(','),
    },});
  return (
    <ThemeProvider theme={theme}>
    <div className="fonts">
    <Helmet>
        <title>Navbar</title>
      </Helmet>
      <Box>
        <Drawer
          PaperProps={{
            sx: { width: "100%", padding: "1%" },
          }}
          elevation={16}
          anchor="top"
          open={true}
          variant="persistent"
        >
          <Button sx={{margin: 2}} variant={useLocation().pathname === "/home" ? "outlined" : "text"} component={Link} to="/home" startIcon={useLocation().pathname === "/home" ? <HomeIcon style={{ fontSize: 35 }}/> : <HomeOutlinedIcon style={{ fontSize: 35 }}/>}>
            <Typography>Home</Typography>
          </Button>
        </Drawer>
      </Box>
    </div>
    </ThemeProvider>
  );
};

export default Navbar;