import React from 'react';
import style from '../styles/style.module.scss';

const Wrapper = ({ children }) => {
  return <div className={style['cabinet_market_topblock__wrapper']}>{children}</div>;
};

export default React.memo(Wrapper);
