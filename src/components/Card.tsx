import React from "react";
import { CardProps } from "../types/PageDetailsTypes";

const Card: React.FC<CardProps> = ({ image, name, price }) => {
  return (
    <div className="col-12">
      <img src={image} alt={name} className="d-block w-100 img-fluid m-1" />
      <div className="text-left">
        <p>{name}</p>
        <p>{price} ден.</p>
      </div>
    </div>
  );
};

export default Card;
