import React from 'react';
import style from '../styles/wrapper.module.scss';

const BalanceItemsWrapper = ({ children }) => {
  return <div className={style["cabinet-balance__items"]}>{children}</div>;
};

export default React.memo(BalanceItemsWrapper);
