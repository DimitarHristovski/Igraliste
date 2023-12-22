import { Brand } from "./BrandTypes";
import { GiftCard } from "./PageDetailsTypes";
import { Product } from "./ProductTypes";

export interface CartContextType {
  giftCards: GiftCard[];

  products: Product[];
  brands: Brand[];
  cartProductIds: number[];
  toggleCartProduct: (productId: number) => void;
  cartBrandIds: number[];
  toggleCartBrand: (brandId: number) => void;
  cartGiftCardIds: string[];
  toggleCartGiftCard: (giftCardId: string) => void;
}

export interface FavoritesContextType {
  products: Product[];
  brands: Brand[];
  favoriteProductsIds: number[]; // Corrected data type to match the 'id' type of products
  toggleFavorite: (productId: number) => void; // Corrected data type for productId
  favoriteBrandsIds: number[];
  toggleFavoriteBrand: (brandId: number) => void;
}

export interface ProductContextType {
  products: Product[];
  
  favoriteProductsIds: number[]; // Corrected data type to match the 'id' type of products
  toggleFavorite: (productId: number) => void; // Corrected data type for productId
  
  
  giftCards: GiftCard[];

  
  cartProductIds: number[];
  toggleCartProduct: (productId: number) => void;

 
  cartGiftCardIds: string[];
  toggleCartGiftCard: (giftCardId: string) => void;
}
