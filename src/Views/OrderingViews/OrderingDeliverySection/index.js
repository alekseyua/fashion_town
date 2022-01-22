import React from 'react';
import style from '../styles/index.module.scss';

const OrderingDeliverySection = ({ children }) => {
  return <section className={style['ordering_delivery']}>{children}</section>;
};

export default React.memo(OrderingDeliverySection);
