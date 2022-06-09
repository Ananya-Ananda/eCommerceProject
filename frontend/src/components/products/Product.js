import React from "react";
import "./Product.css";
function Product() {
  return (
    <div className="product">
      <div className="product_info">
        <p>{/*Info*/}</p>
        <p className="product_price">
          {/*Price*/}
          <small>$</small>
          <strong>19.99</strong>
        </p>
        <img
          className="product_image"
          src="https://images-na.ssl-images-amazon.com/images/I/712OCcsp8xL.jpg"
        />
      </div>
      <button className="product_button">Add to Basket</button>
    </div>
  );
}

export default Product;
