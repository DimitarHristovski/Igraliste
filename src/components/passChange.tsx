import { useAuth } from "@/context/FormDataContext";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PassChange: React.FC<any> = ({ setView }: any) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userData, updateFormData, formData } = useAuth();
  const handleBackButtonClick = () => {
    setView("MyProfile");
  };
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    if (oldPassword.trim() !== formData.password) {
      alert("Incorrect old password");
      return;
    }

    localStorage.setItem("Password", newPassword);

    if (formData) {
      const updatedUserData = { ...formData, password: newPassword };
      updateFormData(updatedUserData);

      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }

    alert("Password changed successfully");
  };
  // console.log("Current password in userData:", formData?.password);
  return (
    <div className="container-fluid rounded">
      {" "}
      <div className="row justify-content-center  ">
        {" "}
        <div className="col-md-6 ">
          <div className="mb-2">
            <label htmlFor="oldPassword" className="form-label">
              Стара Лозинка:
            </label>
            <input
              type="password"
              className="form-control bg-transparent"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="newPassword" className="form-label">
              Нова Лозинка:
            </label>
            <input
              type="password"
              className="form-control bg-transparent"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="confirmPassword" className="form-label">
              Потврди Лозинка:
            </label>
            <input
              type="password"
              className="form-control bg-transparent"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-dark w-75"
            onClick={() => {
              handleBackButtonClick();
              handleChangePassword();
            }}
          >
            Зачувај
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

export default PassChange;
