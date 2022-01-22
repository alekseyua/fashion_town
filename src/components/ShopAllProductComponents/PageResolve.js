import React, { useState } from 'react';
import qs from 'querystring';
import { SHOP_PAGE } from '../../const';

const PageResolve = ({ children, initPage = SHOP_PAGE.ALL_PRODUCTS, loadData, filterParams }) => {
  const [state, setstate] = useState({
    page: initPage.toUpperCase(),
  });

  const setPage = (page = SHOP_PAGE.ALL_PRODUCTS) => {
    loadData(1, {
      ...filterParams,
      rout: page.toLowerCase(),
    });
    setstate({
      ...state,
      page,
    });
  };

  return (
    <>
      {children({
        page: state.page,
        setPage: setPage,
      })}
    </>
  );
};

export default React.memo(PageResolve);
