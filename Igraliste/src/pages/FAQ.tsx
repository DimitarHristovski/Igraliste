import React, { useState, useEffect } from "react";
import { FAQItem, FAQProps } from "../types/PageDetailsTypes";
import Breadcrumbs from "@/components/Breadcrumbs";

const FAQ: React.FC<FAQProps> = () => {
  const [faqData, setFaqData] = useState<FAQItem[] | null>(null);
  const [title, setTitle] = useState<string>("");
  const [icon, setIcon] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/faq");
        if (response.ok) {
          const jsonData: FAQProps = await response.json();
          setFaqData(jsonData.items);
          setTitle(jsonData.title);
          setIcon(jsonData.icon);
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
    { label: "Често поставувани прашања" },
  ];
  return (
    <div className="container">
      <div className="row">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="col-12 p-3">
          <div className="text-center d-flex justify-content-center">
            <h3 className="p-2 text-left ">{title}</h3>
            <img src={icon} alt="" className="p-2" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          {faqData &&
            faqData.map((item, index) => (
              <div key={index} className="border p-3 border-dark my-1">
                <ol>
                  <li className="log-color text-left m-2">{item.question}</li>
                </ol>
                <p className="lh-base">{item.answer}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
