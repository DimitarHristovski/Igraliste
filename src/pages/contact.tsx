import React, { useEffect, useState } from "react";
import {
  AddressInfo,
  ContactInfo,
  ContactProps,
} from "../types/PageDetailsTypes";
import Breadcrumbs from "@/components/Breadcrumbs";

const Contact: React.FC<ContactProps> = () => {
  const [ContactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://protected-reaches-74137-663edc83df86.herokuapp.com/contactInfo"
        );
        if (response.ok) {
          const jsonData: ContactInfo = await response.json();
          setContactInfo(jsonData);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const breadcrumbItems = [
    { label: "Почетна", href: "/" },
    { label: "За нас" },
  ];
  return (
    <div className="container">
      <div className="row">
        {" "}
        <Breadcrumbs items={breadcrumbItems} />
        <div className="col-12 p-3">
          <div className="text-center d-flex justify-content-center ">
            {ContactInfo && (
              <>
                <h3 className="p-2">{ContactInfo.heading}</h3>
                <img src={ContactInfo.image} alt="" className="p-2" />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {ContactInfo && (
            <div className="text-center">
              <img src="/images/contact.png" alt="" />
              <h2 className="p-3 text-center">{ContactInfo.address.title}</h2>
              <p className="p-3 text-center">
                {ContactInfo.address.description}
              </p>
              <p className="p-3 text-center">{ContactInfo.address.street}</p>
              <h3>Телефон за контакт:</h3>
              <p className="p-3 text-center">{ContactInfo.phoneNumber}</p>
              <h3>Работно Време: </h3>
              <p className="p-3 text-center">{ContactInfo.workingHours}</p>
              <button className="g-btn">{ContactInfo.buttonText}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Contact;
