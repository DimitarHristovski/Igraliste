import Link from "next/link";
import React, { useEffect, useState } from "react";
import InfoButtons from "./InfoButtons";
import Pagination from "./Pagination";
import RelatedProducts from "./RelatedProducts";
import Card from "./Card";
import GiftCardButton from "./GiftCardButton";
import { useProductContext } from "@/context/ProductContext";

const Order: React.FC = () => {
  const {
    giftCards,
    toggleCartGiftCard,
    cartGiftCardIds,
    products,
    cartProductIds,
    toggleCartProduct,
  } = useProductContext();

  const [totalPrice, setTotalPrice] = useState(0);
  const cartProducts = products.filter((product) =>
    cartProductIds.includes(product.id)
  );
  const cartgiftCards = giftCards.filter((giftCard) =>
    cartGiftCardIds.includes(giftCard.id)
  );
  const shippingCost = 150;
  const discountPercentage = 20;

  useEffect(() => {
    const calculateTotalPrice = () => {
      const productTotal = +cartProducts.reduce((total, product) => {
        return total + product.price;
      }, 0);

      const giftCardTotal = +cartgiftCards.reduce((total, giftCard) => {
        return total + giftCard.price;
      }, 0);
      // console.log(cartProducts[0]);
      // console.log(cartgiftCards[0]);

      const subTotal = productTotal + giftCardTotal + shippingCost;
      const discountAmount = (discountPercentage / 100) * subTotal;
      const total = subTotal - discountAmount;
      // console.log(total);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartProductIds, cartGiftCardIds]);

  // console.log("Cart Products:", cartProductIds);
  //console.log("Cart giftCards:", cartGiftCardIds);
  const clearLocalStorage = () => {
    localStorage.clear();
  };
  return (
    <div className="container">
      <div className="row">
        {cartProducts.map((product) => (
          <div key={product.id} className="col-6">
            <Link href={`/products/${product.id}`}>
              <Card
                image={product.image}
                name={product.name}
                price={product.price}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="row"></div>
      <div className="row">
        {cartgiftCards.map((giftCard) => (
          <div key={giftCard.id} className="col-6">
            <a>
              <GiftCardButton
                price={giftCard.price}
                id={giftCard.id}
                addedToCart={false}
                handleAddToCart={function (buttonId: string): void {}}
              />
            </a>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-md-4 mb-4">
          {cartProducts.map((product) => (
            <div key={product.id} className="d-flex">
              <p className="m-1">{product.name}</p>
              <p className="m-1">{product.price} ден.</p>
            </div>
          ))}

          {cartgiftCards.map((giftCard) => (
            <div key={giftCard.id} className="d-flex">
              <p className="m-1">Gift Card</p>
              <p className="m-1">{giftCard.price} ден.</p>
            </div>
          ))}

          <hr />
          <div className="d-flex">
            <p>+ достава до адреса {shippingCost} ден.</p>
          </div>
          <div className="d-flex">
            <p>1х -20% попуст! {discountPercentage}%</p>
          </div>
          <div className="d-flex">
            <p className="m-1">Вкупно:</p>
            <p className="m-1">{totalPrice} ден.</p>
          </div>
          <hr />
          <div className="d-flex">
            <button className="g-btn w-50">
              <Link href="/orderForm">Продолжи</Link>
            </button>
            <img
              src="/images/icons/bin.png"
              className="iconsizing mx-2"
              onClick={clearLocalStorage}
            ></img>
          </div>
        </div>
      </div>

      <InfoButtons />
      <RelatedProducts />
    </div>
  );
};

export default Order;
