import React, { useEffect, useState, useRef, useContext } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { ButtonBase, dialogActionsClasses } from "@mui/material";
import {
  List,
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { LoginContext } from "../../contexts/loginContext";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState();
  const { login, setLogin } = useContext(LoginContext);
  const [isLog, setIsLog] = useState(login.isLogged)
  const [searchTerm, setSearchTerm] = useState(""); 

  const userForm = useRef("");
  const passForm = useRef("");
  let navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsLog(false)
    setLogin({
      isLogged: false,
      user: "",
    });
  };

  const cartClick = () => {
    if (isLog) {
      navigate("/shoppingCart")
    }
    else {
      setIsOpen(!isOpen)
    }
  }

  const [category, setCategory] = useState('');

  const handleChange = (input) => {
    props.getCategory(input);
  }

  const checkLogged = async () => {
    const pass = await fetch(
      "/firebase/password/" + userForm.current.value
    )
      .then((res) => res.json())
      .then((data) => data.password);

    if (pass == passForm.current.value) {
      console.log("logged in!");
      setLogin({
        isLogged: true,
        user: userForm.current.value,
      });
      setIsLog(true)
      setIsOpen(!isOpen)
    }
  };

  return (
    <>
      <div className="header">
        <div className="header_option">
          <span className="header_optionLineTwo">
            Launch Swag Epic Bookstore
          </span>
        </div>

        <div className="header_search">
          <input className="header_searchInput" type="text" />
          <ButtonBase>
          <SearchIcon className="header_searchIcon" />
          </ButtonBase>
          {/* Logo */}
        </div>
        <div className="header_nav">
          <ButtonBase>
            <div className="header_option">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={(category) => handleChange(category.target.value)}
                  >
                    <MenuItem value={" "}>General</MenuItem>
                    <MenuItem value={"fantasy"}>Fantasy</MenuItem>
                    <MenuItem value={"drama"}>Drama</MenuItem>
                    <MenuItem value={"comedy"}>Comedy</MenuItem>
                    <MenuItem value={"romance"}>Romance</MenuItem>
                    <MenuItem value={"nonfiction"}>Non-Fiction</MenuItem>
                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </ButtonBase>
          {isLog == true && (
            <ButtonBase onClick={handleLogout}>
              <div className="header_option">
                <span className="header_optionLineTwo">Log Out</span>
              </div>
            </ButtonBase>
          )}
          {isLog == false && (
            <ButtonBase onClick={handleClick}>
              <div className="header_option">
                <span className="header_optionLineTwo">Sign In</span>
              </div>
            </ButtonBase>
          )}
          <ButtonBase onClick = {cartClick}>
            <div className="header_optionBasket">
              <ShoppingBasketIcon />
              {/*<span className="header_optionLineTwo header_basketCount">0</span>*/}
            </div>
          </ButtonBase>
        </div>
      </div>
      <Dialog open={isOpen}>
        <DialogTitle>Please Sign In</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            inputRef={userForm}
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            inputRef={passForm}
            id="username"
            label="Password"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={checkLogged}>Login</Button>
          <Button onClick={handleClick}>Exit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;
