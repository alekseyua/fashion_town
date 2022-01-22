import React from 'react';
import style from './styles/index.module.scss';

const WrapperButton = ({children}) => {
  return <div className={style['wrapper_button']}>{children}</div>;
};

export default React.memo(WrapperButton);
