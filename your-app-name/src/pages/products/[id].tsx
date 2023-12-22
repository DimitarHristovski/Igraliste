import ProductImageSlider from "@/components/ImageSlider";
import React, { useState } from "react";
import InfoButtons from "../../components/InfoButtons";
import RelatedProducts from "../../components/RelatedProducts";
import Pagination from "../../components/Pagination";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
//import { useFavoritesContext } from "@/context/FavoritesContext";
//import { useCartContext } from "@/context/CartContext";
import { useRouter } from "next/router";
import { useProductContext } from "@/context/ProductContext";
import Breadcrumbs from "@/components/Breadcrumbs";
interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  advice: string;
  size: string[]; // Assuming an array of size options
  color: string;
  material: string[]; // Assuming an array of material options
  condition: string;
  maintenance: string;
  tags: string[]; // Assuming an array of tags
  link: string;
  type: string;
  date: string;
}
interface Accessory {
  id: number;
  image: string;
  name: string;
  price: string;
  description: string;
  quantity: number;
  advice: string;
  size: string[];
  color: string;
  material: string[];
  condition: string;
  maintenance: string;
  tags: string[];
  link: string;
  type: string;
  date: string;
}
interface ProductDetailProps {
  accessory: Accessory;

  products: Product;
  isFavorite: boolean;
  isOrdered: boolean;
}

const ProductDetail: NextPage<ProductDetailProps> = ({ products }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isOrdered, setIsOrdered] = useState<boolean>(false);

  const { toggleFavorite, toggleCartProduct } = useProductContext();
  const handleAddToCart = () => {
    toggleCartProduct(products.id);
  };
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
 // console.log(products);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleToggleFavorite = () => {
    toggleFavorite(products.id);
  };

 // console.log(products.price, toggleFavorite);
 // console.log(!isFavorite, products.id);

  if (!products) {
    return <div>Loading...</div>;
  }
  const [imageSrc, setImageSrc] = useState("/images/icons/heart.png");

  const handleClick = () => {
    if (imageSrc.includes("heart.png")) {
      setImageSrc("/images/icons/Full heart.png");
    } else {
      setImageSrc("/images/icons/heart.png");
    }
  };
  const [imageCartSrc, setImageCartSrc] = useState("/images/icons/cart.png");

  const handleClickCart = () => {
    if (imageCartSrc.includes("cart.png")) {
      setImageCartSrc("/images/icons/Check.png");
    } else {
      setImageCartSrc("/images/icons/cart.png");
    }
  };
  const breadcrumbItems = [
    { label: "Почетна", href: "/" },
    { label: "Vintage облека", href: "/products" },
    { label: `${products.name}` },
  ];
  return (
    <div className=" container-fluid my-5">
      <Breadcrumbs items={breadcrumbItems} />

      <h3>{products.name}</h3>
      <ProductImageSlider image={products.image} />
      <div className="my-3 col-12">
        <h1>{products.price}</h1>
        <p>{products.description}</p>
        <div className="d-flex">
          <p className="m-1 p-2 fs-22 bold-underline">Количина:</p>
          <div className="d-flex">
            <button onClick={decrementQuantity} className="m-1 p-2 fs-22">
              -
            </button>
            <p className="m-1 p-2 fs-22"> {quantity}</p>
            <button onClick={incrementQuantity} className="m-1 p-2 fs-22">
              +
            </button>
          </div>
        </div>
        <div className="row">
          {" "}
          <button
            className={`m-2 btn-custom p-2  ${isOrdered ? "ordered" : ""}`}
            onClick={handleAddToCart}
          >
            Додај во кошница
          </button>
          <img
            src={imageSrc}
            alt=""
            className={`m-2 ic-size ${isFavorite ? "favorited" : ""}`}
            onClick={() => {
              handleToggleFavorite();
              handleClick();
            }}
          />
        </div>
        <div className="row">
          <p className="m-2  p-2 bold-underline">Величина:</p>
          <p className="m-2  p-2">{products.size.join(", ")}</p>
          <p className="m-2  p-2">*само {products.quantity} парче</p>
        </div>
        <div className="row">
          <p className="m-2  p-2">{products.advice}</p>
          <p className="m-2  p-2 log-color">Види Димензии</p>
        </div>
        <div className="row">
          <p className="m-2  p-2 bold-underline">Боја:</p>
          <p className="m-2  p-2">{products.color}</p>
        </div>
        <div className="row">
          <p className="m-2  p-2 bold-underline">Материјал:</p>
          <p className="m-2  p-2">{products.material.join(", ")}</p>
        </div>
        <div className="row">
          <p className="m-2  p-2 bold-underline">Состојба:</p>
          <p className="m-2  p-2">{products.condition}</p>
          <p className="m-2  p-2 log-color">Прочитај повеќе</p>
        </div>
        <div className="row ">
          <p className="m-2  p-2 bold-underline">Насоки за одржување:</p>
          <p className="m-2  p-2">{products.maintenance}</p>
        </div>
        <div className="row flex-column ">
          <p className="m-2  p-2 bold-underline">Ознаки:</p>
          <div className="d-flex">
            {products.tags.map((tag, index) => (
              <button key={index} className="m-2 btn-custom p-2">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      <InfoButtons />
      <RelatedProducts />
      <Pagination />
      <div className="sticky-buttons flex-column d-flex">
        {" "}
        <img
          src={imageCartSrc}
          alt=""
          className={`p-2 m-2 btn-custom iconsizing ${
            isOrdered ? "ordered" : ""
          }`}
          onClick={() => {
            handleAddToCart();
            handleClickCart();
          }}
        />
        <img
          src={imageSrc}
          alt=""
          className={`p-2 m-2 btn-custom iconsizing ${
            isFavorite ? "favorited" : ""
          }`}
          onClick={() => {
            handleToggleFavorite();
            handleClick();
          }}
        />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetch("http://localhost:5000/products");
    const products: Product[] = await response.json();

    const paths = products.map((product) => ({
      params: { id: product.id.toString() },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching product list:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps<ProductDetailProps> = async ({
  params,
}) => {
  try {
    const productId = params?.id;
   // console.log("Product ID:", productId);
    const response = await fetch(`http://localhost:5000/products/${productId}`);
    const products: Product = await response.json();

   // console.log("Product data:", products);

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      props: {
        products: null,
      },
    };
  }
};

export default ProductDetail;
