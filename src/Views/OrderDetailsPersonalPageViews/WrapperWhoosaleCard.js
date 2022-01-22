import React from 'react';
import style from './styles/index.module.scss';

const WrapperWhoosaleCard = ({ children, brand = 'NAME BRAND №1' }) => {
  return (
    <div className={style['cabinet_orders_details__dropwrapper']}>
      {/* Обертка для роли дроп/опт */}
      <div className={style['cabinet_orders_details__brandname']}>{brand}</div>
      {children}
    </div>
  );
};

export default React.memo(WrapperWhoosaleCard);
