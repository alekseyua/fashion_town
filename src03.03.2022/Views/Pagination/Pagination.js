import React from 'react';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_COUNT_PAGINATION } from '../../const';
import { Link } from 'react-router-dom';
import Pagination from 'react-paginating';
import qs from 'query-string';

const Paginations = ({ count = 200, activePage = 1, params = {}, addClass = '' }) => {
  return (
    <Pagination
      total={count}
      limit={params.page_size ? params.page_size : DEFAULT_PAGE_SIZE}
      pageCount={DEFAULT_PAGE_COUNT_PAGINATION}
      currentPage={activePage}
    >
      {({ pages, currentPage, hasNextPage, hasPreviousPage, previousPage, nextPage }) => (
        <div className={`pagination ${addClass}`}>
          {hasPreviousPage ? (
            <Link
              className="pagination-btn pagination-prev"
              to={`?${qs.stringify({ ...params, page: previousPage })}`}
            />
          ) : null}
          {pages.length > 1 ? (
            <>
              {pages.map((page) => (
                <Link
                  key={page}
                  className={`pagination-btn ${currentPage === page ? 'pagination-active' : ''}`}
                  to={`?${qs.stringify({ ...params, page: page })}`}
                >
                  {page}
                </Link>
              ))}
            </>
          ) : null}
          {hasNextPage ? (
            <Link
              className="pagination-btn pagination-next"
              to={`?${qs.stringify({ ...params, page: nextPage })}`}
            />
          ) : null}
        </div>
      )}
    </Pagination>
  );
};
export default React.memo(Paginations);
