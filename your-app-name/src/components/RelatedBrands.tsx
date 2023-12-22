import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Brand } from "../types/BrandTypes";
import Pagination from "./Pagination";
const RelatedBrands = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Adjust as needed

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="row">
      <h3 className="mx-4 p-2">Парчиња од Брендот</h3>
      <div className="col-12 d-flex flex-wrap">
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
      </div>
      <div className="m-auto">
        <Pagination
          onPageChange={handlePageChange}
          totalPages={Math.ceil(products.length / itemsPerPage)}
        />
      </div>
    </div>
  );
};

export default RelatedBrands;
