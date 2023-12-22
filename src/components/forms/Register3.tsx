import React, { useState } from "react";
import Register4 from "./Register4";
import { useAuth } from "@/context/FormDataContext";
type ActiveView = "Register3" | "Register4";

const Register3: React.FC = () => {
  const [view, setView] = useState<ActiveView>("Register3");
  const { formData, updateFormData, login } = useAuth(); 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleBackButtonClick = () => {
    setView("Register4");

  };
  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-md-6">
          {view === "Register4" ? (
            <Register4 />
          ) : (
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Име
                </label>
                <input
                  type="text"
                  className="form-control bg-transparent"
                  id="name"
                  name="name"
                  required
                  placeholder="Име"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label">
                  Презиме
                </label>
                <input
                  type="text"
                  className="form-control bg-transparent"
                  id="lastname"
                  name="lastname"
                  required
                  placeholder="Презиме"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Е-пошта
                </label>
                <input
                  type="email"
                  className="form-control bg-transparent"
                  id="email"
                  name="email"
                  required
                  placeholder="Емаил"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Лозинка
                </label>
                <input
                  type="password"
                  className="form-control bg-transparent"
                  id="password"
                  name="password"
                  required
                  placeholder="Лозинка"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Потврди Лозинка
                </label>
                <input
                  type="password"
                  className="form-control bg-transparent"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  placeholder="Потврди Лозинка"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex align-items-center mb-3 ">
                <img src="/images/icons/check.svg" className="ic-size"></img>
                <small className="text-left text-size-1">
                  Испраќај ми известувања за нови зделки и промоции.
                </small>
              </div>{" "}
              <div className="d-flex flex-column">
                {" "}
                <button
                  type="submit"
                  className="btn btn-dark w-75 m-2 "
                  onClick={handleBackButtonClick}
                >
                  Регистрирај се
                </button>
                <small className="m-2">
                  Со вашата регистрација, се согласувате со Правилата и Условите
                  за кориснички сајтови.
                </small>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register3;
