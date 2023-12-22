import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Card from "./Card"; // Adjust the import path based on your project structure
import Link from "next/link";
import link from "next/link";
import { Product } from "../types/ProductTypes";

const Search: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleSearchClose = () => {
    setShowSearch(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    if (inputValue.trim() !== "") {
      debounceSearch(inputValue);
    } else {
      setSearchResults([]);
    }
  };

  const debounceSearch = debounce(async (inputValue: string) => {
    const response = await fetch(`http://localhost:5000/products`);
    const data: Product[] = await response.json();

    const filteredResults = data.filter((product) =>
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, 300);
  const handleCardClick = () => {
    setShowSearch(false); 
  };
  return (
    <>
      <img
        src="/images/icons/search.png"
        alt=""
        onClick={handleSearchClick}
        style={{ cursor: "pointer" }}
      />

      <Modal
        show={showSearch}
        onHide={handleSearchClose}
        dialogClassName="modal-100w "
      >
        <Modal.Header closeButton>
          <form
            className="d-flex m-auto custom-border p-1 w-75"
            onSubmit={(e) => e.preventDefault()}
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
              onClick={handleSearchClick}
              style={{ cursor: "pointer" }}
            />
          </form>
        </Modal.Header>
        <Modal.Body className="modal-100w  scroll ">
          <div className="row">
            <div className="col-12 d-flex flex-wrap ">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="col-6 mb-4 "
                  onClick={handleCardClick}
                >
                  <Link href={product.link} >
                    <span>
                      <Card
                        image={product.image}
                        title={product.name}
                        price={product.price}
                      />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

function debounce(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

export default Search;
