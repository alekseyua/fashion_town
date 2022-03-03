import React from 'react';
import style from '../styles/index.module.scss';

const PaymentsConteiner = ({ children }) => {
  return <section className={style['information-payments']}>{children}</section>;
};

export default React.memo(PaymentsConteiner);
