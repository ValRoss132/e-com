import React from 'react';
import './Pagination.scss';
import { Link } from 'react-router-dom';

export type Pagination = {
  productsPerPage: number;
  totalProducts: number;
  paginate: (value: number) => void;
  currentPage: number;
};

const Pagination: React.FC<Pagination> = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers: Array<number | null> = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  // if (startPage > 1) {
  //   pageNumbers.push(1);
  //   pageNumbers.push(null);
  // }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  if (endPage < totalPages) {
    pageNumbers.push(null);
    pageNumbers.push(totalPages);
  }

  return (
    <div className="pagination">
      <ul style={{ display: 'flex' }}>
        {pageNumbers.map((number, index) => {
          if (number === null) {
            return (
              <li className="page-item disabled" key={index}>
                <span className="page-link">...</span>
              </li>
            );
          } else {
            return (
              <li className={`page-item ${number == currentPage ? 'active' : ''}`} key={index}>
                <Link to="/" className={`page-link`} onClick={() => paginate(number)}>
                  {number}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Pagination;
