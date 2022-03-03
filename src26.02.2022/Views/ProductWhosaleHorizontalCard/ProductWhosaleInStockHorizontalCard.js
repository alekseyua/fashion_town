import React, { useState } from 'react';
import CartViews from '../CartViews';
import Card from './Card';
import style from './styles/index.module.scss';

const ProductWhosaleInStockHorizontalCard = ({
  items = [],
  currentCurrcensies,
  updateProductFromCart,
  deleteProductFromCart,
}) => {

  return (
    <div className={style['wrapper-woosale']}>
      <CartViews.Line />
      <CartViews.Text type={'text-brand'}>Товары в наличии</CartViews.Text>
      {items.map((el) => {

        return (
          <Card
            key={el.id}
            hideSales
            {...el}
            currentCurrcensies={currentCurrcensies}
            deleteProductFromCart={deleteProductFromCart}
            updateProductFromCart={updateProductFromCart}
            product={el.product}
          />
        );
      })}
    </div>
  );
};

export default React.memo(ProductWhosaleInStockHorizontalCard);
