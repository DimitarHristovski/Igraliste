import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FooterData } from "../types/PageDetailsTypes";

const Footer: React.FC = () => {
  const [data, setData] = useState<FooterData | null>(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    // console.log(storedIsLoggedIn);
    if (storedIsLoggedIn !== isLoggedIn) {
      setLoggedIn(storedIsLoggedIn);
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/footerData");
        const jsonData: FooterData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {data ? (
            <>
              <h2 className="mb-3">{data.newsletter.title}</h2>
              <p className="mb-3">{data.newsletter.description}</p>

              <p className="mb-2">{data.subscriptionForm.placeholder}</p>
              <input type="text" className="form-control mb-3 bg-transparent" />
              <button className="g-btn">
                {data.subscriptionForm.buttonText}
              </button>
              <hr className="mt-4 mb-4" />

              <p>
                <a href={data.links.about.url}>{data.links.about.text}</a>
              </p>
              <p>
                <a href={data.links.contact.url}>{data.links.contact.text}</a>
              </p>
              <p>
                <a href={data.links.storeLocator.url}>
                  {data.links.storeLocator.text}
                </a>
              </p>
              <p>
                <a href={data.links.faq.url}>{data.links.faq.text}</a>
              </p>
              {isLoggedIn ? (
                <Link href="/MyProfile">Мој Профил</Link>
              ) : (
                <span>
                  <Link href="/register">Регистрирај се/логирај се</Link>
                </span>
              )}

              <div className="d-flex flex-column">
                <p>Sledi ne na:</p>
                {data.socialMedia.map((social, index) => (
                  <div key={index}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                    >
                      <path d={social.icon} />
                    </svg>
                    <span className="ml-2">{social.desc}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4">{data.companyInfo.join(" ")}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
