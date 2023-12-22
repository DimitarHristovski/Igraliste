import React, { useState } from "react";
import { GiftCardButtonProps } from "../types/PageDetailsTypes";

const GiftCardButton: React.FC<GiftCardButtonProps> = ({
  id,
  price,
  addedToCart,
}) => {
  return (
    <button
      type="button"
      className={`btn btn-custom p-3 w-75 m-2 ${
        addedToCart ? "added-to-cart" : ""
      }`}
    >
      <span className="initial-text">{price}</span>
      {addedToCart ? null : (
        <span className="hover-text">Додај во кошница</span>
      )}
      {addedToCart && <span className="added-text">Додадено во кошница</span>}
    </button>
  );
};

export default GiftCardButton;
