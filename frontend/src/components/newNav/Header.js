import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
        {/* Logo */}
      </div>

      <div className="header_nav">
        <div className="header_option">
          <span className="header_optionLineTwo">Categories</span>
        </div>
        <Link to="/orders">
          <div className="header_option">
            <span className="header_optionLineTwo">Sign In</span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header_option">
            <span className="header_optionLineTwo">Orders</span>
          </div>
        </Link>
        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_basketCount">0</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
