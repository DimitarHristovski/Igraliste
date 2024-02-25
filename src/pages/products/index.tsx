import React, { useEffect, useState } from "react";
import Filter from "../../components/Filter"; // Assuming the correct import path for the filter component
import Link from "next/link";
import Card from "@/components/Card";
import { NextPage } from "next";
//import Brand from "./brands/[id]";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";

type ActiveView = "index" | "Filter";
interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  // link: string;
  type: string;
  date: string;
}

interface IndexProps {
  products: Product[];
}
const Index: NextPage<IndexProps> = ({ products }: IndexProps) => {
  const [view, setView] = useState<ActiveView>("index");
  const [sortOption, setSortOption] = useState<any>("Newest");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<any>(false);
  const [combinedData, setCombinedData] = useState<any>(products);
  const [appliedFilters, setAppliedFilters] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([products]);
  //console.log(filteredData);
  const handleBackButtonClick = () => {
    setView("Filter");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handlePageChange = (newPage: React.SetStateAction<number>) => {
    setCurrentPage(newPage);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const sortedData = combinedData.sort((a: any, b: any) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);

          if (sortOption === "Newest") {
            return dateB.getTime() - dateA.getTime(); // Newest to oldest
          } else if (sortOption === "Oldest") {
            return dateA.getTime() - dateB.getTime(); // Oldest to newest
          }

          return 0;
        });

        setCombinedData(sortedData);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortOption]);
  const colorMapping = {
    "var(--red)": "red",
    "var(--orange)": "orange",
    "var(--yellow)": "yellow",
    "var(--green)": "green",
    "var(--blue)": "blue",
    "var(--cream)": "cream",
    "var(--pink)": "pink",
    "var(--gray)": "gray",
    "var(--white)": "white",
    "var(--black)": "black",
  };
  type ColorName = keyof typeof colorMapping;

  useEffect(() => {
    if (appliedFilters.length === 0) {
      setFilteredData(combinedData);
      return;
    }

    const filtersByType = appliedFilters.reduce((acc: any, filter: any) => {
      (acc[filter.type] = acc[filter.type] || []).push(filter.value);
      return acc;
    }, {});

    let currentFilteredData = combinedData.filter((item: any) => {
      for (let filterType in filtersByType) {
        if (filterType === "size") {
          if (
            !item.size ||
            !filtersByType[filterType].some((size: any) =>
              item.size.includes(size)
            )
          ) {
            return false;
          }
        } else if (filterType === "priceRange") {
          let matchesPriceRange = filtersByType[filterType].some(
            (range: any) => {
              if (range.min !== undefined && range.max !== undefined) {
                return item.price >= range.min && item.price <= range.max;
              } else if (range.min !== undefined) {
                return item.price >= range.min;
              }
              return false;
            }
          );

          if (!matchesPriceRange) return false;
        } else if (filterType === "color") {
          // Handling color filters
          let colorFilterValues = filtersByType[filterType].map(
            (color: ColorName) => colorMapping[color] || color
          );
          if (!colorFilterValues.includes(item.color)) {
            return false;
          }
        } else {
          // Handling other filters
          if (!filtersByType[filterType].includes(item[filterType])) {
            return false;
          }
        }
      }
      return true;
    });

    setFilteredData(currentFilteredData);
  }, [appliedFilters, combinedData]);

  const router = useRouter(); // Use the useRouter hook
  useEffect(() => {
    const queryParams = router.query;
    if (Object.keys(queryParams).length > 0) {
      const newFilters = Object.entries(queryParams).map(
        ([key, value]: any) => ({
          type: key,
          value: Array.isArray(value)
            ? value.map((v) => decodeURIComponent(v))
            : decodeURIComponent(value),
        })
      );
      setAppliedFilters(newFilters);
    }
  }, [router.query]);
  // console.log(appliedFilters);
  const breadcrumbItems = [
    { label: "Почетна", href: "/" },
    { label: "Сите", href: "/products" },
  ];
  return (
    <div className="container p-0 my-5">
      {" "}
      {view === "Filter" ? (
        <Filter
          setAppliedFilters={setAppliedFilters}
          appliedFilters={appliedFilters}
          setView={setView}
          data={combinedData}
        />
      ) : (
        <>
          <div className="d-flex  flex-column ">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="d-flex  justify-content-around align-items-stretch">
              <img
                src="/images/icons/fluent_search-48-regular.png"
                alt=""
                className="border-custom p-1 "
                onClick={handleBackButtonClick}
              />
              <div>
                <div className="d-flex">
                  <label htmlFor="Filter" className="m-1">
                    Podredi spored
                  </label>
                  <select
                    name="Filter"
                    id="Filter"
                    className="m-1 bg-transparent text-dark"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {currentItems
              .sort((a: any, b: any) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                if (sortOption === "Newest") {
                  return dateB.getTime() - dateA.getTime();
                } else if (sortOption === "Oldest") {
                  return dateA.getTime() - dateB.getTime();
                }

                return 0;
              })
              .map((item: any) => (
                <div key={item.id} className="col-6">
                  <Link href={`/products/${item.id}`}>
                    <Card
                      name={item.name}
                      image={item.image}
                      price={item.price}
                    />
                  </Link>
                </div>
              ))}
          </div>
          <Pagination
            onPageChange={handlePageChange}
            totalPages={Math.ceil(products.length / itemsPerPage)}
          />
        </>
      )}
    </div>
  );
};

export default Index;

export async function getStaticProps() {
  const productsResponse = await fetch(
    "https://protected-reaches-74137-663edc83df86.herokuapp.com/products"
  );
  const productsData: Product[] = await productsResponse.json();

  return {
    props: {
      products: productsData,
    },
  };
}
