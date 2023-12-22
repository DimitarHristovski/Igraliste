import React, { useEffect, useState } from "react";
import Header from "./Header";

interface FilterData {
  categories: CategoryData[];
  brands: BrandData[];
  accessories: AccessoryData[];
  sizes: SizeData[];
  colors: ColorData[];
  priceRanges: PriceData[];
}

interface CategoryData {
  name: string;
  subcategories?: string[];
}

interface BrandData {
  name: string;
}

interface AccessoryData {
  name: string;
}

interface SizeData {
  name: string;
}

interface ColorData {
  name: string;
  value: string;
}

interface PriceData {
  name: string;
}

const Filter: React.FC = ({
  setView,
  setAppliedFilters,
  data,
  appliedFilters,
}) => {
  // console.log(data);
  const [filterData, setFilterData] = useState<FilterData | null>(null);
  const [searchInput, setSearchInput] = useState("");

  const handleCheckboxChange = (filter: { type: string; value: any }) => {
    if (filter.type === "priceRange") {
      const rangeString = filter.value.name;
      let parsedRange = {};

      if (rangeString.includes(" - ")) {
        const [minStr, maxStr] = rangeString.split(" - ");
        const min = parseInt(minStr);
        const max = parseInt(maxStr.split(" ")[0]);
        parsedRange = { min, max };
      } else if (rangeString.startsWith("Над ")) {
        const min = parseInt(rangeString.split(" ")[1]);
        parsedRange = { min };
      }

      filter.value = parsedRange;
    }

    setAppliedFilters((prev: any[]) => {
      const index = prev.findIndex(
        (f) =>
          f.type === filter.type &&
          JSON.stringify(f.value) === JSON.stringify(filter.value)
      );

      if (index > -1) {
        return prev.filter((_, i) => i !== index);
      } else {
        return [...prev, filter];
      }
    });
  };

  let countItemsByType = (type) => {
    let filteredForCount = data;
    appliedFilters.forEach((filter) => {
      if (filter.type === "size") {
        filteredForCount = filteredForCount.filter(
          (item) => item.size && item.size.includes(filter.value)
        );
      } else if (filter.type === "priceRange") {
        const range = filter.value;
        if (range.min !== undefined && range.max !== undefined) {
          filteredForCount = filteredForCount.filter(
            (item) => item.price >= range.min && item.price <= range.max
          );
        } else if (range.min !== undefined) {
          filteredForCount = filteredForCount.filter(
            (item) => item.price >= range.min
          );
        }
      } else if (filter.type !== "type") {
        filteredForCount = filteredForCount.filter(
          (item) => item[filter.type] === filter.value
        );
      }
    });

    const count = filteredForCount.filter((item) => item.type === type).length;

    return count;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/filter");

        if (response.ok) {
          const jsonData: FilterData = await response.json();

          setFilterData(jsonData);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBackButtonClick = () => {
    setView("index");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log("Performing search:", searchInput);
  };

  function parsePriceRange(rangeStr) {
    if (rangeStr.includes(" - ")) {
      const [minStr, maxStr] = rangeStr.split(" - ");
      const min = parseInt(minStr);
      const max = parseInt(maxStr.split(" ")[0]);
      return { min, max };
    } else if (rangeStr.startsWith("Над ")) {
      const min = parseInt(rangeStr.split(" ")[1]);
      return { min };
    } else if (rangeStr === "На попуст*") {
      return { discount: true };
    }
    return {};
  }
  const isPriceRangeApplied = (priceRangeName) => {
    const range = parsePriceRange(priceRangeName);

    return appliedFilters.some((filter) => {
      if (filter.type !== "priceRange") return false;

      const appliedRange = filter.value;
      return (
        range.min === appliedRange.min &&
        (range.max === appliedRange.max ||
          (range.max === undefined && appliedRange.max === undefined))
      );
    });
  };

  const isColorSelected = (colorValue) => {
    return appliedFilters.some(
      (filter) => filter.type === "color" && filter.value === colorValue
    );
  };
  //console.log(filterData?.colors);
  return (
    <div>
      <div className="container bg-light w-100 h-100 z-index scroll">
        <Header />
        <div className="row">
          <div className="col-12">
            <form
              className="d-flex m-auto  p-1 w-75"
              onSubmit={handleSearchSubmit}
            >
              <i className="fas fa-angle-left" />
              <input
                type="text"
                placeholder="Пребарувај"
                value={searchInput}
                onChange={handleInputChange}
                className="form-control border-0 justify-content-center align-content-center d-flex"
              />
              <img
                src="/images/icons/search.png"
                alt=""
                style={{ cursor: "pointer" }}
              />
            </form>
          </div>
        </div>

        <div className="row d-md-none">
          <div className="col-12">
            <h3>Категорија</h3>
            {filterData &&
              filterData.categories.map((category, index) => (
                <div key={index} className="d-flex m-1">
                  <input
                    type="checkbox"
                    name={category.name}
                    id={category.name}
                    className="p-2"
                    checked={appliedFilters.some(
                      (filter) =>
                        filter.type === "type" && filter.value === category.name
                    )}
                    onChange={() =>
                      handleCheckboxChange({
                        type: "type",
                        value: category.name,
                      })
                    }
                  />
                  <p className="p-2">{category.name}</p>
                  <span className="p-2">
                    ({countItemsByType(category.name)})
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="row d-md-none">
          <div className="col-12">
            <h3>Брендови</h3>
            {filterData &&
              filterData.brands.map((brand, index) => (
                <div key={index} className="d-flex m-1">
                  <input
                    type="checkbox"
                    name={brand.name}
                    id={brand.name}
                    className="p-2"
                    checked={appliedFilters.some(
                      (filter) =>
                        filter.type === "brand" && filter.value === brand.name
                    )}
                    onChange={() =>
                      handleCheckboxChange({
                        type: "brand",
                        value: brand.name,
                      })
                    }
                  />
                  <p className="p-2">{brand.name}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="row d-md-none">
          <div className="col-12">
            <h3>Аксесоари</h3>
            {filterData &&
              filterData.accessories.map((accessory, index) => (
                <div key={index} className="d-flex m-1">
                  <input
                    type="checkbox"
                    name={accessory.name}
                    id={accessory.name}
                    className="p-2"
                    checked={appliedFilters.some(
                      (filter) =>
                        filter.type === "type" &&
                        filter.value === accessory.name
                    )}
                    onChange={() =>
                      handleCheckboxChange({
                        type: "type",
                        value: accessory.name,
                      })
                    }
                  />
                  <p className="p-2">{accessory.name}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="row d-md-none">
          <div className="col-12">
            <h3>Величина</h3>
            {filterData &&
              filterData.sizes.map((size, index) => (
                <div key={index} className="d-flex m-1">
                  <input
                    type="checkbox"
                    name={size.name}
                    id={size.name}
                    className="p-2"
                    checked={appliedFilters.some(
                      (filter) =>
                        filter.type === "size" && filter.value === size.name
                    )}
                    onChange={() =>
                      handleCheckboxChange({
                        type: "size",
                        value: size.name,
                      })
                    }
                  />
                  <p className="p-2">{size.name}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="row d-md-none">
          <div className="col-12 d-flex flex-wrap flex-column">
            <h3>Боја</h3>
            <div className="d-flex flex-wrap col-7">
              {filterData &&
                filterData.colors.map((color, index) => (
                  <div
                    key={index}
                    className="color-box"
                    style={{
                      backgroundColor: color.value,
                      border: isColorSelected(color.value)
                        ? "2px solid black"
                        : "none", // Add border if selected
                    }}
                    onClick={() =>
                      handleCheckboxChange({
                        type: "color",
                        value: color.value,
                      })
                    }
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="row d-md-none mb-6">
          <div className="col-12">
            <h3>Цена</h3>
            {filterData &&
              filterData.priceRanges.map((price, index) => (
                <div key={index} className="d-flex m-1">
                  <input
                    type="checkbox"
                    name={price.name}
                    id={price.name}
                    className="p-2"
                    checked={isPriceRangeApplied(price.name)}
                    onChange={() =>
                      handleCheckboxChange({ type: "priceRange", value: price })
                    }
                  />
                  <p className="p-2">{price.name}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="z-index p-5">
          <button className="g-btn" onClick={handleBackButtonClick}>
            Филтрирај
          </button>
          <p
            className="text-center"
            onClick={() => {
              handleBackButtonClick();
              setAppliedFilters([]);
            }}
          >
            откажи
          </p>
        </div>
      </div>
    </div>
  );
};

export default Filter;
