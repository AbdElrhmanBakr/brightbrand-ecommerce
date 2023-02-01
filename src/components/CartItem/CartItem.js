import "./CartItem.scss";

import React from "react";

const CartItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} className="" />
      <div className="item-details">
        <span className="name">{name}</span>
        <span>
          {quantity} x {price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
