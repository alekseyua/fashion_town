import React, { useState } from 'react';
import CartViews from '../CartViews';
import Card from './Card';
import style from './styles/index.module.scss';

const ProductWhosaleHorizontalCard = ({ 
  items = [],
  condition,
  is_performed,
  title,
  currentCurrcensies,
  isVisibleLine = false,
  updateProductFromCart,
  deleteProductFromCart,
  cartitem_setUrl,
}) => {

  let newItems = items.filter(el=>!el.is_pack)
  let newItems1 = newItems.filter(el => el )
  // console.log(newItems1);
  return (
    <div className={style['wrapper-woosale']}>
      <CartViews.Text type={'text-brand'}>{title}</CartViews.Text>
      <CartViews.SuccesMinOrder messenge={condition} success={is_performed} />
      {newItems.map((el) => {

        return (
          <Card
            key={el.id}
            cartitem_setUrl={el.url}
            hideSales
            {...el}
            currentCurrcensies={currentCurrcensies}
            condition={condition}
            deleteProductFromCart={deleteProductFromCart}
            updateProductFromCart={updateProductFromCart}
          />
        );
      })}
      {isVisibleLine ? <CartViews.Line /> : null}
    </div>
  );
};

export default React.memo(ProductWhosaleHorizontalCard);
