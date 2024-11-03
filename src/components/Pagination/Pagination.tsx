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
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <ul style={{ display: 'flex' }}>
        {pageNumbers.map((number) => (
          <li className={`page-item ${number == currentPage ? 'active' : ''}`} key={number}>
            <Link to="/" className={`page-link`} onClick={() => paginate(number)}>
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
