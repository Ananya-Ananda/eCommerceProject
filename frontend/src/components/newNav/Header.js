import React, { useEffect, useState, useRef } from 'react';
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { ButtonBase } from '@mui/material';

function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState()

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
          <span className="header_optionLineTwo">Categories</span>
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
