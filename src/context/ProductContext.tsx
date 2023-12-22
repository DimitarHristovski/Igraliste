import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/ProductTypes";
import { ProductContextType } from "../types/ContextTypes";
import { GiftCard } from "@/types/PageDetailsTypes";

interface Props {
  children: React.ReactNode;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);

  const [loading, setLoading] = useState(true);
  const [favoriteProductsIds, setFavoriteProductsIds] = useState<number[]>(
    () => {
      try {
        return JSON.parse(localStorage.getItem("favoriteProductsIds") || "[]");
      } catch (error) {
        console.error(
          "Error parsing favoriteProductsIds from localStorage:",
          error
        );
        return [];
      }
    }
  );
  const [cartProductIds, setCartProductIds] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("cartProductIds") || "[]");
    } catch (error) {
      console.error("Error parsing cartProductIds from localStorage:", error);
      return [];
    }
  });

  const [cartGiftCardIds, setCartGiftCardIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("cartGiftCardIds") || "[]");
    } catch (error) {
      console.error("Error parsing cartGiftCardIds from localStorage:", error);
      return [];
    }
  });
  useEffect(() => {
    const fetchProductData = async () => {
      const data = await fetch(
        "https://protected-reaches-74137-663edc83df86.herokuapp.com/products"
      ).then((response) => response.json());
      setProducts(data);
      const giftCardData = await fetch(
        "https://protected-reaches-74137-663edc83df86.herokuapp.com/giftcards"
      ).then((response) => response.json());
      setGiftCards(giftCardData);
      setLoading(false);
    };

    fetchProductData();
  }, []);

  const favoriteProducts = products.filter((product) =>
    favoriteProductsIds.includes(product.id)
  );
  const cartProducts = products.filter((product) =>
    cartProductIds.includes(product.id)
  );

  const toggleFavorite = (productId: number) => {
    setFavoriteProductsIds((prevIds) => {
      if (prevIds.includes(productId)) {
        return prevIds.filter((id) => id !== productId);
      } else {
        return [...prevIds, productId];
      }
    });
  };
  const toggleCartGiftCard = (giftCardId: string) => {
    setCartGiftCardIds((prevIds) => {
      if (prevIds.includes(giftCardId)) {
        return prevIds.filter((id) => id !== giftCardId);
      } else {
        return [...prevIds, giftCardId];
      }
    });
  };
  const toggleCartProduct = (productId: number) => {
    setCartProductIds((prevIds) => {
      if (prevIds.includes(productId)) {
        return prevIds.filter((id) => id !== productId);
      } else {
        return [...prevIds, productId];
      }
    });
  };
  useEffect(() => {
    try {
      localStorage.setItem(
        "favoriteProductsIds",
        JSON.stringify(favoriteProductsIds)
      );
    } catch (error) {
      console.error(
        "Error storing favoriteProductsIds in localStorage:",
        error
      );
    }
  }, [favoriteProductsIds]);

  const contextValue: ProductContextType = {
    products,

    favoriteProductsIds,

    toggleFavorite,

    giftCards,
    cartProductIds,

    toggleCartProduct,

    cartGiftCardIds,
    toggleCartGiftCard,
  };
  useEffect(() => {
    try {
      localStorage.setItem("cartGiftCardIds", JSON.stringify(cartGiftCardIds));
    } catch (error) {
      console.error("Error storing cartGiftCardIds in localStorage:", error);
    }
  }, [cartGiftCardIds]);
  useEffect(() => {
    try {
      localStorage.setItem("cartProductIds", JSON.stringify(cartProductIds));
    } catch (error) {
      console.error("Error storing cartProductIds in localStorage:", error);
    }
  }, [cartProductIds]);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductContext must be used within a FavoritesProvider"
    );
  }
  return context;
};
