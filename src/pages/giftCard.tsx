import { GetStaticProps } from "next";
import React, { useState } from "react";
import GiftCardButton from "@/components/GiftCardButton";
import { useProductContext } from "@/context/ProductContext";

interface GiftCard {
  id: string;

  price: string;
}

interface GiftCardsData {
  giftCards: GiftCard[];
}

const GiftCard: React.FC<GiftCardsData> = ({ giftCards }) => {
  const { toggleCartGiftCard } = useProductContext();

  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleAddToCart = (giftCardId: string) => {
    toggleCartGiftCard(giftCardId);
    setAddedToCart((prev) => ({ ...prev, [giftCardId]: true }));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gift картички за подарок</h2>

      <div className="row justify-content-center mb-4">
        <div className="col-12 position-relative mb-4">
          <div className="card">
            <img
              src="/images/about us.png"
              className="card-img-top"
              alt="Gift Card 1"
            />
          </div>
          <div className="banner-top col-12">
            <img
              src="/images/rightstar.png"
              className="card-img-top "
              alt="Gift Card 1"
            />
            <p className=" text-display my-3 text-left ml-5">
              Partygirl Gift card
            </p>
          </div>
        </div>
        <div className="col-12 position-relative mb-4">
          <div className="card">
            <img
              src="/images/giftcard-1.png"
              className="card-img-top"
              alt="Gift Card 2"
            />
          </div>
          <div className="banner-bottom col-12">
            <img
              src="/images/leftstar.png"
              className="card-img-top "
              alt="Gift Card 1"
            />
            <p className=" text-display my-3 text-right mr-5">
              Vintage chick Gift card
            </p>
          </div>
        </div>
        <div className="col-12 position-relative mb-4">
          <div className="card">
            <img
              src="/images/giftcard-2.png"
              className="card-img-top"
              alt="Gift Card 3"
            />
          </div>
          <div className="banner-bottom col-12">
            <img
              src="/images/rightstar.png"
              className="card-img-top "
              alt="Gift Card 1"
            />
            <p className=" text-display my-3 text-left ml-5">
              Wavy baby Gift card{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="d-flex justify-content-around flex-column align-items-center">
            {giftCards.map((giftcard) => (
              <div
                key={giftcard.id}
                onClick={() => handleAddToCart(giftcard.id)}
                className="btn btn-custom  w-75 m-2"
              >
                <GiftCardButton
                  id={giftcard.id}
                  price={giftcard.price}
                  addedToCart={addedToCart[giftcard.id] || false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("http://localhost:5000/giftcards");
  const data: GiftCard[] = await response.json();

  return {
    props: {
      giftCards: data,
    },
  };
};

export default GiftCard;
