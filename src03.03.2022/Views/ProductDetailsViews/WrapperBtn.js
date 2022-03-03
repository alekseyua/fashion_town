import React from 'react';
import style from './styles/index.module.scss';

const WrapperBtn = ({children}) => {
  return <div className={style['wrapper-btn']}>{children}</div>;
};

export default React.memo(WrapperBtn);
