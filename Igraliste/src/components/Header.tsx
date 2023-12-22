import React, { useEffect, useState } from "react";
import Link from "next/link";
import Search from "./search";
import AnimateBox from "./AnimateBox";
import { Subcategory, Category } from "../types/PageDetailsTypes";

const Header: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [dbData, setDbData] = useState<Category[] | null>(null);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
   // console.log(storedIsLoggedIn);
    if (storedIsLoggedIn !== isLoggedIn) {
      setLoggedIn(storedIsLoggedIn);
    }
  }, [isLoggedIn]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await fetch("http://localhost:5000/categories");
        const data: Category[] = await resData.json();
        setDbData(data);

        data.forEach((category) => {
          if (category.subcategories) {
            category.subcategories.forEach((subcategory) => {});
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!dbData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <nav className="navbar  navbar-expand-lg navbar-light bg-light justify-content-around">
        <button
          className="navbar-toggler border-0"
          type="button"
          data-toggle="collapse"
          data-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>{" "}
        <Link href="/" className="navbar-brand">
          <img
            className="navbar-brand"
            src="/images/Group 1.svg"
            alt="igraliste"
          />
        </Link>
        <Search />
        <div className="collapse navbar-collapse border-t " id="navbarScroll">
          <ul className="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll ">
            {dbData?.map((category) => (
              <li
                key={category.name}
                className={`nav-item  ${
                  category.subcategories ? "dropdown " : ""
                }`}
              >
                <a
                  className={`nav-link    ${
                    category.subcategories
                      ? "dropdown-toggle"
                      : "text-dark bold-underline"
                  }`}
                  href={category.link}
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  {category.name}
                </a>
                {category.subcategories && (
                  <ul className="dropdown-menu  p-0 bg-transparent border-0">
                    <li className="d-flex">
                      <img
                        src="/images/icons/sparks.png"
                        alt="sparks"
                        className="ic-size"
                      />{" "}
                      <Link href="/products">
                        <span className="dropdown-item p-0">Види ги сите</span>
                      </Link>
                    </li>
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory.name}>
                        {category.name === "Брендови" ? (
                          <Link
                            href={`/brand/${encodeURIComponent(
                              subcategory.name
                            )}`}
                          >
                            <span className="dropdown-item">{subcategory.name}</span>
                          </Link>
                        ) : (
                          <Link
                            href={`/products?type=${encodeURIComponent(
                              subcategory.name
                            )}`}
                          >
                            <span className="dropdown-item">{subcategory.name}</span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="py-2 text-secondary">
              <Link href="#">
                <span>Lifestyle</span>
              </Link>
            </li>
            <li className="py-2 text-secondary">
              <Link href="/giftCard">
                <span>Подари картичка</span>
              </Link>
            </li>
            <li className="py-2 text-secondary">
              <Link href="#">
                <span>Попуст</span>
              </Link>
            </li>
          </ul>

          <div className="frame">
            <div className="d-flex align-items-center">
              <img
                src="/images/icons/cart.png"
                alt="cart"
                className="custom-border p-1 m-1"
              />

              <p className="text-wrapper p-2">
                {" "}
                <Link href="/shop">Кошничка</Link>
              </p>
            </div>
            <div className="d-flex align-items-center">
              <img
                src="/images/icons/heart.png"
                alt="heart"
                className="custom-border p-1 m-1"
              />

              <p className="text-wrapper-2 p-2">
                {" "}
                <Link href="/shop">Омилени</Link>
              </p>
            </div>
            <div className="d-flex align-items-center">
              <img
                src="/images/icons/user.png"
                alt="User"
                className="custom-border p-1 m-1"
              />
              {isLoggedIn ? (
                <Link href="/MyProfile">
                  <span>Мој Профил</span>
                </Link>
              ) : (
                <span>
                  <Link href="/register">
                    <span>Регистрирај се/логирај се</span>
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>
        <AnimateBox />
      </nav>
    </div>
  );
};

export default Header;
