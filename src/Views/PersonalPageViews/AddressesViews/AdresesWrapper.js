import React from 'react';
import style from '../styles/wrapper.module.scss';

const AdresesWrapper = ({ children }) => {
  return <div className={style['cabinet-addresses']}>{children}</div>;
};
export default React.memo(AdresesWrapper);
