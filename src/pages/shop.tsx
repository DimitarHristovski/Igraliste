import React, { useState } from "react";
import Order from "../components/Order";
import Favorites from "../components/Favorites";
import { useProductContext } from "@/context/ProductContext";

type ActiveView = "Order" | "Favorites";

const Shop: React.FC = () => {
  const {
    favoriteProductsIds,
    cartGiftCardIds,

    cartProductIds,
  } = useProductContext();
  const [view, setView] = useState<ActiveView>("Order");

  const handleViewChange = (newView: ActiveView) => {
    setView(newView);
  };
  const combinedCartCount = cartProductIds.length + cartGiftCardIds.length;
  const combinedFavoritesCount = favoriteProductsIds.length;
  // console.log("Combined Cart Count:", combinedCartCount);
  return (
    <div className="container ">
      <div className="row ">
        <div className="col-10 d-flex text-center justify-content-center bold-underline-2 offset-1 ">
          <div className="mx-2">
            <img src="/images/icons/cart.png" alt="" />
            <button
              className={`p-3 ${view === "Order" ? "active" : ""}`}
              onClick={() => handleViewChange("Order")}
            >
              Кошница
            </button>{" "}
            <span>({combinedCartCount})</span>
          </div>
          <div className="mx-2">
            <img src="/images/icons/heart.png" alt="" />
            <button
              className={`p-3 ${view === "Favorites" ? "active" : ""}`}
              onClick={() => handleViewChange("Favorites")}
            >
              Омилени
            </button>
            <span>({combinedFavoritesCount})</span>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12">
          {view === "Order" && <Order />}
          {view === "Favorites" && <Favorites />}
        </div>
      </div>
    </div>
  );
};

export default Shop;
