import React from 'react';
import style from '../styles/style.module.scss';

const TopLine = ({ children }) => {
  return <div className={style['cabinet_market_topblock__top_line']}>{children}</div>;
};

export default React.memo(TopLine);
