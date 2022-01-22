import React from 'react';
import style from '../index.module.scss';

const Container = ({ children, nameOfStyle }) => {
  return <div className={style[nameOfStyle]}>{children}</div>;
};

export default React.memo(Container);
