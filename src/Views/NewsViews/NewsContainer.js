import React from 'react';
import style from './styles/index.module.scss';

const NewsContainer = ({ children }) => {
  return <div className={style['container']}>{children}</div>;
};
export default React.memo(NewsContainer);
