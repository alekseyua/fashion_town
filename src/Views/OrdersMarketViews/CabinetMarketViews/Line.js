import React from 'react';
import style from '../styles/style.module.scss';

const Line = ({ children }) => {
  return <div className={style['cabinet_market_topblock__line']}>{children}</div>;
};

export default React.memo(Line);
