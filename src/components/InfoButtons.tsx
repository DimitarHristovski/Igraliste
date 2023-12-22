import React, { useState } from "react";

const InfoButtons = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index: any) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === index ? null : index
    );
  };
  return (
    <div className="row">
      <div className="col-md-4 mb-4">
        <div
          className={`d-flex align-items-center justify-content-between p-3 border-custom`}
          onClick={() => handleItemClick(0)}
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-0`}
          aria-expanded={selectedItem === 0 ? "true" : "false"}
          aria-controls={`collapse-0`}
        >
          <img
            src="/images/icons/check.svg"
            alt="Left Icon"
            className="left-icon"
          />
          <div className="center-paragraph">
            <p>Контрола на квалитет</p> {selectedItem === 0 && ""}
          </div>
          <img
            src="/images/icons/plus.svg"
            alt="Right Plus Icon"
            className="right-icon"
          />
        </div>
        <div
          id={`collapse-0`}
          className={`collapse ${selectedItem === 0 ? "show" : ""}`}
        >
          <div className="card card-body">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
              consectetur. Sapiente, vero velit a, alias debitis aspernatur
              doloremque atque voluptate ad soluta ut aliquid, tempora dolorem
              enim mollitia earum dignissimos.
            </p>
          </div>
        </div>{" "}
        <div
          className={`d-flex align-items-center justify-content-between p-3 border-custom`}
          onClick={() => handleItemClick(1)}
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-1`}
          aria-expanded={selectedItem === 1 ? "true" : "false"}
          aria-controls={`collapse-1`}
        >
          <img
            src="/images/icons/box.svg"
            alt="Left Icon"
            className="left-icon"
          />
          <div className="center-paragraph">
            <p>Политика на враќање</p> {selectedItem === 1 && ""}
          </div>
          <img
            src="/images/icons/plus.svg"
            alt="Right Plus Icon"
            className="right-icon"
          />
        </div>
        <div
          id={`collapse-1`}
          className={`collapse ${selectedItem === 1 ? "show" : ""}`}
        >
          <div className="card card-body">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
              consectetur. Sapiente, vero velit a, alias debitis aspernatur
              doloremque atque voluptate ad soluta ut aliquid, tempora dolorem
              enim mollitia earum dignissimos.
            </p>
          </div>
        </div>{" "}
        <div
          className={`d-flex align-items-center justify-content-between p-3 border-custom`}
          onClick={() => handleItemClick(2)}
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-2`}
          aria-expanded={selectedItem === 2 ? "true" : "false"}
          aria-controls={`collapse-2`}
        >
          <img
            src="/images/icons/truck.svg"
            alt="Left Icon"
            className="left-icon"
          />
          <div className="center-paragraph">
            <p>Достава</p> {selectedItem === 2 && ""}
          </div>
          <img
            src="/images/icons/plus.svg"
            alt="Right Plus Icon"
            className="right-icon"
          />
        </div>
        <div
          id={`collapse-2`}
          className={`collapse ${selectedItem === 2 ? "show" : ""}`}
        >
          <div className="card card-body">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
              consectetur. Sapiente, vero velit a, alias debitis aspernatur
              doloremque atque voluptate ad soluta ut aliquid, tempora dolorem
              enim mollitia earum dignissimos.
            </p>
          </div>
        </div>{" "}
        <div
          className={`d-flex align-items-center justify-content-between p-3 border-custom`}
          onClick={() => handleItemClick(3)}
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-3`}
          aria-expanded={selectedItem === 3 ? "true" : "false"}
          aria-controls={`collapse-3`}
        >
          <img
            src="/images/icons/help.svg"
            alt="Left Icon"
            className="left-icon"
          />
          <div className="center-paragraph">
            <p>Помош</p> {selectedItem === 3 && ""}
          </div>
          <img
            src="/images/icons/plus.svg"
            alt="Right Plus Icon"
            className="right-icon"
          />
        </div>
        <div
          id={`collapse-3`}
          className={`collapse ${selectedItem === 3 ? "show" : ""}`}
        >
          <div className="card card-body">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
              consectetur. Sapiente, vero velit a, alias debitis aspernatur
              doloremque atque voluptate ad soluta ut aliquid, tempora dolorem
              enim mollitia earum dignissimos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoButtons;
