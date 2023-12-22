import React, { useState } from "react";
import { Carousel, Pagination as libraryPagination } from "react-bootstrap";

interface ProductImageSliderProps {
  image: string;
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ image }) => {
  const [currentImage, setCurrentImage] = useState<string>(image);

  const smallImages = [
    "/SliderImages/IMG_1.png",
    "/SliderImages/IMG_2.png",
    "/SliderImages/IMG_3.png",
    "/SliderImages/IMG_4.png",
    "/productsimages/image1.png",
    "/productsimages/image3.png",
    "/productsimages/image2.png",
    "/productsimages/image1.png",
    "/productsimages/image3.png",
  ];

  const showImage = (imagePath: string) => {
    setCurrentImage(imagePath);
  };

  const itemsPerPage = 4;
  const totalItems = smallImages.length;
  const totalSlides = Math.ceil(totalItems / itemsPerPage);

  const smallImageGroups = Array.from({ length: totalSlides }, (_, index) =>
    smallImages.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
  );

  return (
    <div className="container mt-4 ">
      <div>
        <img
          src={currentImage}
          alt="Current Image"
          id="bigImage"
          className="m-2 big-image w-100"
        />

        <Carousel className="d-flex p-0 ">
          {smallImageGroups.map((group, slideIndex) => (
            <Carousel.Item key={slideIndex} className="w-100">
              <div className="d-flex  justify-content-center ">
                {group.map((smallImage, index) => (
                  <img
                    key={index}
                    src={smallImage}
                    alt={`Thumbnail ${index + 1}`}
                    className="thumbnail-img"
                    onClick={() => showImage(smallImage)}
                  />
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>{" "}
    </div>
  );
};

export default ProductImageSlider;
