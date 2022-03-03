import React from 'react';
import style from './styles/index.module.scss';

const Filters = ({ children }) => {
  return <div className={style['catalog-left']}>{children}</div>;
};

export default React.memo(Filters);
