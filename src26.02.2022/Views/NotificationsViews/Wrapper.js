import React from 'react';
import style from './styles/index.module.scss';

const Wrapper = ({ children }) => {
  return <div className={style['cabinet_mobile_wrapper']}>{children}</div>;
};

export default React.memo(Wrapper);
