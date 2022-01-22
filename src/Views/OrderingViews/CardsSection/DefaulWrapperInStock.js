import React from 'react';
import CartViews from '../../../Views/CartViews';
import style from '../styles/index.module.scss';

const DefaulWrapperInStock = ({ children, title = 'In stock' }) => {
  return (
    <div className={style['wrapper-woosale']}>
      <CartViews.Text type={'text-brand'}>{title}</CartViews.Text>
      <CartViews.Line />
      {children}
    </div>
  );
};

export default React.memo(DefaulWrapperInStock);
