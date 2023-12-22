import React, { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import router from "next/router";
import { Product } from "../types/ProductTypes";
import Pagination from "./Pagination";

const RelatedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust number of items per page as needed

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
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="row ">
      <h3 className="mx-4 p-2">Други Парчиња</h3>
      <div className="col-12 d-flex flex-wrap ">
        {currentItems.map((product) => (
          <div key={product.id} className="col-6">
            <Link href={`/products/${product.id}`}>
              <span className="text-size-3">
                <Card
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              </span>
            </Link>
          </div>
        ))}
        <div className="m-auto"> <Pagination
          onPageChange={handlePageChange}
          totalPages={Math.ceil(products.length / itemsPerPage)}
        /></div>
       
      </div>
    </div>
  );
};

export default RelatedProducts;
