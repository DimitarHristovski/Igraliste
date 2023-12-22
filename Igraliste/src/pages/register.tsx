import Link from "next/link";
import React, { useState } from "react";
import Register3 from "../components/forms/Register3";

type ActiveView = "Register" | "Register3";

const Register = () => {
  const [view, setView] = useState<ActiveView>("Register");
  const handleBackButtonClick = () => {
    setView("Register3");
  };
  return (
    <div className="container-fluid d-flex flex-column  ">
      <div className="row p-5">
        {" "}
        <div className="col-md-6 d-flex flex-column text-center  ">
          <Link href="/">
            {" "}
            <img src="/images/Group 1.svg" alt="" className="p-4 " />
          </Link>
        </div>
      </div>
      <div className="row ">
        <div className="col-10 d-flex flex-column  offset-1">
          {view === "Register3" ? (
            <Register3 />
          ) : (
            <>
              <div>
                <button
                  type="button"
                  className="btn btn-custom-login  btn-block m-2 rounded"
                  onClick={handleBackButtonClick}
                >
                  Регистрирај се со емиал адреса
                </button>
                <p className="m-auto text-center">или</p>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-custom-login btn-block m-2 rounded"
                  >
                    <i className="fab fa-google"></i> Регистрирај се преку
                    Google
                  </button>
                  <button
                    type="button"
                    className="btn btn-custom-login btn-block m-2 rounded"
                  >
                    <i className="fab fa-facebook"></i> Регистрирај се преку
                    Facebook
                  </button>{" "}
                  <p className="mt-3 text-center">
                    <span>веќе имаш профил?</span>{" "}
                    <Link href="/login" >
                      <span className="log-color">Логирај се</span>
                    </Link>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="row p-5">
        {" "}
        <div className="col-md-6   ">
          <p className="mt-3 text-muted text-center mt-5">
            Сите права задржани @ Игралиште Скопје
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default Register;
