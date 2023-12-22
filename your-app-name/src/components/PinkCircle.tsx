import React, { useState } from "react";
import { Props } from "../types/PageDetailsTypes";

const MainPinkCircle: React.FC<Props> = ({ title, desc }) => {
  const [imageSrc, setImageSrc] = useState("/images/icons/sparks.png");

  const handleClick = () => {
    if (imageSrc.includes("sparks.png")) {
      setImageSrc("/images/icons/redsparks.png");
    } else {
      setImageSrc("/images/icons/sparks.png");
    }
  };

  return (
    <div
      className="pink-circle position-absolute d-flex flex-column justify-content-center align-items-center text-center  "
      onClick={handleClick}
    >
      <img src={imageSrc} alt="" className="redstar" />
      <div className="d-flex mr-6">
        {" "}
        <img src="/images/icons/VectorL.png" alt="" />{" "}
        <p className="text-danger ">НОВО</p>
        <img src="/images/icons/VectorS.png" alt="" />
      </div>

      <h4 className="mt-2 w-75">{title}</h4>
      <p className="m-2 ">{desc}</p>
      <img src="/images/icons/Group 36.svg" alt="" />
    </div>
  );
};
const PinkCircle: React.FC<Props> = ({ title, desc }) => {
  const [imageSrc, setImageSrc] = useState("/images/icons/sparks.png");

  const handleClick = () => {
    if (imageSrc.includes("sparks.png")) {
      setImageSrc("/images/icons/redsparks.png");
    } else {
      setImageSrc("/images/icons/sparks.png");
    }
  };
  return (
    <div
      className="pinkish-circle position-absolute d-flex flex-column justify-content-center align-items-center text-center  "
      onClick={handleClick}
    >
      <img src={imageSrc} alt="" />

      <h4 className="mt-2 w-75">{title}</h4>
      <p className="m-2 ">{desc}</p>
      <img src="/images/icons/Group 36.svg" alt="" />
    </div>
  );
};
export { PinkCircle, MainPinkCircle };
