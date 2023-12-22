import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import Card from "./Card"; 
import Link from "next/link";
import { Product } from "../types/ProductTypes";



interface SliderProps {
  products: Product[];
}

const ProductSlider: React.FC<SliderProps> = ({
  products: initialProducts,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Carousel>
      {products.map((product) => (
        <Carousel.Item key={product.id}>
          <Link href={product.link} >
            <span className="text-size-3">
              <Card
                image={product.image}
                name={product.name}
                price={product.price}
              />
            </span>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductSlider;
