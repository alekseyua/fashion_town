import React from 'react';
import style from './styles/index.module.scss';

const Catalog = ({ children }) => {
  return <div className={style['catalog-right']}>{children}</div>;
};

export default React.memo(Catalog);
