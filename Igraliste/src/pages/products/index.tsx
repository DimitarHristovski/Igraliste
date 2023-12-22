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
  const [sortOption, setSortOption] = useState("najnovo");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [combinedData, setCombinedData] = useState<Product[]>(products);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [filteredData, setFilteredData] = useState([products]);
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
        const sortedData = combinedData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);

          if (sortOption === "najnovo") {
            return dateB.getTime() - dateA.getTime(); // Newest to oldest
          } else if (sortOption === "najstaro") {
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
  useEffect(() => {
    if (appliedFilters.length === 0) {
      setFilteredData(combinedData);
      return;
    }

    const filtersByType = appliedFilters.reduce((acc, filter) => {
      (acc[filter.type] = acc[filter.type] || []).push(filter.value);
      return acc;
    }, {});

    let currentFilteredData = combinedData.filter((item) => {
      for (let filterType in filtersByType) {
        if (filterType === "size") {
          if (
            !item.size ||
            !filtersByType[filterType].some((size) => item.size.includes(size))
          ) {
            return false;
          }
        } else if (filterType === "priceRange") {
          let matchesPriceRange = filtersByType[filterType].some((range) => {
            if (range.min !== undefined && range.max !== undefined) {
              return item.price >= range.min && item.price <= range.max;
            } else if (range.min !== undefined) {
              return item.price >= range.min;
            }
            return false;
          });

          if (!matchesPriceRange) return false;
        } else if (filterType === "color") {
          // Handling color filters
          let colorFilterValues = filtersByType[filterType].map(
            (color) => colorMapping[color] || color
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
      const newFilters = Object.entries(queryParams).map(([key, value]) => ({
        type: key,
        value: Array.isArray(value)
          ? value.map((v) => decodeURIComponent(v))
          : decodeURIComponent(value),
      }));
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
                    className="m-1 bg-transparent"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="najnovo">najnovo</option>
                    <option value="najstaro">najstaro</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {currentItems
              .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                if (sortOption === "najnovo") {
                  return dateB.getTime() - dateA.getTime();
                } else if (sortOption === "najstaro") {
                  return dateA.getTime() - dateB.getTime();
                }

                return 0;
              })
              .map((item) => (
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
  const productsResponse = await fetch("http://localhost:5000/products");
  const productsData: Product[] = await productsResponse.json();

  return {
    props: {
      products: productsData,
    },
  };
}
