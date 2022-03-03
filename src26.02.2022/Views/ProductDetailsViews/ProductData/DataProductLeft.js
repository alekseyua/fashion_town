import React from 'react';
import style from '../styles/index.module.scss';

const DataProductLeft = ({ children }) => {
  return <div className={style['prodpage__left']}>{children}</div>;
};

export default React.memo(DataProductLeft);
