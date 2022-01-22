import React from 'react';
import style from './styles/index.module.scss'

const ThData = ({children}) => {
  return <span className={style["cabinet-table__th"]}>{children}</span>;
};

export default React.memo(ThData);
