import React, { useState } from "react";

const Pagination = ({ onPageChange, totalPages }: any) => {
  const visiblePages = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / visiblePages) * visiblePages;
    let pages = [];
    for (let i = 0; i < Math.min(visiblePages, totalPages - start); i++) {
      pages.push(start + i + 1);
    }
    return pages;
  };

  const handlePageClick = (page: any) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="k text-dark bg-transparent p-2 m-2"
            onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {getPaginationGroup().map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <a
              className=" text-dark bg-transparent p-2 m-2"
              onClick={() => handlePageClick(page)}
            >
              {page}
            </a>
          </li>
        ))}
        {totalPages > visiblePages && (
          <li className="page-item disabled">
            <span className=" bg-transparent">...</span>
          </li>
        )}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className=" text-dark bg-transparent p-2 m-2"
            onClick={() =>
              currentPage < totalPages && handlePageClick(currentPage + 1)
            }
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
