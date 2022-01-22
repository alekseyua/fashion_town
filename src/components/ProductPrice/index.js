import React from 'react';
import { useStoreon } from 'storeon/react';
import ProductPriceLayout from '../../Views/ProductPrice/';

const ProductPrice = ({ price, oldPrice = null }) => {
  const { currenssies } = useStoreon('currenssies');
  const formatedCurrenssies = String(currenssies).toUpperCase();

  return <ProductPriceLayout price={price} oldPrice={oldPrice} currenssies={formatedCurrenssies} />;
};

export default React.memo(ProductPrice);
