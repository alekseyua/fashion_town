import React from 'react';
import style from './styles/index.module.scss';

const LayoutProduct = ({ children }) => {
  return <div className={style['layout-product']}>{children}</div>;
};

export default React.memo(LayoutProduct);
