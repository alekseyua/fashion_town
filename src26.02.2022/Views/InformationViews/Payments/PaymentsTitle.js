import React from 'react';
import style from '../styles/index.module.scss';

const PaymentsTitle = ({ children }) => {
  return <h3 className={style['information-payments__wrapper-title']}>{children}</h3>;
};

export default React.memo(PaymentsTitle);
