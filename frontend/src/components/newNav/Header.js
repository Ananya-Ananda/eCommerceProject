import React, { useEffect, useState, useRef } from 'react';
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { ButtonBase } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Header(props) {

  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState()
  const [searchTerm, setSearchTerm] = useState("");  

  const userForm = useRef('');
  const passForm = useRef('');

  const handleClick = () => {
    setIsOpen(!isOpen)
  };

  const checkLogged = async () => {
    const pass = await fetch("http://localhost:9000/firebase/password/" + userForm.current.value)
    .then((res) => res.json())
    .then((data) => data.password)

    if (pass == passForm.current.value) {
      console.log('logged in again')
    }
  }

  const [category, setCategory] = useState('');

  const handleChange = (input) => {
    props.getCategory(input);
  };

  return (
    <div className="header">
        <div className="header_option">
          <span className="header_optionLineTwo">Launch Swag Epic Bookstore</span>
        </div>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
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
          {/* <span className="header_optionLineTwo">Categories</span> */}
        </div>
        </ButtonBase>
        <ButtonBase>
        <div className="header_option">
          <span className="header_optionLineTwo">Sign In</span>
        </div>
        </ButtonBase>
        <ButtonBase>
        <div className="header_optionBasket">
          <ShoppingBasketIcon />
          <span className="header_optionLineTwo header_basketCount">0</span>
        </div>
        </ButtonBase>
      </div>
    </div>
  );
}

export default Header;
