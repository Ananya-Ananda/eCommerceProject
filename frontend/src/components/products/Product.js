import React from "react";
import "./Product.css";
function Product({ title, image, price }) {
  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          {/*Price*/}

          <small>$</small>
          <strong>{price}</strong>
        </p>
        <img className="product_image" src={image} />
      </div>
      <button className="product_button">Add to Basket</button>
    </div>
  );
}

export default Product;
