import React, { useState } from "react";
import Pagination from "./Pagination";
import Card from "./Card";
import RelatedProducts from "./RelatedProducts";
import Link from "next/link";
import { useProductContext } from "@/context/ProductContext";

const Favorites: React.FC = () => {
  const { products, favoriteProductsIds, toggleFavorite } = useProductContext();

  const favoriteProducts = products.filter((product) =>
    favoriteProductsIds.includes(product.id)
  );

  //console.log("Favorite Products:", favoriteProductsIds);

  return (
    <div className="container">
      <div className="row">
        {favoriteProducts.map((product) => (
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

      <RelatedProducts />
    </div>
  );
};

export default Favorites;
