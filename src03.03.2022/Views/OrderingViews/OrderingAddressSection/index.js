import React from 'react';
import style from '../styles/index.module.scss';

const OrderingAddressSection = ({ children }) => {
  return <section className={style['ordering_address']}>{children}</section>;
};

export default React.memo(OrderingAddressSection);
