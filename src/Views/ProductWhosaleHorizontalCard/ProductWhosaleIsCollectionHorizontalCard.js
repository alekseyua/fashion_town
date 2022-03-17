import React, { useState } from 'react';
import CartViews from '../CartViews';
import Card from './Card';
import style from './styles/index.module.scss';

const ProductWhosaleIsCollectionHorizontalCard = ({
  items = [],
  currentCurrcensies,
  updateProductFromCart,
  deleteProductFromCart,
  is_collection,
}) => {
  return (
    <div className={style['wrapper-woosale']}>
      <CartViews.Line />
      <CartViews.Text type={'text-brand'}>Товары коллекцией</CartViews.Text>

      {items.map(el => {
        return (
          <Card
            key={el.id}
            hideSales
            is_packColor = { el.color }
            is_packSize = { el.size }
            is_packUrl = { el.url }
            is_packPrice = {el.price}
            qty={el.qty}
            {...el}
            is_collection={is_collection}
            currentCurrcensies={currentCurrcensies}
            deleteProductFromCart={deleteProductFromCart}
            updateProductFromCart={updateProductFromCart}
          />
        );
      })}
 <CartViews.Line /> 
    </div>
  );
};

export default React.memo(ProductWhosaleIsCollectionHorizontalCard);
