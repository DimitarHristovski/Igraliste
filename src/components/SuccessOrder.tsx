import Link from "next/link";
import React from "react";

const SuccessOrder = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 d-flex flex-column text-center ">
          <img
            src="/images/icons/sparks.png"
            alt="Image"
            className="img-fluid mb-3 m-auto d-block "
          />
          <h4 className="text-center m-3">Вашата нарачка е успешна!</h4>
          <div className="d-flex flex-column text-center">
            <p className="p-3 m-3">
              Очекувајте потврда за вашата нарачка на вашата емаил адреса. Keep
              on shining *
            </p>
            <button className="g-btn w-25 m-auto m-3">Продолжи</button>
            <p className="m-3">
              <Link href="/" >
                Кон почетна
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessOrder;
