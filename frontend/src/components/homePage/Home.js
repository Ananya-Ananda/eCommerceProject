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
          <Product
            title="The lean startup"
            price={29.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
          />
          <Product />
          <Product />
          {/* Product */}
        </div>
        <div className="home_row">
          {/* Product */}
          <Product />
          <Product />
          <Product />
          {/* Product */}
          {/* Product */}
        </div>
        <div className="home_row">
          {/* Product */}
          <Product />
        </div>
      </div>
    </div>
  );
}

export default Home;
