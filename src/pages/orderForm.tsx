import React, { useEffect, useState } from "react";

import SuccessOrder from "../components/SuccessOrder";
import { useAuth } from "@/context/FormDataContext";
import Link from "next/link";
type ActiveView = "OrderForm" | "SuccessOrder";
const OrderForm = () => {
  const [view, setView] = useState<ActiveView>("OrderForm");
  const { formData } = useAuth();
  const [isDataPopulated, setIsDataPopulated] = useState(false);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = () => {
    if (!isDataPopulated) {
      const storedUserDataString = localStorage.getItem("formData");
      if (storedUserDataString) {
        const storedUserData = JSON.parse(storedUserDataString);
        setName(storedUserData.name || "");
        setLastName(storedUserData.lastname || "");
        setAddress(storedUserData.address || "");
        setPhone(storedUserData.phoneNumber || "");
        setEmail(storedUserData.email || "");
      }
    } else {
      // Reset form fields to initial state
      setName("");
      setLastName("");
      setAddress("");
      setPhone("");
      setEmail("");
    }
    setIsDataPopulated(!isDataPopulated);
  };
  const handleBackButtonClick = () => {
    setView("SuccessOrder");
  };
  return (
    <div className="container mt-5">
      <div className="row">
        {" "}
        {view === "SuccessOrder" ? (
          <SuccessOrder />
        ) : (
          <>
            <div className="col-md-4 ">
              <img
                src="/images/icons/sparks.svg"
                alt="Image"
                className="img-fluid mb-3 m-auto d-block"
              />
              <h4 className="text-center">
                Ве молиме внесете ги потребните информации
              </h4>
              <div className="d-flex align-items-between justify-content-start ">
                <div className="  p-3 d-flex align-items-center justify-content-center">
                  <input
                    type="checkbox"
                    className="form-check-input m-auto  "
                    onClick={handleClick}
                  />
                </div>

                <p className=" p-3  " onClick={handleClick}>
                  вметни ги информациите од мојот профил
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control mb-3 bg-transparent"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="form-control mb-3 bg-transparent"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="form-control mb-3 bg-transparent"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                className="form-control mb-3 bg-transparent"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control mb-3 bg-transparent"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <div className="d-flex align-items-between justify-content-between ">
                <div className="mb-3  p-3 d-flex align-items-between justify-content-between">
                  <input
                    type="checkbox"
                    className="form-check-input m-auto p-3 "
                  />
                </div>

                <p className=" p-3 ">
                  сакам да добивам новости за идни попусти, нови колекции и
                  промоции на мојата емаил адреса.
                </p>
              </div>

              <div className="d-flex justify-content-center align-content-center">
                <button
                  type="button"
                  className="g-btn mb-3 w-50 p-3"
                  onClick={handleBackButtonClick}
                >
                  Naracaj
                </button>
                <Link href="/">
                <p className="w-50 p-3 text-center">otkazi</p></Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
