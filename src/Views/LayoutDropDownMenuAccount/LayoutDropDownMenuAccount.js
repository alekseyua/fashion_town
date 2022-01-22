import React from 'react';
import style from './layoutDropDownMenuAccount.module.scss';

const LayoutDropDownMenuAccount = ({ children }) => {
  return <div className={style['wrapper']}>{children}</div>;
};

export default React.memo(LayoutDropDownMenuAccount);
