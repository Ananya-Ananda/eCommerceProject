import React from "react";
import Product from "../products/Product";
import "./Home.css";
function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://www.kaufmancountylibrary.net/wp-content/uploads/sites/26/2019/04/banner.jpg"
        />

        <div className="home_row">
          <Product />
          {/* Product */}
        </div>
        <div className="home_row">
          {/* Product */}
          {/* Product */}
          {/* Product */}
        </div>
        <div className="home_row">{/* Product */}</div>
      </div>
    </div>
  );
}

export default Home;
