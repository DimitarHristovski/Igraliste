import PassChange from "@/components/passChange";
import { useAuth } from "@/context/FormDataContext";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";
type ActiveView = "MyProfile" | "PassChange";

const MyProfile = () => {
  const [view, setView] = useState<ActiveView>("MyProfile");
  const { formData, image, updateImage, updateFormData, logout, userData } =
    useAuth();

  useEffect(() => {
    const storedImage = localStorage.getItem("image");
    const storedUserData = localStorage.getItem("formData");

    if (storedImage) {
      updateImage(storedImage);
    }

    if (storedUserData) {
      updateFormData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSaveButtonClick = () => {
    localStorage.setItem("image", image || "");
    router.push("/login");

    localStorage.setItem("formData", JSON.stringify(formData));
    // console.log(formData, image);

    alert("Data saved!");
  };

  const handleLogoutButtonClick = () => {
    logout();
    router.push("/login");
  };

  const btnClick = () => {
    setView("PassChange");
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Link href="/" className="navbar-brand">
        <img
          className="navbar-brand"
          src="/images/Group 1.svg"
          alt="igraliste"
        />
      </Link>{" "}
      {view === "PassChange" ? (
        <PassChange setView={setView} />
      ) : (
        <>
          {" "}
          {image && (
            <img
              src={image}
              alt="Stored Image"
              className="img-fluid  image-register mb-3"
            />
          )}
          {formData && (
            <div className="w-50">
              <div className="mb-2">
                <label htmlFor="name">Name:</label>
                <input
                  className="form-control bg-transparent"
                  type="text"
                  value={formData.name}
                  disabled
                />
              </div>

              <div className="mb-2">
                <label htmlFor="lastname">Lastname:</label>
                <input
                  className="form-control bg-transparent"
                  type="text"
                  value={formData.lastname}
                  disabled
                />
              </div>

              <div className="mb-2">
                <label htmlFor="email">Email:</label>
                <input
                  className="form-control bg-transparent"
                  type="text"
                  value={formData.email}
                  disabled
                />
              </div>

              <div className="mb-2">
                <label htmlFor="password">Password:</label>
                <input
                  className="form-control bg-transparent"
                  type="password"
                  value={formData.password}
                  disabled
                />
                <p className=" mb-2" onClick={btnClick}>
                  Промени Лозинка
                </p>
              </div>

              <div className="mb-2">
                <label htmlFor="email">address :</label>
                <input
                  className="form-control bg-transparent"
                  type="text"
                  value={formData.address}
                  disabled
                />
              </div>

              <div className="mb-2">
                <label htmlFor="phoneNumber">Phone Number :</label>
                <input
                  className="form-control bg-transparent"
                  type="text"
                  value={formData.phoneNumber}
                  disabled
                />
              </div>

              <div className="mb-2">
                <label htmlFor="biography">Biography :</label>
                <textarea
                  className="form-control bg-transparent"
                  value={formData.biography}
                  disabled
                />
              </div>
              <button
                className="btn btn-dark w-100 my-2"
                onClick={handleSaveButtonClick}
              >
                Зачувај
              </button>
              <button
                className="btn btn-danger w-100 my-2"
                onClick={handleLogoutButtonClick}
              >
                Logout
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default MyProfile;
