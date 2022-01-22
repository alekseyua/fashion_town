import React from 'react';
import style from './styles/index.module.scss'

const Wrapper = ({ children }) => {
  return <div className={style['wrapper']}>{children}</div>;
};

export default React.memo(Wrapper);
