import { useAuth } from "@/context/FormDataContext";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Register4: React.FC = () => {
  const { formData, updateFormData, updateImage, image } = useAuth();
  const defaultImageURL = "/images/emptyavatar.png";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          updateImage(result);
          localStorage.setItem("Image", result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("image", image || "");
   // console.log(formData, image);

    router.push("/MyProfile");
  };
  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-md-6 ">
          <form className="d-flex flex-column justify-content-between">
            <div className=" text-center">
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="img-fluid  image-register mb-3"
                />
              )}
              <label className="custom-file-upload  text-center text-light bg-secondary w-50 m-auto">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="d-none rounded "
                  onChange={handleImageChange}
                />
                Одбери слика{" "}
              </label>
            </div>
            <div className="m-3">
              <label htmlFor="address" className="form-label">
                Адреса
              </label>
              <input
                type="tel"
                className="form-control bg-transparent"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <label htmlFor="phoneNumber" className="form-label">
                Телефонски број
              </label>
              <input
                type="tel"
                className="form-control bg-transparent"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="m-3">
              <label htmlFor="biography" className="form-label ">
                Биографија
              </label>
              <textarea
                className="form-control bg-transparent"
                id="biography"
                name="biography"
                value={formData.biography}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-dark w-75 m-auto"
              onClick={handleSubmit}
            >
              Заврши
            </button>
            <p className="text-left m-2">прескокни</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register4;
