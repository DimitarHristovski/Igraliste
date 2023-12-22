import React, { useEffect, useState } from "react";

import { BannerItem } from "../types/PageDetailsTypes";

const AnimateBox: React.FC = () => {
  const [bannerData, setBannerData] = useState<BannerItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resBanner = await fetch(
          "https://protected-reaches-74137-663edc83df86.herokuapp.com/banner_content"
        );
        const data: BannerItem[] = await resBanner.json();
        setBannerData(data);
      } catch (error) {
        console.error("Error fetching banner content:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="box">
      <div className="announcement-bar">
        <div className="overlap-group d-flex">
          {bannerData.map((item, index) => (
            <div key={index} className="d-flex">
              <p className="text-wrapper">{item.text}</p>
              <img
                className="emojione-monotone"
                alt="star"
                src={item.emojiSrc}
              />
              <p className="text-wrapper-3">{item.collectionName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimateBox;
