import React from 'react';
import style from './styles/index.module.scss';

const CountProduct = ({ children }) => {
  return <div className={style['count-product']}>{children}</div>;
};

export default React.memo(CountProduct);
