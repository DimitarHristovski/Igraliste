import React, { useState, useEffect } from "react";
import { Section, MainContent, AboutData } from "../types/PageDetailsTypes";
import Breadcrumbs from "@/components/Breadcrumbs";

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [mainContentSlice, setMainContentSlice] = useState<[number, number]>([
    0, 1,
  ]);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://protected-reaches-74137-663edc83df86.herokuapp.com/aboutUs"
        );
        if (response.ok) {
          const jsonData: AboutData = await response.json();
          setAboutData(jsonData);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!aboutData) {
    return null;
  }
  const toggleMainContentSlice = () => {
    setMainContentSlice((prevSlice) => (prevSlice[0] === 0 ? [1, 2] : [0, 1]));
  };
  const handleSectionClick = (index: number) => {
    setSelectedSectionIndex(index);
  };
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
          <div className="text-center d-flex justify-content-center">
            <img src={aboutData.icon} alt="" className="p-2" />
            <h3 className="p-2">{aboutData.title} </h3>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="d-flex p-1 justify-content-center border border-dark rounded col-10 m-auto">
            {aboutData.sections.map((section, index) => (
              <div
                key={index}
                className={`p-1 text-center col-6 ${
                  index % 2 === 0 ? "custom-border-right" : ""
                } ${selectedSectionIndex === index ? "selected-section" : ""}`}
                onClick={toggleMainContentSlice}
                style={{ cursor: "pointer" }}
              >
                <p
                  onClick={() => handleSectionClick(index)}
                  className={`m-auto ${
                    selectedSectionIndex === index ? "bold-text" : ""
                  }`}
                >
                  {section.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 text-center">
          {aboutData.mainContent
            .slice(mainContentSlice[0], mainContentSlice[1])
            .map((content, index) => (
              <div key={index}>
                <img src={content.image} alt="" />
                <h2 className="p-3 text-left">{content.heading}</h2>
                {content.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="p-3 text-left">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default About;
