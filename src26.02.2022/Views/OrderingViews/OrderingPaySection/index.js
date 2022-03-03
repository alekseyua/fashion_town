import React from 'react';
import style from '../styles/index.module.scss';

const OrderingPaySection = ({ children }) => {
  return <section className={style['ordering_pay']}>{children}</section>;
};
export default React.memo(OrderingPaySection);
