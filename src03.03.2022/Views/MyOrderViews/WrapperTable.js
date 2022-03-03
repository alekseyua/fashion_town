import React from 'react';
import style from './styles/index.module.scss'

const WrapperTable = ({ children }) => {
  return <div className={style["cabinet-orders"]}>{children}</div>;
};

export default React.memo(WrapperTable);
