import React from 'react';
import style from '../styles/index.module.scss';

const PaymentsTextBlock = ({ children }) => {
  return <div className={style['information-payments__wrapper']}>{children}</div>;
};

export default React.memo(PaymentsTextBlock);
