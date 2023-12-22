import React, { useState } from "react";
import { PinkCircle, MainPinkCircle } from "../components/PinkCircle";
import Link from "next/link";
import ProductSlider from "@/components/ProductSlider";
interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  link: string;
}
const Homepage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <div className="container">
      <div className="row p-0">
        <div className="col-12 col-md-4 mb-5 py-5 pr-0">
          <div className="image-container position-relative">
            <img
              src="/images/image-4.png"
              alt="Image 2"
              className="img-fluid "
            />
            <Link href="/products" >
              <span>
                <MainPinkCircle
                  title="Valentines gal
                Kолекција"
                  desc="Погледни ги свежите љубовни парчиња"
                />
              </span>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-4 mb-5 py-5 d-flex flex-column">
          <h4 className="p-2 text-center m-2">Trendy парчиња во моментов</h4>
          <ProductSlider products={products} />
        </div>
        <div className="col-12 col-md-4 mb-5 py-5 pl-0 ">
          <div className="image-container">
            <img
              src="/images/image-2.png"
              alt="Image 2"
              className="img-fluid"
            />{" "}
            <Link href="/products" >
              <span className="ml-6">
                <PinkCircle
                  title="Козметика & аксесоари"
                  desc="Погледни ги свежите љубовни парчиња"
                />
              </span>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-4 mb-5 py-5 pr-0">
          <div className="image-container border-black-custom">
            <img
              src="/images/emojione-monotone_eight-pointed-star.svg"
              alt="star"
              className="emojione-monotone emojistar ml-5"
            />
            <img
              src="/images/image-3.png"
              alt="Image 3"
              className="img-fluid "
            />{" "}
            <Link href="/giftCard" >
              <span>
                <PinkCircle
                  title="GIFT CARDS"
                  desc="Избери уникатен подарок за твоите најблиски со нашиот избор на ultra fancy картички за подарок."
                />{" "}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
