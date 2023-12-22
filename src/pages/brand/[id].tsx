import Pagination from "@/components/Pagination";
import RelatedBrands from "@/components/RelatedBrands";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BrandData, BrandDataSection } from "../types/PageDetailsTypes";
import { useRouter } from "next/router";
import { useProductContext } from "@/context/ProductContext";
import Breadcrumbs from "@/components/Breadcrumbs";

const BrandDetails: React.FC = () => {
  const [productsData, setProductsData] = useState<BrandData | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Array<ProductType>>(
    []
  );
  const router = useRouter();
  const { id } = router.query;
  const { products } = useProductContext();
  //console.log(id);

  useEffect(() => {
    if (id && products) {
      const decodedBrandName = decodeURIComponent(id as string);
      const matchingProducts = products.filter(
        (product) => product.brand === decodedBrandName
      );
      setFilteredProducts(matchingProducts);
    }
  }, [id, products]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/BrandData");
        if (response.ok) {
          const jsonData: BrandData = await response.json();
          setProductsData(jsonData);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!productsData) {
    return <div>Loading...</div>;
  }
  const breadcrumbItems = [
    { label: "Почетна", href: "/" },
    { label: "Локални Брендови", href: "/products" },
    { label: `${id}` },
  ];
  return (
    <div className="container">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="d-flex justify-content-start ">
        {productsData.icon && (
          <img
            src={productsData.icon}
            alt={productsData.title}
            className="my-auto ic-size"
            width={50}
            height={50}
          />
        )}
        <h1 className="m-2 p-2 ">{id}</h1>
      </div>
      {productsData.content.map((section, index) => (
        <div key={section.id || index}>
          {section.image && (
            <>
              <img
                src={section.image}
                alt={section.heading}
                width={500}
                height={300}
              />
              <p className="m-2 p-2 ">{section.heading}</p>
            </>
          )}
          {section.questions && (
            <ul>
              {section.questions.map((question, idx) => (
                <li key={idx} className="ul-style ml-5 p-2">
                  {question}
                </li>
              ))}
            </ul>
          )}
          {section.text && <p className="m-2 p-2">{section.text}</p>}
        </div>
      ))}
      <RelatedBrands products={filteredProducts} />
      
    </div>
  );
};

export default BrandDetails;
