import React from 'react';
import style from './styles/index.module.scss';

const CartViews = ({ children }) => {
  return <div className={style['cart__wrapper']}>{children}</div>;
};

export default React.memo(CartViews);
